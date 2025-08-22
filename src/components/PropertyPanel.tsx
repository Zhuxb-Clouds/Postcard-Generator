import React, { useState, useEffect } from 'react';
import * as fabric from 'fabric';

interface PropertyPanelProps {
  canvas: fabric.Canvas | null;
  selectedObject: fabric.Object | null;
}

export const PropertyPanel: React.FC<PropertyPanelProps> = ({ canvas, selectedObject }) => {
  const [properties, setProperties] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    fill: '#000000',
    stroke: '#000000',
    strokeWidth: 0,
    opacity: 1,
    fontSize: 20,
    fontFamily: 'Arial',
  });

  useEffect(() => {
    if (selectedObject) {
      setProperties({
        left: Math.round(selectedObject.left || 0),
        top: Math.round(selectedObject.top || 0),
        width: Math.round(selectedObject.width || 0),
        height: Math.round(selectedObject.height || 0),
        fill: selectedObject.fill as string || '#000000',
        stroke: selectedObject.stroke as string || '#000000',
        strokeWidth: selectedObject.strokeWidth || 0,
        opacity: selectedObject.opacity || 1,
        fontSize: (selectedObject as any).fontSize || 20,
        fontFamily: (selectedObject as any).fontFamily || 'Arial',
      });
    }
  }, [selectedObject]);

  const updateProperty = (property: string, value: any) => {
    if (selectedObject && canvas) {
      selectedObject.set(property, value);
      canvas.renderAll();
      
      setProperties(prev => ({
        ...prev,
        [property]: value,
      }));
    }
  };

  if (!selectedObject) {
    return (
      <div className="property-panel">
        <h3>属性面板</h3>
        <p>请选择一个对象来编辑属性</p>
      </div>
    );
  }

  const isText = selectedObject.type === 'i-text';
  const isImage = selectedObject.type === 'image';

  return (
    <div className="property-panel">
      <h3>属性面板</h3>
      
      <div className="property-group">
        <h4>位置和大小</h4>
        <div className="property-row">
          <label>X:</label>
          <input
            type="number"
            value={properties.left}
            onChange={(e) => updateProperty('left', parseInt(e.target.value))}
          />
        </div>
        <div className="property-row">
          <label>Y:</label>
          <input
            type="number"
            value={properties.top}
            onChange={(e) => updateProperty('top', parseInt(e.target.value))}
          />
        </div>
        {!isImage && (
          <>
            <div className="property-row">
              <label>宽度:</label>
              <input
                type="number"
                value={properties.width}
                onChange={(e) => updateProperty('width', parseInt(e.target.value))}
              />
            </div>
            <div className="property-row">
              <label>高度:</label>
              <input
                type="number"
                value={properties.height}
                onChange={(e) => updateProperty('height', parseInt(e.target.value))}
              />
            </div>
          </>
        )}
      </div>

      <div className="property-group">
        <h4>外观</h4>
        <div className="property-row">
          <label>透明度:</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={properties.opacity}
            onChange={(e) => updateProperty('opacity', parseFloat(e.target.value))}
          />
          <span>{Math.round(properties.opacity * 100)}%</span>
        </div>
        
        {!isImage && (
          <>
            <div className="property-row">
              <label>填充颜色:</label>
              <input
                type="color"
                value={properties.fill}
                onChange={(e) => updateProperty('fill', e.target.value)}
              />
            </div>
            <div className="property-row">
              <label>边框颜色:</label>
              <input
                type="color"
                value={properties.stroke}
                onChange={(e) => updateProperty('stroke', e.target.value)}
              />
            </div>
            <div className="property-row">
              <label>边框宽度:</label>
              <input
                type="number"
                min="0"
                value={properties.strokeWidth}
                onChange={(e) => updateProperty('strokeWidth', parseInt(e.target.value))}
              />
            </div>
          </>
        )}
      </div>

      {isText && (
        <div className="property-group">
          <h4>文本</h4>
          <div className="property-row">
            <label>字体大小:</label>
            <input
              type="number"
              min="8"
              max="200"
              value={properties.fontSize}
              onChange={(e) => updateProperty('fontSize', parseInt(e.target.value))}
            />
          </div>
          <div className="property-row">
            <label>字体:</label>
            <select
              value={properties.fontFamily}
              onChange={(e) => updateProperty('fontFamily', e.target.value)}
            >
              <option value="Arial">Arial</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Helvetica">Helvetica</option>
              <option value="Georgia">Georgia</option>
              <option value="Verdana">Verdana</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};
