import React from 'react';
import DisplayModeToggle, { StickyNess } from '../DisplayModeToggle/index';
import ThemeProvider from '../ThemeProvider';
import Toolbar from '../Toolbar/index';
import Trash from '../Trash/index';

export default React.memo(
  ({
    stickyNess = {
      shouldStickToTop: false,
      shouldStickToBottom: false,
      rightOffset: 0,
    },
  }: {
    stickyNess?: StickyNess;
  }) => (
    <ThemeProvider>
      <Trash />
      <DisplayModeToggle stickyNess={stickyNess} />
      <Toolbar />
    </ThemeProvider>
  )
);
