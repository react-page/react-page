import * as React from 'react';
import Fab from '@material-ui/core/Fab';

import { useTheme, useMediaQuery } from '@material-ui/core';

const DisplayModeToggle = ({
  description,
  icon,
  onClick,
  active,
  disabled,
}: {
  description: string;
  icon: JSX.Element;
  active: boolean;
  disabled?: boolean;
  onClick: React.MouseEventHandler<HTMLElement>;
}) => {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up('sm'));
  return (
    <div className="react-page-controls-mode-toggle-button">
      <div className="react-page-controls-mode-toggle-button-inner">
        <Fab
          color={active ? 'secondary' : 'default'}
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
