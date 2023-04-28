import Layout from '@/components/Layout';
import React, { useState } from 'react';
import { Editor, EditorState } from 'draft-js';

export default function Write() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  return (
    <Layout>
      <div>
        Write
        <Editor editorState={editorState} onChange={setEditorState} />
      </div>
    </Layout>
  );
}
