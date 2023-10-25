import React from 'react';
import ToolbarIcon from './ToolbarIcon';

function ToolBar() {
  return (
    <div className="flex items-center justify-center gap-2 p-6 py-3 border-b-2 sm:gap-8">
      <div className="flex items-center justify-center gap-2">
        <ToolbarIcon type="H1" />
        <ToolbarIcon type="H2" />
        <ToolbarIcon type="H3" />
      </div>
      <div className="flex items-center justify-center gap-2">
        <ToolbarIcon type="Bold" />
        <ToolbarIcon type="Italic" />
        <ToolbarIcon type="Strikethrough" />
        <ToolbarIcon type="Underline" />
      </div>

      <div className="flex items-center justify-center gap-2">
        <ToolbarIcon type="Quote" />
        <ToolbarIcon type="AddPhoto" />
      </div>
    </div>
  );
}

export default ToolBar;
