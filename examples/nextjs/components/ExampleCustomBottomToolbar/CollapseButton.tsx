import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import IconCollapse from '@mui/icons-material/KeyboardArrowDown';
import IconRestore from '@mui/icons-material/KeyboardArrowUp';

interface CollapseButtonProps {
  collapsed: boolean;
  setCollapsed: (c: boolean) => void;
}

const CollapseButton: React.FC<CollapseButtonProps> = ({
  collapsed,
  setCollapsed,
}) => {
  const toggleCollapsed = React.useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed, setCollapsed]);
  return (
    <Tooltip title={collapsed ? 'Restore Panel' : 'Collapse Panel'}>
      <IconButton onClick={toggleCollapsed} aria-label="delete" color="default">
        {collapsed ? <IconRestore /> : <IconCollapse />}
      </IconButton>
    </Tooltip>
  );
};

export default React.memo(CollapseButton);
