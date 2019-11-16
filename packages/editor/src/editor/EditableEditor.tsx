import { createEmptyState, Editable, Editor } from '@react-page/core';
import EditorUI from '@react-page/ui';
import React, { useEffect, useRef } from 'react';
import StickyWrapper from './StickyWrapper';

export default ({ plugins, defaultPlugin, value, onChange }) => {
  const editorRef = useRef({
    editor: new Editor({ defaultPlugin, plugins }),
    editorState: null,
  });

  editorRef.current.editorState = value || createEmptyState();
  // updating plugins is not yet supported, so we have an editor ref  that stays the same during lifetime of the editor
  useEffect(
    () => {
      editorRef.current.editor.trigger.editable.update(
        editorRef.current.editorState
      );
    },
    [editorRef.current.editorState !== value]
  );

  const { editor, editorState } = editorRef.current;

  return (
    <StickyWrapper>
      {stickyNess => (
        <>
          <Editable id={editorState.id} editor={editor} onChange={onChange} />
          <EditorUI editor={editor} stickyNess={stickyNess} />
        </>
      )}
    </StickyWrapper>
  );
};
