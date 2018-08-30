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

import IconButton from '@material-ui/core/IconButton'
import React from 'react'

export const makeTagNode = Tag => {
  const NodeComponent = ({
    attributes,
    children,
    node
  }: {
    attributes: Object,
    children: any,
    node: any
  }) => {
    const align = node.data.get('align')
    return (
      <Tag {...attributes} style={{ textAlign: align }}>
        {children}
      </Tag>
    )
  }

  NodeComponent.displayName = `${Tag}-node`

  return NodeComponent
}

export const makeTagMark = Tag => {
  const MarkComponent = ({ children }: { children: any }) => (
    <Tag>{children}</Tag>
  )

  MarkComponent.displayName = `${Tag}-mark`

  return MarkComponent
}

export const ToolbarButton = ({
  icon,
  isActive,
  onClick,
  disabled = false
}: {
  icon: string,
  isActive: string,
  onClick(): void,
  disabled?: boolean
}) => (
  <IconButton
    onClick={onClick}
    style={
      isActive
        ? { color: 'rgb(0, 188, 212)' }
        : disabled
          ? { color: 'gray' }
          : { color: 'white' }
    }
    disabled={disabled}
  >
    {icon}
  </IconButton>
)
