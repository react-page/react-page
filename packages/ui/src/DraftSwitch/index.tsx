import { FormControlLabel, Switch } from '@material-ui/core';
import VisibleIcon from '@material-ui/icons/Visibility';
import NonVisibleIcon from '@material-ui/icons/VisibilityOff';
import { Actions, connect, Selectors } from '@react-page/core';
import React from 'react';
import { createStructuredSelector } from 'reselect';

const DraftSwitch = ({ id, node, setDraft }) => {
  return node ? (
    <FormControlLabel
      style={{ marginRight: 5 }}
      labelPlacement="start"
      control={
        <Switch
          color="primary"
          checked={!node.isDraft}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDraft(id, !e.target.checked)
          }
        />
      }
      label={
        node.isDraft ? (
          <NonVisibleIcon style={{ marginTop: 5 }} />
        ) : (
          <VisibleIcon style={{ marginTop: 5 }} />
        )
      }
    />
  ) : null;
};

const mapStateToProps = createStructuredSelector({
  node: Selectors.Editable.node,
});

const mapDispatchToProps = {
  setDraft: Actions.Cell.updateCellIsDraft,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DraftSwitch);
