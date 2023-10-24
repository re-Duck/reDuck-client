import React from 'react';
import WriteEditor from './components/WriteEditor';
import ViewEditor from './components/ViewEditor';

function EditorPage() {
  return (
    <div className="flex w-screen h-screen">
      <WriteEditor />
      <ViewEditor />
    </div>
  );
}

export default EditorPage;
