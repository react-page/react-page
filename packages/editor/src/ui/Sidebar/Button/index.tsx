import React from 'react';

import type { PropTypes } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const DisplayModeToggle = ({
  description,
  icon,
  onClick,
  active,
  disabled,
  activeColor = 'secondary',
  style,
  ...rest
}: {
  description: string;
  icon: JSX.Element;
  active?: boolean;
  disabled?: boolean;
  activeColor?: PropTypes.Color;
  onClick: React.MouseEventHandler<HTMLElement>;
  style?: React.CSSProperties;
} & unknown) => {
  return (
    <Tooltip title={description}>
      <span>
        <IconButton
          color={active ? activeColor : 'default'}
          onClick={onClick}
          disabled={disabled}
          {...rest}
        >
          {icon}
        </IconButton>
      </span>
    </Tooltip>
  );
};

export default DisplayModeToggle;
