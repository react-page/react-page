import { FormControlLabel, Switch, Tooltip } from '@mui/material';
import VisibleIcon from '@mui/icons-material/Visibility';
import NonVisibleIcon from '@mui/icons-material/VisibilityOff';
import React from 'react';
import {
  useCellProps,
  useLang,
  useSetDraft,
  useUiTranslator,
} from '../../core/components/hooks';

const DraftSwitch = ({ nodeId, lang }: { nodeId: string; lang?: string }) => {
  const { t } = useUiTranslator();
  const cell = useCellProps(nodeId, (c) => ({
    isDraft: c?.isDraft,
    isDraftI18n: c?.isDraftI18n,
  }));
  const setDraft = useSetDraft(nodeId);
  const currentLang = useLang();
  if (!cell) {
    return null;
  }
  const theLang = lang ?? currentLang;
  const hasI18n = Boolean(cell.isDraftI18n);
  const isDraft = cell?.isDraftI18n?.[theLang] ?? cell?.isDraft; // fallback to legacy
  const title = t(isDraft ? 'Content is hidden' : 'Content is visible');
  return cell ? (
    <Tooltip title={title + (hasI18n ? ' in ' + theLang : '')}>
      <FormControlLabel
        style={{ marginRight: 5 }}
        labelPlacement="start"
        control={
          <Switch
            color="primary"
            checked={!isDraft}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDraft(!e.target.checked, theLang);
            }}
          />
        }
        label={
          isDraft ? (
            <NonVisibleIcon style={{ marginTop: 5 }} />
          ) : (
            <VisibleIcon style={{ marginTop: 5 }} />
          )
        }
      />
    </Tooltip>
  ) : null;
};

export default DraftSwitch;
