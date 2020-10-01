import { IconButton, Tooltip } from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import * as React from 'react';
import DraftSwitch from '../DraftSwitch';
import DuplicateButton from '../DuplicateButton';
import I18nTools from '../I18nTools';
import SelectParentButton from '../SelectParentButton';
import { ToolsProps } from './types';
import { useRemoveCell } from '@react-page/core';

const Tools: React.FC<ToolsProps> = ({ id }) => {
  const removeCell = useRemoveCell();
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <I18nTools id={id} />
      <DraftSwitch id={id} />
      <DuplicateButton id={id} />
      <SelectParentButton id={id} />

      <Tooltip title="Remove Plugin">
        <IconButton
          onClick={() => removeCell(id)}
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
