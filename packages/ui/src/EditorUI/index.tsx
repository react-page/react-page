import React from 'react';
import DisplayModeToggle, { StickyNess } from '../DisplayModeToggle/index';
import ThemeProvider from '../ThemeProvider';
import PluginDrawer from '../PluginDrawer/index';
import Trash from '../Trash/index';

export default React.memo(
  ({
    stickyNess = {
      shouldStickToTop: false,
      shouldStickToBottom: false,
      rightOffset: 0,
    },
    hideEditorSidebar = false,
  }: {
    stickyNess?: StickyNess;
    hideEditorSidebar?: boolean;
  }) => (
    <ThemeProvider>
      <Trash />
      {!hideEditorSidebar && <DisplayModeToggle stickyNess={stickyNess} />}
      <PluginDrawer />
    </ThemeProvider>
  )
);
