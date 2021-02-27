import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import IconCollapse from '@material-ui/icons/KeyboardArrowDown';
import IconRestore from '@material-ui/icons/KeyboardArrowUp';

interface CollapseButtonProps {
  collapsed: boolean;
  toggleCollapsed(): void;
}

const CollapseButton: React.FC<CollapseButtonProps> = ({
  collapsed,
  toggleCollapsed,
}) => {
  return (
    <Tooltip title={collapsed ? 'Restore Panel' : 'Collapse Panel'}>
      <IconButton
        onClick={() => toggleCollapsed()}
        aria-label="delete"
        color="default"
      >
        {collapsed ? <IconRestore /> : <IconCollapse />}
      </IconButton>
    </Tooltip>
  );
};

export default React.memo(CollapseButton);
