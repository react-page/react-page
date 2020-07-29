import { IconButton, Tooltip } from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import * as React from 'react';
import DraftSwitch from '../DraftSwitch';
import DuplicateButton from '../DuplicateButton';
import I18nTools from '../I18nTools';
import SelectParentButton from '../SelectParentButton';
import { ToolsProps } from './types';

const Tools: React.FC<ToolsProps> = ({ id, editable, onDelete }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <I18nTools id={id} editable={editable} />
      <DraftSwitch id={id} editable={editable} />
      <DuplicateButton id={id} editable={editable} />
      <SelectParentButton id={id} editable={editable} />
      {onDelete ? (
        <Tooltip title="Remove Plugin">
          <IconButton onClick={onDelete} aria-label="delete" color="secondary">
            <Delete />
          </IconButton>
        </Tooltip>
      ) : null}
    </div>
  );
};

export default React.memo(Tools);
