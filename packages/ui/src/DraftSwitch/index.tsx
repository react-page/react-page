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
          checked={!node.isDraft}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDraft(id, !e.target.checked)
          }
        />
      }
      label={node.isDraft ? <NonVisibleIcon /> : <VisibleIcon />}
    />
  ) : null;
};

const mapStateToProps = createStructuredSelector({
  node: Selectors.Editable.purifiedNode,
});

const mapDispatchToProps = {
  setDraft: Actions.Cell.updateCellIsDraft,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DraftSwitch);
