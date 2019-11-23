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

import classNames from 'classnames';
import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  blurAllCells,
  focusCell,
  resizeCell,
  ResizeCellAction
} from '../../actions/cell';
import { connect } from '../../reduxConnect';
import { RootState } from '../../selector';
import {
  isEditMode,
  isInsertMode,
  isLayoutMode,
  isPreviewMode,
  isResizeMode
} from '../../selector/display';
import {
  editableConfig,
  node,
  NodeProps,
  purifiedNode
} from '../../selector/editable';
import { ComponetizedCell } from '../../types/editable';
import {
  BlurAllCellsAction,
  FocusCellAction,
  removeCell,
  RemoveCellAction
} from './../../actions/cell/core';
import Inner from './Inner';
import Resizable from './Resizable';

const gridClass = ({ node: { size }, ...rest }: ComponetizedCell): string => {
  if (rest.isPreviewMode || rest.isEditMode) {
    return `ory-cell-${
      rest.isPreviewMode || rest.isEditMode ? 'sm' : 'xs'
    }-${size || 12} ory-cell-xs-12`;
  }

  return `ory-cell-xs-${size || 12}`;
};

const stopClick = (_isEditMode: boolean) => (
  e: React.MouseEvent<HTMLDivElement>
) => (_isEditMode ? e.stopPropagation() : null);

type CellProps = ComponetizedCell;

class Cell extends React.PureComponent<CellProps> {
  render() {
    const {
      id,
      rowWidth,
      rowHeight,
      updateDimensions,
      node: { inline, resizable, hasInlineNeighbour, focused, isDraft },
    } = this.props;
    if (isDraft && this.props.isPreviewMode) {
      return null;
    }

    return (
      <div
        className={classNames('ory-cell', gridClass(this.props), {
          'ory-cell-has-inline-neighbour': hasInlineNeighbour,
          [`ory-cell-inline-${inline || ''}`]: inline,
          'ory-cell-focused': focused,
          'ory-cell-is-draft': isDraft,
          'ory-cell-resizing-overlay': this.props.isResizeMode,
          'ory-cell-bring-to-front':
            !this.props.isResizeMode && !this.props.isLayoutMode && inline, // inline must not be active for resize/layout
        })}
        onClick={stopClick(this.props.isEditMode)}
      >
        {resizable && this.props.isResizeMode ? (
          <Resizable
            {...this.props}
            id={id}
            rowWidth={rowWidth}
            rowHeight={rowHeight}
            updateDimensions={updateDimensions}
            node={this.props.node}
            steps={12}
            onChange={this.props.resizeCell}
          >
            <Inner {...this.props} styles={null} />
          </Resizable>
        ) : (
          <Inner {...this.props} styles={null} />
        )}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isPreviewMode,
  isEditMode,
  isResizeMode,
  // required by sub-components
  isInsertMode,
  isLayoutMode,
  config: editableConfig,
  node: purifiedNode,
  rawNode: (state: RootState, props: NodeProps) => () => node(state, props),
});

const mapDispatchToProps = (
  dispatch: Dispatch<
    ResizeCellAction | FocusCellAction | BlurAllCellsAction | RemoveCellAction
  >,
  { id }: { id: string }
) =>
  bindActionCreators(
    {
      resizeCell: resizeCell(id),
      focusCell: focusCell(id),
      blurAllCells,
      removeCell: () => removeCell(id),
    },
    // tslint:disable-next-line:no-any
    dispatch as any
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cell);
