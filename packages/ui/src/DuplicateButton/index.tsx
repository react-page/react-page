import { IconButton, Tooltip } from '@material-ui/core';
import Icon from '@material-ui/icons/FileCopy';
import { useDuplicateCell, useNode } from '@react-page/core';
import React from 'react';

const DuplicateButton = ({ id }) => {
  const duplicateCell = useDuplicateCell();

  return (
    <Tooltip title="Duplicate Plugin">
      <IconButton
        onClick={() => duplicateCell(id)}
        aria-label="delete"
        color="default"
      >
        <Icon />
      </IconButton>
    </Tooltip>
  );
};

export default DuplicateButton;
