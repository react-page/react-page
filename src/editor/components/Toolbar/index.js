// @flow
import React, { Component } from 'react'
import Drawer from 'material-ui/Drawer'
import { connect } from 'react-redux'
import { isInsertMode } from 'src/editor/selector/display'
import { createStructuredSelector } from 'reselect'
import List from 'material-ui/List/List'
import ListItem from 'material-ui/List/ListItem'
import Subheader from 'material-ui/Subheader'
import Toggle from 'material-ui/Toggle'
import Divider from 'material-ui/Divider'
import TextField from 'material-ui/TextField'
import Item from './Item'
import { LayoutPlugin, ContentPlugin } from 'src/editor/service/plugin/classes'

type Props = {
  isInsertMode: boolean,
  plugins: {
    content: LayoutPlugin[],
    layout: ContentPlugin[]
  }
}

class Toolbar extends Component {
  constructor(props: Props) {
    super(props)
    this.state = {
      searchFilter: (a: any) => (a),
      isSearching: false
    }

    this.onSearch = this.onSearch.bind(this)
  }

  state: {
    searchFilter: Function,
    isSearching: boolean
  }

  componentDidUpdate() {
    if (this.input && this.props.isInsertMode) {
      setTimeout(() => this.input.querySelector('input').focus(), 100)
    }
  }

  input: HTMLInputElement

  onRef = (component: Component<*, *, *>) => {
    this.input = component
  }

  onSearch = (e: Event) => {
    const target = e.target
    if (target instanceof HTMLInputElement) {
      this.setState({
        searchFilter: ((v: any) => ({ text = '' }: Object) => text.toLowerCase().indexOf(v) > -1)(target.value.toLowerCase()),
        isSearching: target.value.length > 0
      })
    }

    // throw new TypeException('target', 'HTMLInputElement', e.target)
  }

  render() {
    const { isInsertMode, plugins } = this.props
    const { isSearching, searchFilter } = this.state
    const content = plugins.plugins.content.filter(searchFilter)
    const layout = plugins.plugins.layout.filter(searchFilter)

    return (
      <Drawer open={isInsertMode}>
        <Subheader>Content</Subheader>
        <div style={{ padding: '0 16px' }} ref={this.onRef}>
          <TextField
            hintText="Search anything"
            fullWidth
            onChange={this.onSearch}
          />
        </div>
        <List>
          {content.length ? <Subheader>Content</Subheader> : null}
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
          {layout.length ? <Subheader>Layout</Subheader> : null}
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
        {isSearching ? null : (
          <div>
            <Divider />
            <List>
              <Subheader>Settings</Subheader>
              <ListItem primaryText="Back up drafts" rightToggle={<Toggle />} />
            </List>
          </div>
        )}
      </Drawer>
    )
  }
}

const mapStateToProps = createStructuredSelector({ isInsertMode })

export default connect(mapStateToProps)(Toolbar)
