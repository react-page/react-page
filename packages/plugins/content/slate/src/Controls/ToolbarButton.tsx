import { lazyLoad } from '@react-page/core';
import * as React from 'react';

const IconButton = lazyLoad(() => import('@material-ui/core/IconButton'));
const Tooltip = lazyLoad(() => import('@material-ui/core/Tooltip'));

const ToolbarButton: React.SFC<{
  icon: JSX.Element | string;
  isActive: boolean;
  disabled?: boolean;
  onClick: React.MouseEventHandler;
  toolTip?: string;
}> = ({ icon, isActive, onClick, disabled = false, toolTip = '' }) => (
  <Tooltip title={toolTip}>
    <IconButton
      onMouseDown={onClick}
      style={
        isActive
          ? { color: 'rgb(0, 188, 212)' }
          : disabled
          ? { color: 'gray' }
          : { color: 'white' }
      }
      disabled={disabled}
    >
      {icon}
    </IconButton>
  </Tooltip>
);

export default React.memo(ToolbarButton);
