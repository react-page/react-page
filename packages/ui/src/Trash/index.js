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
import React from 'react'
import { DropTarget as dropTarget } from 'react-dnd'
import Delete from 'material-ui/svg-icons/action/delete'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import { Editor } from 'ory-editor-core/lib'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { removeCell } from 'ory-editor-core/lib/actions/cell/core'
import throttle from 'lodash.throttle'
import {
  isEditMode,
  isLayoutMode,
  isPreviewMode,
  isInsertMode,
  isResizeMode
} from 'ory-editor-core/lib/selector/display'
import { createStructuredSelector } from 'reselect'

import Provider from '../Provider'

const target = {
  hover: throttle(
    (props: any, monitor: any) => {
      const item = monitor.getItem()
      if (monitor.isOver({ shallow: true })) {
        item.clearHover()
      }
    },
    200,
    { trailing: false }
  ),

  drop(props: { removeCell(id: string): void }, monitor: any) {
    const item = monitor.getItem()
    if (monitor.didDrop() || !monitor.isOver({ shallow: true })) {
      // If the item drop occurred deeper down the tree, don't do anything
      return
    }

    props.removeCell(item.id)
  }
}

const connectMonitor = (connect: any, monitor: any) => ({
  connectDropTarget: connect.dropTarget(),
  isOverCurrent: monitor.isOver({ shallow: true })
})

const Raw = ({ isLayoutMode, connectDropTarget, isOverCurrent }: Object) =>
  connectDropTarget(
    <div
      className={classNames('ory-controls-trash', {
        'ory-controls-trash-active': isLayoutMode
      })}
    >
      <FloatingActionButton
        secondary
        disabled={!isOverCurrent}
        disabledColor="rgba(0,0,0,.87)"
      >
        <Delete
          style={
            !isOverCurrent && {
              color: 'rgba(255,255,255,.87)',
              fill: 'rgba(255,255,255,.87)'
            }
          }
        />
      </FloatingActionButton>
    </div>
  )

const types = ({ editor }: { editor: Editor }) => {
  const plugins = [
    ...Object.keys(editor.plugins.plugins.layout),
    ...Object.keys(editor.plugins.plugins.content)
  ].map(
    (p: string) =>
      editor.plugins.plugins.content[p].name ||
      editor.plugins.plugins.layout[p].name
  )

  if (editor.plugins.hasNativePlugin()) {
    plugins.push(editor.plugins.getNativePlugin()().name)
  }

  return plugins
}

const mapDispatchToProps = {
  removeCell
}

const mapStateToProps = createStructuredSelector({
  isEditMode,
  isLayoutMode,
  isPreviewMode,
  isInsertMode,
  isResizeMode
})

const Decorated = connect(mapStateToProps, mapDispatchToProps)(
  dropTarget(types, target, connectMonitor)(Raw)
)

const Trash = (props: any) => (
  <Provider {...props}>
    <Decorated {...props} />
  </Provider>
)

export default Trash
