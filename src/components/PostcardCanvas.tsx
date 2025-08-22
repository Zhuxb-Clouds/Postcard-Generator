import React, { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';

interface PostcardCanvasProps {
  width?: number;
  height?: number;
}

export const PostcardCanvas: React.FC<PostcardCanvasProps> = ({ 
  width = 600, 
  height = 400 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const fabricCanvas = new fabric.Canvas(canvasRef.current, {
        width,
        height,
        backgroundColor: '#ffffff',
      });

      // 设置画布背景色
      fabricCanvas.backgroundColor = '#ffffff';
      fabricCanvas.renderAll();
      
      setCanvas(fabricCanvas);

      return () => {
        fabricCanvas.dispose();
      };
    }
  }, [width, height]);

  const addText = () => {
    if (canvas) {
      const text = new fabric.IText('点击编辑文本', {
        left: 100,
        top: 100,
        fontFamily: 'Arial',
        fontSize: 20,
        fill: '#000000',
      });
      canvas.add(text);
      canvas.setActiveObject(text);
    }
  };

  const addRectangle = () => {
    if (canvas) {
      const rect = new fabric.Rect({
        left: 150,
        top: 150,
        width: 100,
        height: 80,
        fill: '#ff6b6b',
        stroke: '#333',
        strokeWidth: 2,
      });
      canvas.add(rect);
    }
  };

  const addCircle = () => {
    if (canvas) {
      const circle = new fabric.Circle({
        left: 200,
        top: 200,
        radius: 50,
        fill: '#4ecdc4',
        stroke: '#333',
        strokeWidth: 2,
      });
      canvas.add(circle);
    }
  };

  const deleteSelected = () => {
    if (canvas) {
      const activeObjects = canvas.getActiveObjects();
      canvas.discardActiveObject();
      canvas.remove(...activeObjects);
    }
  };

  const clearCanvas = () => {
    if (canvas) {
      canvas.clear();
      canvas.backgroundColor = '#ffffff';
      canvas.renderAll();
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && canvas) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        fabric.FabricImage.fromURL(result).then((img) => {
          // 限制图片大小
          const maxWidth = canvas.width! * 0.8;
          const maxHeight = canvas.height! * 0.8;
          
          if (img.width > maxWidth || img.height > maxHeight) {
            const scale = Math.min(maxWidth / img.width, maxHeight / img.height);
            img.scale(scale);
          }

          img.set({
            left: 50,
            top: 50,
          });

          canvas.add(img);
          canvas.setActiveObject(img);
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const exportCanvas = () => {
    if (canvas) {
      const dataURL = canvas.toDataURL({
        format: 'png',
        quality: 1,
        multiplier: 1,
      });
      
      // 创建下载链接
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'postcard.png';
      link.click();
    }
  };

  return (
    <div className="postcard-canvas-container">
      <div className="toolbar">
        <button onClick={addText}>添加文本</button>
        <button onClick={addRectangle}>添加矩形</button>
        <button onClick={addCircle}>添加圆形</button>
        <label className="file-input-label">
          上传图片
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
        </label>
        <button onClick={deleteSelected}>删除选中</button>
        <button onClick={clearCanvas}>清空画布</button>
        <button onClick={exportCanvas}>导出明信片</button>
      </div>
      
      <div className="canvas-wrapper">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};
