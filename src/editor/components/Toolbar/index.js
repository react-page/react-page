// @flow
/* eslint no-invalid-this: "off" */
import React, { PropTypes, Component } from 'react'
import Drawer from 'material-ui/Drawer'
import { connect } from 'react-redux'
import { isInsertMode } from 'src/editor/selector/display'
import { clearHover } from 'src/editor/actions/cell/drag'
import { insertMode, editMode, layoutMode } from 'src/editor/actions/display'
import { createStructuredSelector } from 'reselect'
import List from 'material-ui/List/List'
import ListItem from 'material-ui/List/ListItem'
import Subheader from 'material-ui/Subheader'
import Toggle from 'material-ui/Toggle'
import Divider from 'material-ui/Divider'
import TextField from 'material-ui/TextField'
import Item from './Item'
import { LayoutPlugin, ContentPlugin } from 'src/editor/service/plugin/classes'
import TypeException from 'src/editor/exceptions/TypeException'

// import ViewHeadline from 'material-ui/svg-icons/action/view-headline'
// import ViewCarousel from 'material-ui/svg-icons/action/view-carousel'
// import VoteBox from 'material-ui/svg-icons/action/thumbs-up-down'

class Toolbar extends Component {
  constructor(props: Object) {
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

  onSearch = (e: Event) => {
    if (e.target instanceof HTMLInputElement) {
      this.setState({
        searchFilter: ((v: any) => (a: any) => a.text.toLowerCase().indexOf(v) > -1)(e.target.value.toLowerCase()),
        isSearching: e.target.value.length > 0
      })
    }

    throw new TypeException('target', 'HTMLInputElement', e.target)
  }

  render() {
    const { isInsertMode, plugins, layoutMode, insertMode, editMode, clearHover } = this.props
    const { isSearching, searchFilter } = this.state
    const content = plugins.plugins.content.filter(searchFilter)
    const layout = plugins.plugins.layout.filter(searchFilter)

    return (
      <Drawer open={isInsertMode}>
        <Subheader>Content</Subheader>
        <div style={{ padding: '0 16px' }}>
          <TextField
            hintText="Search anything"
            fullWidth
            onChange={this.onSearch}
          />
        </div>
        <List>
          {content.length ? <Subheader>Content</Subheader> : null}
          {content.map(({ name, version, Component, ...plugin }: ContentPlugin, k: Number) => {
            const initialState = plugin.createInitialState()

            return (
              <Item
                {...{ ...plugin, clearHover, layoutMode, insertMode, editMode, name, version, Component }}
                name={name}
                version={version}
                key={k}
                insert={{
                  content: {
                    plugin: { name, version, Component },
                    state: initialState
                  }
                }}
              />
            )
          })}
        </List>
        <List>
          {layout.length ? <Subheader>Layout</Subheader> : null}
          {layout.map(({ name, version, Component, ...plugin }: LayoutPlugin, k: Number) => {
            const initialState = plugin.createInitialState()
            const children = plugin.createInitialChildren()

            return (
              <Item
                {...{ ...plugin, clearHover, layoutMode, insertMode, editMode, name, version, Component }}
                key={k}
                insert={{
                  ...children,
                  layout: {
                    plugin: { name, version, Component },
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

Toolbar.propTypes = {
  plugins: PropTypes.object.isRequired,
  isInsertMode: PropTypes.bool.isRequired,
  insertMode: PropTypes.func.isRequired,
  editMode: PropTypes.func.isRequired,
  layoutMode: PropTypes.func.isRequired,
  clearHover: PropTypes.func.isRequired,
}

const mapStateToProps = createStructuredSelector({ isInsertMode })

const mapDispatchToProps = { insertMode, editMode, layoutMode, clearHover }

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)
