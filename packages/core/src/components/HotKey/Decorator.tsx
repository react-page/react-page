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

import { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import pathOr from 'ramda/src/pathOr';
import Mousetrap from 'mousetrap';

import { undo, redo } from '../../actions/undo';
import { removeCell, focusCell, blurAllCells } from '../../actions/cell';
import { isEditMode } from '../../selector/display';
import { focus } from '../../selector/focus';
import {
  node,
  editable,
  editables,
  searchNodeEverywhere
} from '../../selector/editable';

import { RootState } from '../../types/state';
import { EditableType, ComponetizedCell } from '../../types/editable';

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
  searchNodeEverywhere(
    id: string
  ): { editable: EditableType; node: ComponetizedCell };
};

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

const falser = (err: Error) => {
  if (err) {
    // tslint:disable-next-line:no-console
    console.log(err);
  }
};

if (Mousetrap && Mousetrap.prototype) {
  Mousetrap.prototype.stopCallback = () => false;
}

let wasInitialized = false;

class Decorator extends Component {
  props: Props;

  handlers = {
    undo: () => {
      const { id } = this.props;
      this.props.undo(id);
    },
    redo: () => {
      const { id } = this.props;
      this.props.redo(id);
    },

    // remove cells
    remove: (e: Event) => {
      if (!this.props.isEditMode) {
        return;
      }

      const maybeNode = this.props.searchNodeEverywhere(this.props.focus);
      if (!maybeNode) {
        return;
      }
      const { node: n } = maybeNode;
      hotKeyHandler(n, 'handleRemoveHotKey')(e, n)
        .then(() => this.props.removeCell(this.props.focus))
        .catch(falser);
    },

    // focus next cell
    focusNext: (e: Event) => {
      if (!this.props.isEditMode) {
        return;
      }

      const { node: n } = this.props.searchNodeEverywhere(this.props.focus);
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

      const { node: n } = this.props.searchNodeEverywhere(this.props.focus);
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
  componentDidMount() {
    if (!wasInitialized) {
      if (!Mousetrap) {
        return;
      }

      Mousetrap.bind(['ctrl+z', 'command+z'], this.handlers.undo);
      Mousetrap.bind(
        ['ctrl+shift+z', 'ctrl+y', 'command+shift+z', 'command+y'],
        this.handlers.redo
      );
      Mousetrap.bind(['del', 'backspace'], this.handlers.remove);
      Mousetrap.bind(['down', 'right'], this.handlers.focusNext);
      Mousetrap.bind(['up', 'left'], this.handlers.focusPrev);
      wasInitialized = true;
    }
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

const mapStateToProps = createStructuredSelector({
  isEditMode,
  focus,
  // tslint:disable-next-line:no-any
  node: (state: any) => (id: string, _editable: string) =>
    node(state, { id, editable: _editable }),
  searchNodeEverywhere: (state: RootState) => (id: string) =>
    searchNodeEverywhere(state, id),
  // tslint:disable-next-line:no-any
  editable: (state: any, props: any) => (id?: string) =>
    editable(state, id ? { id } : props),
  editables,
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
