import { Button, DialogContent, Table } from '@material-ui/core';
import Translate from '@material-ui/icons/Translate';
import {
  useEditor,
  useLang,
  useCell,
  useSetLang,
  useUpdateCellContent,
  useUpdateCellLayout,
} from '@react-page/core';
import React from 'react';
import DraftSwitch from '../DraftSwitch';
import SelectLang from './SelectLang';

const I18nDialog = ({
  nodeId,
  onClose,
}: {
  nodeId: string;
  onClose: () => void;
}) => {
  const cell = useCell(nodeId);
  const currentLang = useLang();
  const editor = useEditor();

  const setLang = useSetLang();
  const contentOrLayout = cell.layout ?? cell.content;
  const updateCellContent = useUpdateCellContent(nodeId);
  const updateCellLayout = useUpdateCellLayout(nodeId);
  const reset = (lang: string) => {
    if (cell.layout) {
      updateCellLayout(null, lang);
    } else {
      updateCellContent(null, lang);
    }
  };
  const defaultLangLabel = editor.languages?.[0]?.label;
  return (
    <DialogContent>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Translate style={{ marginRight: 'auto' }} /> <SelectLang />
      </div>
      <hr />
      <Table>
        <tbody>
          {editor.languages.map((l, index) => {
            const state = contentOrLayout.stateI18n?.[l.lang];
            const isCurrent = currentLang === l.lang;
            const hasState = Boolean(state);
            return (
              <tr key={l.lang}>
                <th
                  style={{
                    textAlign: 'left',
                    textDecoration: isCurrent ? 'underline' : undefined,
                  }}
                >
                  <Button onClick={() => setLang(l.lang)}>
                    {l.label} {index === 0 ? '(default)' : null}
                  </Button>
                </th>

                <td>
                  <DraftSwitch nodeId={nodeId} lang={l.lang} />
                </td>

                <td>{hasState ? '✔️' : ' '}</td>
                <td>
                  {hasState && index !== 0 ? (
                    <Button
                      onClick={() => {
                        reset(l.lang);
                      }}
                    >
                      Reset to {defaultLangLabel} ⚠️
                    </Button>
                  ) : null}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Button onClick={() => onClose()}>Close</Button>
    </DialogContent>
  );
};

export default I18nDialog;
