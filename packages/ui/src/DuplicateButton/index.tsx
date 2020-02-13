import { IconButton, Tooltip } from '@material-ui/core';
import Icon from '@material-ui/icons/FileCopy';
import { Actions, connect, Selectors } from '@react-page/core';
import React from 'react';
import { createStructuredSelector } from 'reselect';

const DuplicateButton = ({ id, node, duplicateCell }) => {
  return node ? (
    <Tooltip title="Duplicate Plugin">
      <IconButton
        onClick={() => duplicateCell(node, node)}
        aria-label="delete"
        color="default"
      >
        <Icon />
      </IconButton>
    </Tooltip>
  ) : null;
};

const mapStateToProps = createStructuredSelector({
  node: Selectors.Editable.node,
});

const mapDispatchToProps = {
  duplicateCell: Actions.Cell.duplicateCell,
};

export default connect(mapStateToProps, mapDispatchToProps)(DuplicateButton);
