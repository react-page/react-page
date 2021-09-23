import { Typography } from '@material-ui/core';
import type { BottomToolbarProps } from '@react-page/editor';
import { BottomToolbar, usePluginOfCell } from '@react-page/editor';
import React from 'react';
import CollapseButton from './CollapseButton';

/**
 * This is an example on how you could customize the Bottom Toolbar.
 * We provide most of the default components as exports, so you can also create a custom one
 * and use the existing pieces that you need. Check the source code for BottomToolbar
 */
export const ExampleCustomBottomToolbar: React.FC<BottomToolbarProps> =
  React.memo(({ pluginControls, ...props }) => {
    const [collapsed, setCollapsed] = React.useState(false);
    const plugin = usePluginOfCell(props.nodeId);

    return (
      <BottomToolbar
        {...props}
        style={{
          borderRadius: 20,
          borderColor: 'red',
        }}
        pluginControls={collapsed ? null : pluginControls}
        actionsLeft={[
          <CollapseButton
            key="collapse button"
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          />,
        ]}
      >
        <Typography>Custom Toolbar for {plugin?.title}</Typography>
      </BottomToolbar>
    );
  });
