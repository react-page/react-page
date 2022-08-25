import React, { lazy, Suspense } from 'react';

import { ConditionalWrapper } from './ConditionalWrapper';
import { useTheme } from '@mui/material';

const IconButton = lazy(() => import('@mui/material/IconButton'));
const Tooltip = lazy(() => import('@mui/material/Tooltip'));

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
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </ConditionalWrapper>
  );
};

export default React.memo(ToolbarButton);
