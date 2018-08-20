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
import React, { Component } from 'react'
import { DropTarget as dropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import classNames from 'classnames'

import { shouldPureComponentUpdate } from '../../../helper/shouldComponentUpdate'
import * as hoverActions from '../../../actions/cell/drag'
import * as insertActions from '../../../actions/cell/insert'
import { target, connect as monitorConnect } from './helper/dnd'

import type { ComponetizedCell } from '../../../types/editable'

type Props = ComponetizedCell & {
  isLeaf: boolean,
  isOver: boolean,
  isOverCurrent: boolean,
  isDragging: boolean,
  isInsertMode: boolean,
  isLayoutMode: boolean,
  node: { hover: string, inline: string },
  children: any,
  className: string,
  connectDropTarget<T>(e: T): T,
  dropTypes: Array<string>
}

class Droppable extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate

  props: Props

  render() {
    const {
      connectDropTarget,
      isLayoutMode,
      isInsertMode,
      className,
      isLeaf,
      node: { hover },
      children
    } = this.props

    if (!(isLayoutMode || isInsertMode)) {
      return (
        <div className={classNames(className, 'ory-cell-droppable-container')}>
          {children}
        </div>
      )
    }

    return connectDropTarget(
      <div
        className={classNames(className, 'ory-cell-droppable', {
          'ory-cell-droppable-is-over-current': hover,
          [`ory-cell-droppable-is-over-${hover}`]: hover,
          'ory-cell-droppable-leaf': isLeaf
        })}
      >
        {children}
      </div>
    )
  }
}

const mapDispatchToProps = { ...hoverActions, ...insertActions }

export default connect(
  null,
  mapDispatchToProps
)(
  dropTarget(
    ({ dropTypes }: { dropTypes: Array<string> }) => dropTypes,
    target,
    monitorConnect
  )(Droppable)
)
