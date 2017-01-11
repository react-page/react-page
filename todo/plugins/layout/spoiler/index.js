// @flow
/* eslint no-duplicate-imports: ["off"] */
import React, { Component } from 'react'
import createSlatePlugin from 'src/editor/plugins/content/slate'
import type { LayoutPluginProps } from 'src/editor/service/plugin/classes'
import uuid from 'uuid'
import FilterFrames from 'material-ui/svg-icons/image/filter-frames'
import './index.css'

class PluginComponent extends Component {
  state = {
    hidden: false
  }
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

// TODO: shouldn't be here, #265
const defaultPlugin = createSlatePlugin()

export default {
  Component: PluginComponent,
  name: 'ory/editor/core/layout/spoiler',
  version: '0.0.1',
  IconComponent: <FilterFrames />,
  text: 'Hidden Text',

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
}
