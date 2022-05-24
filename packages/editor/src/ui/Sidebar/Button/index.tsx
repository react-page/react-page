import React from 'react';
import Fab from '@mui/material/Fab';

import type { PropTypes } from '@mui/material';
import { useIsSmallScreen } from '../../../core/components/hooks';

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
  const isSmall = useIsSmallScreen();
  return (
    <div className="react-page-controls-mode-toggle-button" style={style}>
      <div className="react-page-controls-mode-toggle-button-inner">
        <Fab
          color={active ? activeColor : 'default'}
          size={isSmall ? 'small' : 'large'}
          onClick={onClick}
          disabled={disabled}
          {...rest}
        >
          {icon}
        </Fab>
      </div>
      <div className="react-page-controls-mode-toggle-button-description">
        {description}
      </div>
    </div>
  );
};

export default DisplayModeToggle;
