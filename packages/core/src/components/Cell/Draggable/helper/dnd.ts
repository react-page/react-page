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

import { ComponetizedCell } from '../../../../types/editable';
import { DropTargetMonitor, DropTargetConnector } from 'dnd-core';

export const source = {
  beginDrag(props: ComponetizedCell) {
    // Begin dragging the cell
    props.dragCell(props.id);
    return {
      ...props,
      // we do not want to pass down the react children or we will risk circular dependencies.
      children: null,
      node: {
        ...props.node,
        rows: props.rawNode().rows,
      },
    };
  },

  endDrag(
    { cancelCellDrag, id }: ComponetizedCell,
    monitor: DropTargetMonitor
  ) {
    if (monitor.didDrop()) {
      // If the item drop occurred deeper down the tree, don't do anything
      return;
    }

    // If drag ended but drop did not occur, cancel dragging
    cancelCellDrag();
  },
};

export const collect = (
  connect: DropTargetConnector,
  monitor: DropTargetMonitor
) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  connectDragPreview: connect.dragPreview(),
});
