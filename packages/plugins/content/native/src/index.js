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

const Native = ({
  state: { item, itemType }
}: {
  state: { itemType: string, item: string }
}) => (
  <div>
    <p>
      This is a default plugin that handles native drag events of type{' '}
      <code>{itemType}</code>.<br />
      It contained the following payload:
    </p>
    <pre>{JSON.stringify(item, null, 2)}</pre>
  </div>
)

/**
 *
 * @param hover the item which the native element was dropped on
 * @param monitor the DropTargetMonitor as provided by react-dnd
 * @param component the React component of the item which the native element was dropped on
 */
export default (hover: any, monitor: any, component: any) => ({
  Component: Native,
  name: 'ory/editor/core/content/default-native',
  version: '0.0.1',
  createInitialState: () => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType()
  })

  // Set type to layout to create a layout cell instead of a content cell
  // type: 'layout'
})
