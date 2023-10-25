import React from 'react';
import CompleteButton from './CompleteButton';
import SaveButton from './SaveButton';
import BackButton from './BackButton';

import ToolBar from './Toolbar';

function WriteEditor() {
  return (
    <div className="flex flex-col w-full h-full max-h-full border-r-2 bg-gray-50">
      <div className="flex justify-between p-6 py-3 border-b-2">
        <BackButton />
        <div className="flex gap-4">
          <SaveButton />
          <CompleteButton />
        </div>
      </div>

      <ToolBar />
      <textarea
        className="w-full h-full p-6 py-3 outline-none resize-none"
        placeholder="입력하세요"
      />
    </div>
  );
}

export default WriteEditor;
