import React from 'react';
import { StickyNess, DisplayModeToggle } from '../DisplayModeToggle';
import { ThemeProvider } from '../ThemeProvider';
import { PluginDrawer } from '../PluginDrawer';
import { Trash } from '../Trash';

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
