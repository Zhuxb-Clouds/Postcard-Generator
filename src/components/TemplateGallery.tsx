import React from 'react';
import * as fabric from 'fabric';

interface Template {
  id: string;
  name: string;
  thumbnail: string;
  applyTemplate: (canvas: fabric.Canvas) => void;
}

interface TemplateGalleryProps {
  canvas: fabric.Canvas | null;
  onClose: () => void;
}

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({ canvas, onClose }) => {
  // 预设模板
  const templates: Template[] = [
    {
      id: 'template1',
      name: '生日明信片',
      thumbnail: 'https://via.placeholder.com/150x100/FFEBCD/333333?text=生日明信片',
      applyTemplate: (canvas) => {
        canvas.clear();
        canvas.backgroundColor = '#FFEBCD';

        // 添加标题文本
        const title = new fabric.IText('生日快乐!', {
          left: 220,
          top: 50,
          fontFamily: 'Arial',
          fontSize: 40,
          fill: '#FF5252',
        });

        // 添加装饰元素
        const circle1 = new fabric.Circle({
          left: 50,
          top: 50,
          radius: 30,
          fill: '#FFC107',
          stroke: '#FF5252',
          strokeWidth: 2,
        });

        const circle2 = new fabric.Circle({
          left: 520,
          top: 50,
          radius: 30,
          fill: '#FFC107',
          stroke: '#FF5252',
          strokeWidth: 2,
        });

        const rect = new fabric.Rect({
          left: 150,
          top: 250,
          width: 300,
          height: 100,
          fill: 'rgba(255, 193, 7, 0.3)',
          stroke: '#FF5252',
          strokeWidth: 2,
          rx: 10,
          ry: 10,
        });

        // 添加消息文本
        const message = new fabric.IText('在这里写下您的祝福...', {
          left: 170,
          top: 280,
          fontFamily: 'Arial',
          fontSize: 20,
          fill: '#333333',
        });

        canvas.add(title, circle1, circle2, rect, message);
        canvas.renderAll();
      },
    },
    {
      id: 'template2',
      name: '旅行明信片',
      thumbnail: 'https://via.placeholder.com/150x100/E3F2FD/333333?text=旅行明信片',
      applyTemplate: (canvas) => {
        canvas.clear();
        canvas.backgroundColor = '#E3F2FD';

        // 添加标题文本
        const title = new fabric.IText('美好旅程', {
          left: 220,
          top: 30,
          fontFamily: 'Georgia',
          fontSize: 36,
          fill: '#1976D2',
        });

        // 添加装饰元素
        const line = new fabric.Line([50, 80, 550, 80], {
          stroke: '#1976D2',
          strokeWidth: 3,
        });

        const rect = new fabric.Rect({
          left: 100,
          top: 100,
          width: 400,
          height: 200,
          fill: 'rgba(25, 118, 210, 0.1)',
          stroke: '#1976D2',
          strokeWidth: 2,
        });

        // 添加提示文本
        const placeholder = new fabric.IText('在此处放置您的旅行照片', {
          left: 180,
          top: 180,
          fontFamily: 'Arial',
          fontSize: 18,
          fill: '#1976D2',
        });

        // 添加消息文本
        const message = new fabric.IText('来自...', {
          left: 450,
          top: 350,
          fontFamily: 'Georgia',
          fontSize: 24,
          fill: '#1976D2',
          textAlign: 'right',
        });

        canvas.add(title, line, rect, placeholder, message);
        canvas.renderAll();
      },
    },
    {
      id: 'template3',
      name: '节日明信片',
      thumbnail: 'https://via.placeholder.com/150x100/F3E5F5/333333?text=节日明信片',
      applyTemplate: (canvas) => {
        canvas.clear();
        canvas.backgroundColor = '#F3E5F5';

        // 添加标题文本
        const title = new fabric.IText('节日祝福', {
          left: 220,
          top: 40,
          fontFamily: 'Times New Roman',
          fontSize: 38,
          fill: '#7B1FA2',
        });

        // 添加装饰元素
        const star1 = new fabric.Polygon(
          [
            { x: 50, y: 50 },
            { x: 60, y: 80 },
            { x: 90, y: 80 },
            { x: 65, y: 100 },
            { x: 75, y: 130 },
            { x: 50, y: 110 },
            { x: 25, y: 130 },
            { x: 35, y: 100 },
            { x: 10, y: 80 },
            { x: 40, y: 80 },
          ],
          {
            left: 500,
            top: 50,
            fill: '#E1BEE7',
            stroke: '#7B1FA2',
            strokeWidth: 2,
          }
        );

        const rect = new fabric.Rect({
          left: 100,
          top: 150,
          width: 400,
          height: 150,
          fill: 'rgba(123, 31, 162, 0.1)',
          stroke: '#7B1FA2',
          strokeWidth: 2,
          rx: 20,
          ry: 20,
        });

        // 添加消息文本
        const message = new fabric.IText('愿您节日快乐...', {
          left: 170,
          top: 210,
          fontFamily: 'Times New Roman',
          fontSize: 24,
          fill: '#7B1FA2',
        });

        canvas.add(title, star1, rect, message);
        canvas.renderAll();
      },
    },
  ];

  const applyTemplate = (template: Template) => {
    if (canvas) {
      template.applyTemplate(canvas);
      onClose();
    }
  };

  return (
    <div className="template-gallery">
      <div className="template-gallery-header">
        <h3>选择模板</h3>
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>
      </div>
      <div className="templates-container">
        {templates.map((template) => (
          <div
            key={template.id}
            className="template-item"
            onClick={() => applyTemplate(template)}
          >
            <img src={template.thumbnail} alt={template.name} />
            <p>{template.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
