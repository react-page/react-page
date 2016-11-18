// @flow
/* eslint no-duplicate-imports: ["off"] */
import React, { Component } from 'react'
import FilterFrames from 'material-ui/svg-icons/image/filter-frames'
import Slate from 'src/editor/plugins/content/slate'
import type { LayoutPluginProps } from 'src/editor/service/plugin/classes'
import uuid from 'node-uuid'
import cssModules from 'react-css-modules'
import styles from './index.scoped.css'
import Paper from 'material-ui/Paper'
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more'
import ExpandLess from 'material-ui/svg-icons/navigation/expand-less'
import { white, faintBlack } from 'material-ui/styles/colors'

class Spoiler extends Component {
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
      <Paper>
        <div styleName="content" style={{ display: this.state.hidden ? 'none' : 'block' }}>
          {children}
        </div>
        <div style={{
          backgroundColor: faintBlack,
          textAlign: 'center',
          cursor: 'pointer'
        }} onClick={this.onToggle}
        >
          {this.state.hidden
            ? <ExpandMore color={white} size={32} />
            : <ExpandLess color={white} size={32} />
          }
        </div>
      </Paper>
    )
  }
}

const defaultPlugin = new Slate()

export default {
  Component: cssModules(Spoiler, styles),
  name: 'ory/editor/core/layout/spoiler',
  version: '0.0.1',
  icon: <FilterFrames />,
  text: 'Spoiler',

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
