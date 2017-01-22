// @flow
import React, { Component } from 'react'
import uuid from 'uuid'
import Paper from 'material-ui/Paper'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more'
import ExpandLess from 'material-ui/svg-icons/navigation/expand-less'
import FilterFrames from 'material-ui/svg-icons/image/filter-frames'
import { white } from 'material-ui/styles/colors'
import type { LayoutPluginProps, ContentPlugin } from 'ory-editor-core/lib/service/plugin/classes'

class PluginComponent extends Component {
  state = { hidden: false }
  props: LayoutPluginProps<{}> & { children: any }

  onToggle = () => {
    this.setState({ hidden: !this.state.hidden })
  }

  render() {
    const { children } = this.props
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Paper>
          <div className="ory-plugins-layout-spoiler-content" style={{ display: this.state.hidden ? 'none' : 'block' }}>
            {children}
          </div>
          <div className="ory-plugins-layout-spoiler-toggle" onClick={this.onToggle}>
            {this.state.hidden
              ? <ExpandMore color={white} size={32} />
              : <ExpandLess color={white} size={32} />
            }
          </div>
        </Paper>
      </MuiThemeProvider>
    )
  }
}

export default ({ defaultPlugin }: { defaultPlugin: ContentPlugin }) => ({
  Component: PluginComponent,
  name: 'ory/editor/core/layout/spoiler',
  version: '0.0.1',

  text: 'Hidden Text',
  IconComponent: <FilterFrames />,

  createInitialChildren: () => ({
    id: uuid(),
    rows: [{
      id: uuid(),
      cells: [{
        content: { plugin: defaultPlugin, state: defaultPlugin.createInitialState() },
        id: uuid(),
      }]
    }]
  })
})
