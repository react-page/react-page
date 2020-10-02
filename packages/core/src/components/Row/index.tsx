import * as React from 'react';
import { connect } from '../../reduxConnect';
import { createStructuredSelector } from 'reselect';

import droppable from './Droppable';
import Inner from './inner';
import dimensions from '../Dimensions';
import {
  isLayoutMode,
  isEditMode,
  isResizeMode,
  isInsertMode,
} from '../../selector/display';
import { editableConfig, purifiedNode, node } from '../../selector/editable';
import { blurAllCells } from '../../actions/cell';

import { ComponetizedRow, SimplifiedModesProps } from '../../types/editable';
import { RootState } from '../../types/state';

class Row extends React.PureComponent<
  ComponetizedRow & SimplifiedModesProps & { rawNode: () => Row }
> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Droppable: any;
  constructor(props) {
    super(props);
    const {
      config: { whitelist },
    } = props;
    this.Droppable = droppable(whitelist);
  }

  render() {
    const Droppable = this.Droppable;
    const props = this.props;

    return (
      <Droppable {...props}>
        <Inner {...props} />
      </Droppable>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isLayoutMode,
  config: editableConfig,
  isResizeMode,
  isInsertMode,
  isEditMode,
  node: purifiedNode,
  rawNode: (state: RootState, props: { id: string; editable: string }) => () =>
    node(state, props),
});

const mapDispatchToProps = {
  blurAllCells,
};

export default dimensions()(connect(mapStateToProps, mapDispatchToProps)(Row));
