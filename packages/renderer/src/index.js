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
import classNames from 'classnames'
import PluginService from 'ory-editor-core/lib/service/plugin'
import { editable as reducer } from 'ory-editor-core/lib/reducer/editable'
import type { Cell, Row } from 'ory-editor-core/lib/types/editable'

const gridClass = (size: number = 12): string =>
  `ory-cell-sm-${size} ory-cell-xs-12`

const HTMLRow = ({ cells = [], className, hasInlineChildren }: Row) => (
  <div
    className={classNames('ory-row', className, {
      'ory-row-has-floating-children': hasInlineChildren
    })}
  >
    {cells.map((c: Cell) => <HTMLCell key={c.id} {...c} />)}
  </div>
)

// eslint-disable-next-line no-empty-function
const noop = () => {}

const HTMLCell = (props: Cell) => {
  const {
    rows = [],
    layout = {},
    content = {},
    hasInlineNeighbour,
    inline,
    size
  } = props
  const cn = classNames('ory-cell', gridClass(size), {
    'ory-cell-has-inline-neighbour': hasInlineNeighbour,
    [`ory-cell-inline-${inline || ''}`]: inline
  })

  if (layout.plugin) {
    const { state, plugin: { Component } } = layout

    return (
      <div className={cn}>
        <div className="ory-cell-inner">
          <Component isPreviewMode readOnly state={state} onChange={noop}>
            {rows.map((r: Row) => (
              <HTMLRow key={r.id} {...r} className="ory-cell-inner" />
            ))}
          </Component>
        </div>
      </div>
    )
  } else if (content.plugin) {
    const { state, plugin: { Component, StaticComponent } } = content
    const Renderer = StaticComponent || Component

    return (
      <div className={cn}>
        <div className="ory-cell-inner ory-cell-leaf">
          <Renderer isPreviewMode readOnly state={state} onChange={noop} />
        </div>
      </div>
    )
  } else if (rows.length > 0) {
    return (
      <div className={cn}>
        {rows.map((r: Row) => (
          <HTMLRow key={r.id} {...r} className="ory-cell-inner" />
        ))}
      </div>
    )
  }

  return (
    <div className={cn}>
      <div className="ory-cell-inner" />
    </div>
  )
}

export const HTMLRenderer = ({
  state,
  plugins
}: {
  state: any,
  plugins: { layout: [], content: [] }
}) => {
  const service = new PluginService(plugins)
  const props = reducer(service.unserialize(state), { type: 'renderer/noop' })

  return <HTMLRow {...props} />
}
