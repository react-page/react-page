import { lazyLoad } from '@react-page/editor';
import React from 'react';
import { ConditionalWrapper } from './ConditionalWrapper';
import { useTheme } from '@mui/material';
const IconButton = lazyLoad(() => import('@mui/material/IconButton'));
const Tooltip = lazyLoad(() => import('@mui/material/Tooltip'));

const ToolbarButton: React.SFC<{
  icon: JSX.Element | string;
  isActive: boolean;
  disabled?: boolean;
  onClick: React.MouseEventHandler;
  toolTip?: string;
  dark?: boolean;
}> = ({ dark, icon, isActive, onClick, disabled = false, toolTip = '' }) => {
  const theme = useTheme();
  return (
    <ConditionalWrapper
      condition={!disabled}
      wrapper={(children) => <Tooltip title={toolTip}>{children}</Tooltip>}
    >
      <IconButton
        onMouseDown={onClick}
        style={{
          transition: '0.3s',
          ...(isActive
            ? {
                transform: 'scale(1.15)',
                color: theme.palette.primary.main,
              }
            : disabled
            ? { color: theme.palette.action.disabled }
            : {
                color: dark
                  ? theme.palette.common.white
                  : theme.palette.common.black,
              }),
        }}
        disabled={disabled}
      >
        {icon}
      </IconButton>
    </ConditionalWrapper>
  );
};

export default React.memo(ToolbarButton);
