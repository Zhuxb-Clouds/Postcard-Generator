import React, { useState, useEffect } from 'react';
import * as fabric from 'fabric';
import { Toolbar } from './Toolbar';
import { PropertyPanel } from './PropertyPanel';
import { TemplateGallery } from './TemplateGallery';

export const PostcardEditor: React.FC = () => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [selectedObject, setSelectedObject] = useState<fabric.Object | null>(null);
  const [showTemplates, setShowTemplates] = useState(false);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const fabricCanvas = new fabric.Canvas(canvasRef.current, {
        width: 600,
        height: 400,
        backgroundColor: '#ffffff',
      });

      // 设置画布背景色
      fabricCanvas.backgroundColor = '#ffffff';
      fabricCanvas.renderAll();

      // 监听对象选择事件
      fabricCanvas.on('selection:created', (e) => {
        setSelectedObject(e.selected?.[0] || null);
      });

      fabricCanvas.on('selection:updated', (e) => {
        setSelectedObject(e.selected?.[0] || null);
      });

      fabricCanvas.on('selection:cleared', () => {
        setSelectedObject(null);
      });

      setCanvas(fabricCanvas);

      return () => {
        fabricCanvas.dispose();
      };
    }
  }, []);

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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && canvas) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        fabric.FabricImage.fromURL(result).then((img) => {
          // 限制图片大小
          const maxWidth = canvas.width! * 0.6;
          const maxHeight = canvas.height! * 0.6;
          
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

  const saveDesign = () => {
    if (canvas) {
      const json = canvas.toJSON();
      const jsonStr = JSON.stringify(json);
      
      // 保存到本地存储
      localStorage.setItem('postcardDesign', jsonStr);
      
      alert('设计已保存');
    }
  };

  const loadDesign = () => {
    const savedDesign = localStorage.getItem('postcardDesign');
    
    if (savedDesign && canvas) {
      try {
        const json = JSON.parse(savedDesign);
        canvas.clear();
        canvas.loadFromJSON(json, () => {
          canvas.renderAll();
          alert('设计已加载');
        });
      } catch (err) {
        alert('加载设计失败');
        console.error(err);
      }
    } else {
      alert('没有找到保存的设计');
    }
  };

  const toggleTemplateGallery = () => {
    setShowTemplates(!showTemplates);
  };

  return (
    <div className="postcard-editor">
      <div className="editor-header">
        <h1>明信片设计器</h1>
        <p>使用工具栏添加元素，拖拽调整位置，双击文本进行编辑</p>
      </div>
      
      <div className="editor-content">
        <Toolbar
          onAddText={addText}
          onAddRectangle={addRectangle}
          onAddCircle={addCircle}
          onImageUpload={handleImageUpload}
          onDeleteSelected={deleteSelected}
          onClearCanvas={clearCanvas}
          onExport={exportCanvas}
          onShowTemplates={toggleTemplateGallery}
        />
        
        <div className="canvas-container">
          <canvas ref={canvasRef} />
        </div>
        
        <PropertyPanel
          canvas={canvas}
          selectedObject={selectedObject}
        />
      </div>

      <div className="editor-footer">
        <button className="save-btn" onClick={saveDesign}>保存设计</button>
        <button className="load-btn" onClick={loadDesign}>加载设计</button>
      </div>

      {showTemplates && (
        <div className="template-overlay">
          <TemplateGallery
            canvas={canvas}
            onClose={toggleTemplateGallery}
          />
        </div>
      )}
    </div>
  );
};
