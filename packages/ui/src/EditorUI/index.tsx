import { DndBackend, Editor } from '@react-page/core';
import React from 'react';
import DisplayModeToggle, { StickyNess } from '../DisplayModeToggle/index';
import Provider from '../Provider';
import Toolbar from '../Toolbar/index';
import Trash from '../Trash/index';

export default ({
  editor,
  stickyNess = {
    shouldStickToTop: false,
    shouldStickToBottom: false,
    rightOffset: 0,
  },
  dndBackend,
}: {
  // tslint:disable-next-line:no-any
  editor: Editor;
  stickyNess?: StickyNess;
  dndBackend?: DndBackend;
}) => (
  <Provider editor={editor} dndBackend={dndBackend}>
    <Trash />
    <DisplayModeToggle stickyNess={stickyNess} />
    <Toolbar />
  </Provider>
);
