import { IconButton, Dialog } from '@material-ui/core';
import Translate from '@material-ui/icons/Translate';
import { useEditor } from '@react-page/core';
import React, { useState } from 'react';
import SelectLang from './SelectLang';
import I18nDialog from './I18nDialog';

const I18nTools: React.FC<{
  id: string;
}> = ({ id }) => {
  const editor = useEditor();
  const [showI18nDialog, setShowI18nDialog] = useState(false);
  const hasI18n = editor.languages?.length > 0;
  const onClose = () => setShowI18nDialog(false);
  if (!hasI18n) {
    return null;
  }

  return (
    <>
      <Dialog open={showI18nDialog} onClose={onClose}>
        <I18nDialog id={id} onClose={onClose} />
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
};

export default I18nTools;
