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

// @flow

export const source = {
  beginDrag({ insert, ...props }: { layoutMode(): void, insert: Object }) {
    props.layoutMode()
    return {
      node: insert,
      rawNode: () => insert,
      ...props
    }
  },

  endDrag(props: any, monitor: any) {
    const item = monitor.getItem()
    if (monitor.didDrop()) {
      setTimeout(() => {
        item.insertMode()
      }, 10)
      // If the item drop occurred deeper down the tree, don't do anything
      return
    }

    item.clearHover()
    setTimeout(() => {
      item.insertMode()
    }, 100)
  }
}

export const collect = (connect: any, monitor: any) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  connectDragPreview: connect.dragPreview()
})
