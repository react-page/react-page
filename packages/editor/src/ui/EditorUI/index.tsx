import React from 'react';

import { ThemeProvider } from '../ThemeProvider';
import { PluginDrawer } from '../PluginDrawer';
import { Trash } from '../Trash';
import type { StickyNess } from '../Sidebar';
import { Sidebar } from '../Sidebar';
import { useOption } from '../../core/components/hooks';

export default React.memo(
  ({
    stickyNess = {
      shouldStickToTop: false,
      shouldStickToBottom: false,
      rightOffset: 0,
    },
  }: {
    stickyNess?: StickyNess;
  }) => {
    const hideEditorSidebar = useOption('hideEditorSidebar');
    return (
      <ThemeProvider>
        <Trash />
        {!hideEditorSidebar && <Sidebar stickyNess={stickyNess} />}
        <PluginDrawer />
      </ThemeProvider>
    );
  }
);
