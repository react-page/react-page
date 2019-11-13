import { Editor } from '@react-page/core';
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
}: {
  // tslint:disable-next-line:no-any
  editor: Editor;
  stickyNess: StickyNess;
}) => (
  <Provider editor={editor}>
    <Trash />
    <DisplayModeToggle stickyNess={stickyNess} />
    <Toolbar />
  </Provider>
);
