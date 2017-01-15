// @flow
import React, { Component } from 'react'
import uuid from 'uuid'

class PluginComponent extends Component {
  state = { hidden: false }
  props: LayoutPluginProps<{}> & { children: any }

  onToggle = () => {
    this.setState({ hidden: !this.state.hidden })
  }

  render() {
    const { children } = this.props
    return (
      <div className="ory-plugins-layout-spoiler">
        <div className="ory-plugins-layout-spoiler-content" style={{ display: this.state.hidden ? 'none' : 'block' }}>
          {children}
        </div>
        <div className="ory-plugins-layout-spoiler-toggle" onClick={this.onToggle}>
          {this.state.hidden ? (
            <svg viewBox="0 0 24 24" style={{color: '#ffffff', width: 32, height: 32}}>
              <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" style={{color: '#ffffff', width: 32, height: 32}}>
              <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/>
            </svg>
          )
          }
        </div>
      </div>
    )
  }
}

export default ({ defaultPlugin }) => ({
  Component: PluginComponent,
  name: 'ory/editor/core/layout/spoiler',
  version: '0.0.1',

  text: 'Hidden Text',
  IconComponent: (
    <svg viewBox="0 0 24 24" style={{color: '#ffffff', width: 32, height: 32}}>
      <path
        d="M20 4h-4l-4-4-4 4H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H4V6h4.52l3.52-3.5L15.52 6H20v14zM18 8H6v10h12"/>
    </svg>
  ),

  createInitialChildren: () => ({
    id: uuid.v4(),
    rows: [{
      id: uuid.v4(),
      cells: [{
        content: { plugin: defaultPlugin, state: defaultPlugin.createInitialState() },
        id: uuid.v4(),
      }]
    }]
  })
})
