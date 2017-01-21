// @flow
import React from 'react'
import classNames from 'classnames'
import PluginService from 'ory-editor-core/lib/service/plugin'
import { editable as reducer }from 'ory-editor-core/lib/reducer/editable'

const gridClass = (size = 12): string => {
  return `ory-cell-md-${size} ory-cell-xs-12`
}

const HTMLRow = ({ cells = [], className, hasInlineChildren }) => (
  <div className={classNames('ory-row', className, {
  'ory-row-has-floating-children': hasInlineChildren
  })}>
    {cells.map((c) => <HTMLCell key={c.id} {...c} />)}
  </div>
)


const HTMLCell = (props) => {
  const { rows = [], layout = {}, content = {}, hasInlineNeighbour, inline, size } = props
  const cn = classNames('ory-cell', gridClass(size), {
    'ory-cell-has-inline-neighbour': hasInlineNeighbour,
    [`ory-cell-inline-${inline || ''}`]: inline
  })

  if (layout.plugin) {
    const { state, plugin: { Component } } = layout
    return (
      <div className={cn}>
        <div className="ory-cell-inner">
          <Component
            readOnly={true}
            state={state}
          >
            {rows.map(r => <HTMLRow key={r.id} {...r} className="ory-cell-inner"/>)}
          </Component>
        </div>
      </div>
    )
  } else if (content.plugin) {
    const { state, plugin: { Component } } = content
    return (
      <div className={cn}>
        <div className="ory-cell-inner ory-cell-leaf">
          <Component
            readOnly={true}
            state={state}
          />
        </div>
      </div>
    )
  } else if (rows.length > 0) {
    return (
      <div className={cn}>
        {rows.map(r => <HTMLRow key={r.id} {...r} className="ory-cell-inner"/>)}
      </div>
    )
  }

  return (
    <div className={cn}>
      <div className="ory-cell-inner">empty</div>
    </div>
  )
}

export const HTMLRenderer = ({ state, plugins }) => {
  const service = new PluginService(plugins)
  const props = reducer(service.unserialize(state), { type: 'renderer/noop' })
  return <HTMLRow {...props}/>
}
