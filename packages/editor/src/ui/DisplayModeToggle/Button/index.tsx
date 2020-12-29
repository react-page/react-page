import React from 'react';
import Fab from '@material-ui/core/Fab';

import { useTheme, useMediaQuery, PropTypes } from '@material-ui/core';

const DisplayModeToggle = ({
  description,
  icon,
  onClick,
  active,
  disabled,
  activeColor = 'secondary',
  style,
}: {
  description: string;
  icon: JSX.Element;
  active?: boolean;
  disabled?: boolean;
  activeColor?: PropTypes.Color;
  onClick: React.MouseEventHandler<HTMLElement>;
  style?: React.CSSProperties;
}) => {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up('sm'));
  return (
    <div className="react-page-controls-mode-toggle-button" style={style}>
      <div className="react-page-controls-mode-toggle-button-inner">
        <Fab
          color={active ? activeColor : 'default'}
          size={isLarge ? 'large' : 'small'}
          onClick={onClick}
          disabled={disabled}
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
