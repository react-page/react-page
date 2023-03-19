import React from 'react';
import { PluginDrawer } from '../PluginDrawer';
import { Trash } from '../Trash';
import { NodesNavigator } from '../NodesNavigator';
import { Sidebar } from '../Sidebar';
import { useOption } from '../../core/components/hooks';
import { MultiNodesBottomToolbar } from '../MultiNodesBottomToolbar';
import type { StickyNess } from '../Sidebar';
import type { ValueWithLegacy } from '../../core/types';

export default React.memo(
  ({
    stickyNess = {
      shouldStickToTop: false,
      shouldStickToBottom: false,
      rightOffset: 0,
      rightOffsetFixed: 0,
    },
    value,
  }: {
    stickyNess?: StickyNess;
    value?: ValueWithLegacy | null;
  }) => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };
    const hideEditorSidebar = useOption('hideEditorSidebar');
    return (
      <>
        <Trash />
        {!hideEditorSidebar && (
          <Sidebar
            stickyNess={stickyNess}
            handleDrawerToggle={handleDrawerToggle}
          />
        )}
        <NodesNavigator
          value={value}
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
        <PluginDrawer />
        <MultiNodesBottomToolbar />
      </>
    );
  }
);
