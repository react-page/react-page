// @flow
/* eslint no-duplicate-imports: ["off"] */
import React, { Component } from 'react'
import FilterFrames from 'material-ui/svg-icons/image/filter-frames'
import Slate from 'src/editor/plugins/content/slate'
import { LayoutPlugin } from 'src/editor/service/plugin/classes'
import type { LayoutPluginProps } from 'src/editor/service/plugin/classes'
import uuid from 'node-uuid'
import cssModules from 'react-css-modules'
import styles from './index.scoped.css'

/* eslint no-invalid-this: "off" */
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
      <div styleName="spoiler">
        <div styleName="header" onClick={this.onToggle}>x</div>
        <div styleName="content" style={{ display: this.state.hidden ? 'none' : 'block' }}>
          {children}
        </div>
      </div>
    )
  }
}

const defaultPlugin = new Slate()

export default class SpoilerPlugin extends LayoutPlugin {
  Component = cssModules(Spoiler, styles)
  name = 'ory/layout/spoiler'
  version = '0.0.1'
  icon = <FilterFrames />
  text = 'Spoiler'

  createInitialChildren = () => ({
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
