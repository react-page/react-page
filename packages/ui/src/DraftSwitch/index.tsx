import { FormControlLabel, Switch, Tooltip } from '@material-ui/core';
import VisibleIcon from '@material-ui/icons/Visibility';
import NonVisibleIcon from '@material-ui/icons/VisibilityOff';
import { Actions, connect, Selectors } from '@react-page/core';
import React from 'react';
import { createStructuredSelector } from 'reselect';

const DraftSwitch = ({ id, node, setDraft, lang }) => {
  const isDraft = node?.isDraftI18n?.[lang] ?? node?.isDraft; // fallback to legacy
  return node ? (
    <Tooltip title={isDraft ? 'Content is draft' : 'Content is visible'}>
      <FormControlLabel
        style={{ marginRight: 5 }}
        labelPlacement="start"
        control={
          <Switch
            color="primary"
            checked={!isDraft}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDraft(id, !e.target.checked, lang)
            }
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

const mapStateToProps = createStructuredSelector({
  node: Selectors.Editable.node,
  lang: Selectors.Setting.getLang,
});

const mapDispatchToProps = {
  setDraft: Actions.Cell.updateCellIsDraft,
};

export default connect(mapStateToProps, mapDispatchToProps)(DraftSwitch);
