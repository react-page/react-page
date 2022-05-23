import { IconButton, Tooltip } from '@mui/material';
import Icon from '@mui/icons-material/FileCopy';
import React from 'react';
import { useDuplicateCell, useUiTranslator } from '../../core/components/hooks';

export const DuplicateButton: React.FC<{ nodeId: string }> = React.memo(
  ({ nodeId }) => {
    const duplicateCell = useDuplicateCell(nodeId);
    const { t } = useUiTranslator();
    return (
      <Tooltip title={t('Duplicate Plugin') ?? ''}>
        <IconButton onClick={duplicateCell} aria-label="delete" color="default">
          <Icon />
        </IconButton>
      </Tooltip>
    );
  }
);
