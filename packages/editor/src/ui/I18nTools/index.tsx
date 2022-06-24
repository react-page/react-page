import { IconButton, Dialog } from '@mui/material';
import Translate from '@mui/icons-material/Translate';

import React, { useState } from 'react';
import SelectLang from './SelectLang';
import I18nDialog from './I18nDialog';
import { useOption } from '../../core/components/hooks';

export const I18nTools: React.FC<{
  nodeId: string;
}> = React.memo(({ nodeId }) => {
  const languages = useOption('languages');

  const [showI18nDialog, setShowI18nDialog] = useState(false);
  const hasI18n = languages && languages?.length > 0;
  const onClose = () => setShowI18nDialog(false);
  if (!hasI18n) {
    return null;
  }

  return (
    <>
      <Dialog open={showI18nDialog} onClose={onClose}>
        <I18nDialog nodeId={nodeId} onClose={onClose} />
      </Dialog>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <IconButton
          onClick={() => setShowI18nDialog(true)}
          aria-label="i18n"
          color="secondary"
        >
          <Translate />
        </IconButton>

        <SelectLang />
      </div>
    </>
  );
});
