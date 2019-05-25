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
import { DropTarget as dropTarget } from 'react-dnd';
import Delete from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import { Editor } from '@react-page/core';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { removeCell } from '@react-page/core/lib/actions/cell/core';
import throttle from 'lodash.throttle';
import {
  isEditMode,
  isLayoutMode,
  isPreviewMode,
  isInsertMode,
  isResizeMode
} from '@react-page/core/lib/selector/display';
import { createStructuredSelector } from 'reselect';

import Provider from '../Provider/index';
import { ProviderProps } from './../Provider/index';

const target = {
  hover: throttle(
    // tslint:disable-next-line:no-any
    (props: any, monitor: any) => {
      const item = monitor.getItem();
      if (monitor.isOver({ shallow: true })) {
        item.clearHover();
      }
    },
    200,
    { trailing: false }
  ),

  // tslint:disable-next-line:no-any
  drop(props: { removeCell(id: string): void }, monitor: any) {
    const item = monitor.getItem();
    if (monitor.didDrop() || !monitor.isOver({ shallow: true })) {
      // If the item drop occurred deeper down the tree, don't do anything
      return;
    }

    props.removeCell(item.id);
  },
};

// tslint:disable-next-line:no-any
const connectMonitor = (_connect: any, monitor: any) => ({
  connectDropTarget: _connect.dropTarget(),
  isOverCurrent: monitor.isOver({ shallow: true }),
});

export interface RawProps {
  isLayoutMode: boolean;
  isOverCurrent: boolean;
  connectDropTarget: (node: JSX.Element) => JSX.Element;
}

class Raw extends React.Component<RawProps> {
  render() {
    const { connectDropTarget, isOverCurrent } = this.props;
    return connectDropTarget(
      <div
        className={classNames('ory-controls-trash', {
          'ory-controls-trash-active': this.props.isLayoutMode,
        })}
      >
        <Fab color="secondary" disabled={!isOverCurrent}>
          <Delete />
        </Fab>
      </div>
    );
  }
}

const types = ({ editor }: { editor: Editor }) => {
  const plugins = [
    ...Object.keys(editor.plugins.plugins.layout),
    ...Object.keys(editor.plugins.plugins.content),
  ].map(
    (p: string) =>
      editor.plugins.plugins.content[p].name ||
      editor.plugins.plugins.layout[p].name
  );

  if (editor.plugins.hasNativePlugin()) {
    plugins.push(editor.plugins.getNativePlugin()().name);
  }

  return plugins;
};

const mapDispatchToProps = {
  removeCell,
};

const mapStateToProps = createStructuredSelector({
  isEditMode,
  isLayoutMode,
  isPreviewMode,
  isInsertMode,
  isResizeMode,
});

const Decorated = connect(
  mapStateToProps,
  mapDispatchToProps
)(dropTarget(types, target, connectMonitor)(Raw));

const Trash: React.SFC<ProviderProps> = props => (
  <Provider {...props}>
    <Decorated {...props} />
  </Provider>
);

export default Trash;
