import { IconButton, Tooltip } from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';

import React from 'react';
import { useRemoveCell } from '@react-page/editor';
import DraftSwitch from './DraftSwitch';
import DuplicateButton from './DuplicateButton';
import SelectParentButton from './SelectParentButton';

type ToolsProps = {
  nodeId: string;
};

const Tools: React.FC<ToolsProps> = ({ nodeId }) => {
  const removeCell = useRemoveCell(nodeId);
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <DraftSwitch nodeId={nodeId} />
      <DuplicateButton nodeId={nodeId} />
      <SelectParentButton nodeId={nodeId} />

      <Tooltip title="Remove Plugin">
        <IconButton
          onClick={() => removeCell()}
          aria-label="delete"
          color="secondary"
        >
          <Delete />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default React.memo(Tools);
