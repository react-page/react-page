/*
 * This file is part of ORY Editor.
 *
 * ORY Editor is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * ORY Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with ORY Editor.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @license LGPL-3.0
 * @copyright 2016-2018 Aeneas Rekkas
 * @author Aeneas Rekkas <aeneas+oss@aeneas.io>
 *
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import droppable from './Droppable';
import Inner from './inner';
import dimensions from '../Dimensions';
import {
  isLayoutMode,
  isEditMode,
  isResizeMode,
  isInsertMode
} from '../../selector/display';
import { editableConfig, purifiedNode, node } from '../../selector/editable';
import { blurAllCells } from '../../actions/cell';

import { ComponetizedRow } from '../../types/editable';
import { RootState } from '../../types/state';

class Row extends React.PureComponent<ComponetizedRow> {
  // tslint:disable-next-line:no-any
  Droppable: any;
  constructor(props: ComponetizedRow) {
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
  rawNode: (state: RootState, props: { id: string; editable: string }) => () => node(state, props),
});

const mapDispatchToProps = {
  blurAllCells,
};

export default dimensions()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Row)
);
