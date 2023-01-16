import React, { useState } from 'react';
import {Editor, EditorState} from 'draft-js';

export default function EmailModal(props) {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );
  return <Editor editorState={editorState} onChange={setEditorState} />;
};

