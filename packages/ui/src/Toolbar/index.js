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
import Drawer from 'material-ui/Drawer'
import { connect } from 'react-redux'
import { isInsertMode } from 'ory-editor-core/lib/selector/display'
import { createStructuredSelector } from 'reselect'
import { Editor } from 'ory-editor-core/lib'
import List from 'material-ui/List/List'
import Subheader from 'material-ui/Subheader'
import TextField from 'material-ui/TextField'
import {
  LayoutPlugin,
  ContentPlugin
} from 'ory-editor-core/lib/service/plugin/classes'
import Item from './Item'
import Provider from '../Provider'

type Props = {
  isInsertMode: boolean,
  editor: Editor
}

class Raw extends Component {
  constructor(props: Props) {
    super(props)
    this.state = {
      searchFilter: (a: any) => a,
      isSearching: false
    }

    this.onSearch = this.onSearch.bind(this)
  }

  state: {
    searchFilter: Function,
    isSearching: boolean
  }

  componentDidUpdate() {
    const input = this.input
    if (input && this.props.isInsertMode && input instanceof HTMLElement) {
      setTimeout(() => {
        const e = input.querySelector('input')
        if (e) {
          e.focus()
        }
      }, 100)
    }
  }

  input: Component<*, *, *>

  onRef = (component: Component<*, *, *>) => {
    this.input = component
  }

  onSearch = (e: Event) => {
    const target = e.target
    if (target instanceof HTMLInputElement) {
      this.setState({
        searchFilter: ((v: any) => ({ text = '' }: Object) =>
          text.toLowerCase().indexOf(v) > -1)(target.value.toLowerCase()),
        isSearching: target.value.length > 0
      })
    }
  }

  render() {
    const { isInsertMode, editor: { plugins } } = this.props
    const { searchFilter } = this.state
    const content = plugins.plugins.content.filter(searchFilter)
    const layout = plugins.plugins.layout.filter(searchFilter)

    return (
      <Drawer className="ory-toolbar-drawer" open={isInsertMode}>
        <Subheader>Add plugin to content</Subheader>
        <div style={{ padding: '0 16px' }} ref={this.onRef}>
          <TextField
            hintText="Search plugins"
            fullWidth
            onChange={this.onSearch}
          />
        </div>
        <List>
          {content.length ? <Subheader>Content plugins</Subheader> : null}
          {content.map((plugin: ContentPlugin, k: Number) => {
            const initialState = plugin.createInitialState()

            return (
              <Item
                plugin={plugin}
                key={k}
                insert={{
                  content: {
                    plugin,
                    state: initialState
                  }
                }}
              />
            )
          })}
        </List>
        <List>
          {layout.length ? <Subheader>Layout plugins</Subheader> : null}
          {layout.map((plugin: LayoutPlugin, k: Number) => {
            const initialState = plugin.createInitialState()
            const children = plugin.createInitialChildren()

            return (
              <Item
                plugin={plugin}
                key={k}
                insert={{
                  ...children,
                  layout: {
                    plugin,
                    state: initialState
                  }
                }}
              />
            )
          })}
        </List>
      </Drawer>
    )
  }
}

const mapStateToProps = createStructuredSelector({ isInsertMode })

const Decorated = connect(mapStateToProps)(Raw)

const Toolbar = (props: any) => (
  <Provider {...props}>
    <Decorated {...props} />
  </Provider>
)

export default Toolbar
