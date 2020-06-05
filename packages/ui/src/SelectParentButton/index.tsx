import * as React from 'react';
import { connect, RootState } from '@react-page/core';
import { createStructuredSelector } from 'reselect';
import IconButton from '@material-ui/core/IconButton';
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';
import { Dispatch, bindActionCreators } from 'redux';
import {
  ComponetizedCell,
  Cell,
  Row,
} from '@react-page/core/lib/types/editable';
import { focusCell as focusCellInternal } from '@react-page/core/lib/actions/cell';
import { NodeProps, editable } from '@react-page/core/lib/selector/editable';

export interface SelectParentButtonCustomProps {
  id: string;
  editable: string;
}

type ReduxProps = {
  parentId?: string;
};

type ActionCreatorsTypes = {
  focusCell: (id: string) => void;
};

type SelectParentButtonProps = SelectParentButtonCustomProps &
  ReduxProps &
  ActionCreatorsTypes;

const SelectParentButton: React.FC<SelectParentButtonProps> = (props) => {
  const { parentId, focusCell } = props;
  const onClick = React.useCallback(() => focusCell(parentId), [parentId]);
  return parentId ? (
    <IconButton
      className="bottomToolbar__selectParentButton"
      onClick={onClick}
      color="default"
      title="Select parent"
    >
      <VerticalAlignTopIcon />
    </IconButton>
  ) : null;
};

type WithAncestors = Cell & Row & { ancestors?: (Cell | Row)[] };

const parentInner = (
  current: WithAncestors,
  props: { id: string }
): WithAncestors => {
  const { id, rows = [], cells = [] } = current;
  if (id === props.id) {
    return current;
  }

  let found: WithAncestors = undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [...rows, ...cells].find((n) => {
    const f = parentInner(n, props);
    if (f) {
      found = f;
    }
    return Boolean(f);
  });

  return found
    ? { ...found, ancestors: [...(found.ancestors || []), current] }
    : found;
};

const parentIdSelector = (
  state: RootState,
  props: NodeProps
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): string => {
  const tree = editable(state, { id: props.editable });
  if (!tree) {
    throw new Error(`Could not find editable: ${props.editable}`);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parent = parentInner(tree as any, props);
  const ancestor = (parent?.ancestors || []).find(
    (a) => (a as Cell).content || (a as Cell).layout
  );
  return ancestor?.id;
};

const mapStateToProps = createStructuredSelector({
  parentId: parentIdSelector,
});

const mapDispatchToProps = (dispatch: Dispatch, props: ComponetizedCell) => {
  return bindActionCreators(
    {
      focusCell: (id: string) => focusCellInternal(id, true)(),
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch as any
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectParentButton) as React.FC<SelectParentButtonCustomProps>;
