import { IconButton, Tooltip } from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';

import * as React from 'react';
import { useRemoveCell } from '../../core/components/hooks';
import DraftSwitch from '../DraftSwitch';
import DuplicateButton from '../DuplicateButton';
import I18nTools from '../I18nTools';
import SelectParentButton from '../SelectParentButton';
import { ToolsProps } from './types';

const Tools: React.FC<ToolsProps> = ({ nodeId }) => {
  const removeCell = useRemoveCell(nodeId);
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <I18nTools nodeId={nodeId} />
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
