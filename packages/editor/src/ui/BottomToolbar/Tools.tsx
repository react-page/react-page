import { IconButton, Tooltip } from '@mui/material';
import Delete from '@mui/icons-material/Delete';
import React from 'react';
import { useRemoveCell, useUiTranslator } from '../../core/components/hooks';
import DraftSwitch from '../DraftSwitch';
import { DuplicateButton } from '../DuplicateButton';
import { I18nTools } from '../I18nTools';
import { SelectParentButton } from '../SelectParentButton';
import { BottomToolbarToolsProps } from './types';

export { BottomToolbarToolsProps };
export const BottomToolbarTools: React.FC<BottomToolbarToolsProps> = React.memo(
  ({ nodeId }) => {
    const { t } = useUiTranslator();
    const removeCell = useRemoveCell(nodeId);

    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <I18nTools nodeId={nodeId} />
        <DraftSwitch nodeId={nodeId} />
        <SelectParentButton nodeId={nodeId} />
        <DuplicateButton nodeId={nodeId} />

        <Tooltip title={t('Remove Plugin') ?? ''}>
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
  }
);
