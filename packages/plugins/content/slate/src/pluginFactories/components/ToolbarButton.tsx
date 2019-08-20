import * as React from 'react';
import { lazyLoad } from '@react-page/core';

const IconButton = lazyLoad(() => import('@material-ui/core/IconButton'));

const ToolbarButton: React.SFC<{
  icon: JSX.Element | string;
  isActive: boolean;
  disabled?: boolean;
  onClick: React.MouseEventHandler;
}> = ({ icon, isActive, onClick, disabled = false }) => (
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
);

export default ToolbarButton;
