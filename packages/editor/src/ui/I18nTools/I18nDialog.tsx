import { Button, DialogContent, Table } from '@mui/material';
import Translate from '@mui/icons-material/Translate';

import React, { useCallback } from 'react';
import {
  useCellDataI18nRaw,
  useLang,
  useOption,
  useSetLang,
  useUiTranslator,
  useUpdateCellData,
} from '../../core/components/hooks';
import DraftSwitch from '../DraftSwitch';
import SelectLang from './SelectLang';

const I18nDialog = ({
  nodeId,
  onClose,
}: {
  nodeId: string;
  onClose: () => void;
}) => {
  const currentLang = useLang();
  const languages = useOption('languages');
  const { t } = useUiTranslator();
  const setLang = useSetLang();
  const dataI18n = useCellDataI18nRaw(nodeId);

  const updateCellData = useUpdateCellData(nodeId);
  const reset = useCallback(
    (lang: string) => {
      updateCellData(null, {
        lang,
      });
    },
    [updateCellData]
  );
  const defaultLangLabel = languages?.[0]?.label;
  return (
    <DialogContent>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Translate style={{ marginRight: 'auto' }} /> <SelectLang />
      </div>
      <hr />
      <Table>
        <tbody>
          {languages?.map((l, index) => {
            const data = dataI18n?.[l.lang];
            const isCurrent = currentLang === l.lang;
            const hasData = Boolean(data);

            return (
              <tr key={l.lang}>
                <th
                  style={{
                    textAlign: 'left',
                    textDecoration: isCurrent ? 'underline' : undefined,
                  }}
                >
                  <Button onClick={() => setLang(l.lang)}>
                    {l.label} {index === 0 ? t('(default)') : null}
                  </Button>
                </th>

                <td>
                  <DraftSwitch nodeId={nodeId} lang={l.lang} />
                </td>

                <td>{hasData ? '✔️' : ' '}</td>
                <td>
                  {hasData && index !== 0 ? (
                    <Button
                      onClick={() => {
                        reset(l.lang);
                      }}
                    >
                      {t(`Reset to ${defaultLangLabel} ⚠️`)}
                    </Button>
                  ) : null}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Button onClick={() => onClose()}>{t('Close')}</Button>
    </DialogContent>
  );
};

export default I18nDialog;
