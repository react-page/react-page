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
import { HotKeys } from 'react-hotkeys';
import { connect } from 'react-redux';
import pathOr from 'ramda/src/pathOr';
import { createStructuredSelector } from 'reselect';

import { undo, redo } from '../../actions/undo';
import { removeCell, focusCell, blurAllCells } from '../../actions/cell';
import { isEditMode } from '../../selector/display';
import { focus } from '../../selector/focus';
import { node, editable } from '../../selector/editable';

import { EditableType } from '../../types/editable';

const hotKeyHandler = (n: Object, key: string) =>
  pathOr(
    pathOr(() => Promise.resolve(), ['content', 'plugin', key], n),
    ['layout', 'plugin', key],
    n
  );

const nextLeaf = (order: Array<{ id: string }> = [], current: string) => {
  let last;

  return order.find((c: { id: string; isLeaf: boolean }) => {
    if (last === current) {
      return c.isLeaf;
    }
    last = c.id;
    return false;
  });
};

const previousLeaf = (order: Array<{ id: string }>, current: string) =>
  nextLeaf([...order].reverse(), current);

type Props = {
  children: React.ReactChildren;
  id: string;
  focus: string;
  isEditMode: boolean;
  editable: EditableType;
  undo(id: string): void;
  redo(id: string): void;
  removeCell(id: string): void;
  focusCell(id: string): void;
  blurAllCells(): void;
  updateCellContent(): void;
  updateCellLayout(): void;
  node(cell: string, editable: string): Object;
};

const falser = (err: Error) => {
  if (err) {
    // tslint:disable-next-line:no-console
    console.log(err);
  }
};

// TODO cleanup and tests #143
const handlers = (props: Props) => {
  const { id } = props;
  return {
    undo: () => this.props.undo(id),
    redo: () => this.props.redo(id),

    // remove cells
    remove: (e: Event) => {
      if (!this.props.isEditMode) {
        return;
      }

      const n = this.props.node(this.props.focus, id);
      hotKeyHandler(n, 'handleRemoveHotKey')(e, n)
        .then(() => this.props.removeCell(this.props.focus))
        .catch(falser);
    },

    // focus next cell
    focusNext: (e: Event) => {
      if (!this.props.isEditMode) {
        return;
      }

      const n = this.props.node(this.props.focus, id);
      hotKeyHandler(n, 'handleFocusNextHotKey')(e, n)
        .then(() => {
          const found = nextLeaf(
            this.props.editable.cellOrder,
            this.props.focus
          );
          if (found) {
            this.props.blurAllCells();
            this.props.focusCell(found.id);
          }
        })
        .catch(falser);
    },

    // focus previous cell
    focusPrev: (e: Event) => {
      if (!this.props.isEditMode) {
        return;
      }

      const n = this.props.node(this.props.focus, id);
      hotKeyHandler(n, 'handleFocusPreviousHotKey')(e, n)
        .then(() => {
          const found = previousLeaf(
            this.props.editable.cellOrder,
            this.props.focus
          );
          if (found) {
            this.props.blurAllCells();
            this.props.focusCell(found.id);
          }
        })
        .catch(falser);
    },
  };
};

const Decorator = (props: Props) => (
  // Rewrite: Check if this was necessary style={{ outline: 'none' }}
  <HotKeys handlers={handlers(props)}>{props.children}</HotKeys>
);

const mapStateToProps = createStructuredSelector({
  isEditMode,
  focus,
  // tslint:disable-next-line:no-any
  node: (state: any) => (id: string, _editable: string) =>
    node(state, { id, editable: _editable }),
  // tslint:disable-next-line:no-any
  editable: (state: any, props: any) => editable(state, props),
});

const mapDispatchToProps = {
  undo,
  redo,
  removeCell,
  focusCell: (id: string) => focusCell(id)(),
  blurAllCells,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Decorator);
