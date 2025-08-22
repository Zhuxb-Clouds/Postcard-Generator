import React from 'react';

interface ToolbarProps {
  onAddText: () => void;
  onAddRectangle: () => void;
  onAddCircle: () => void;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteSelected: () => void;
  onClearCanvas: () => void;
  onExport: () => void;
  onShowTemplates: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  onAddText,
  onAddRectangle,
  onAddCircle,
  onImageUpload,
  onDeleteSelected,
  onClearCanvas,
  onExport,
  onShowTemplates,
}) => {
  return (
    <div className="toolbar">
      <div className="toolbar-section">
        <h4>添加元素</h4>
        <button className="toolbar-btn" onClick={onShowTemplates}>
          🖼️ 模板
        </button>
        <button className="toolbar-btn" onClick={onAddText}>
          📝 文本
        </button>
        <button className="toolbar-btn" onClick={onAddRectangle}>
          ⬛ 矩形
        </button>
        <button className="toolbar-btn" onClick={onAddCircle}>
          ⭕ 圆形
        </button>
        <label className="toolbar-btn file-input-label">
          🖼️ 图片
          <input
            type="file"
            accept="image/*"
            onChange={onImageUpload}
            style={{ display: 'none' }}
          />
        </label>
      </div>
      
      <div className="toolbar-section">
        <h4>操作</h4>
        <button className="toolbar-btn delete-btn" onClick={onDeleteSelected}>
          🗑️ 删除
        </button>
        <button className="toolbar-btn clear-btn" onClick={onClearCanvas}>
          🧹 清空
        </button>
      </div>
      
      <div className="toolbar-section">
        <h4>导出</h4>
        <button className="toolbar-btn export-btn" onClick={onExport}>
          💾 导出PNG
        </button>
      </div>
    </div>
  );
};
