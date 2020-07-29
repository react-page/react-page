import { Button, DialogContent, Table } from '@material-ui/core';
import { Actions, connect, Selectors, useEditor } from '@react-page/core';
import React from 'react';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import DraftSwitch from '../DraftSwitch';
import SelectLang from './SelectLang';
import Translate from '@material-ui/icons/Translate';

const I18nDialog = ({
  id,
  editable,
  node,
  currentLang,
  updateCellContent,
  updateCellLayout,
  setLang,
  onClose,
}) => {
  const editor = useEditor();
  const contentOrLayout = node.layout ?? node.content;
  const reset = (lang) => {
    if (node.layout) {
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
                  <DraftSwitch id={id} editable={editable} lang={l.lang} />
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

const mapStateToProps = createStructuredSelector({
  node: Selectors.Editable.node,
  currentLang: Selectors.Setting.getLang,
});

const mapDispatchToProps = (dispatch, { id }: { id: string }) =>
  bindActionCreators(
    {
      updateCellContent: Actions.Cell.updateCellContent(id),
      updateCellLayout: Actions.Cell.updateCellLayout(id),
      setLang: Actions.Setting.setLang,
      setDraft: Actions.Cell.updateCellIsDraft,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(I18nDialog);
