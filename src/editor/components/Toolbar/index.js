import React, { PropTypes, Component } from 'react'
import Drawer from 'material-ui/Drawer'
import { connect } from 'react-redux'
import { isInsertMode } from 'src/editor/selector/display'
import { createStructuredSelector } from 'reselect'
import draggable from './Draggable'
import Avatar from 'material-ui/Avatar'
import List from 'material-ui/List/List'
import ListItem from 'material-ui/List/ListItem'
import Subheader from 'material-ui/Subheader'
import Toggle from 'material-ui/Toggle'
import Divider from 'material-ui/Divider'
import TextField from 'material-ui/TextField'

// import ViewHeadline from 'material-ui/svg-icons/action/view-headline'
// import ViewCarousel from 'material-ui/svg-icons/action/view-carousel'
// import VoteBox from 'material-ui/svg-icons/action/thumbs-up-down'

class Toolbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchFilter: (a) => (a),
      isSearching: false
    }
    this.onSearch = this.onSearch.bind(this)
  }

  onSearch(e) {
    this.setState({
      searchFilter: ((v) => (a) => a.text.toLowerCase().indexOf(v) > -1)(e.target.value.toLowerCase()),
      isSearching: e.target.value.length > 0
    })
  }

  render() {
    const { isInsertMode, plugins } = this.props
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
          {content.map(({ Component, icon, text, name, version, insert }, k) => {
            const Draggable = draggable(name)
            if (!icon) {
              return
            }

            return (
              <Draggable key={k} {...{ plugin: { name, version, Component }, props: insert }}>
                <ListItem
                  leftAvatar={<Avatar icon={icon} />}
                  primaryText={text}
                />
              </Draggable>
            )
          })}
        </List>
        <List>
          {layout.length ? <Subheader>Layout</Subheader> : null}
          {layout.map(({ Component, icon, text, name, version, insert }, k) => {
            if (!icon && !text) {
              return
            }

            const Draggable = draggable(name)
            return (
              <Draggable key={k} {...{ ...insert, layout: { name, version, Component, props: insert }}}>
                <ListItem
                  leftAvatar={<Avatar icon={icon} />}
                  primaryText={text}
                />
              </Draggable>
            )
          })}
        </List>
        {isSearching ? null : (
          <div>
            <Divider />
            <List>
              <Subheader>Settings</Subheader>
              <ListItem primaryText="Back up drafts" rightToggle={<Toggle />}/>
            </List>
          </div>
        )}
      </Drawer>
    )
  }
}

Toolbar.propTypes = {
  plugins: PropTypes.array.isRequired,
  isInsertMode: PropTypes.bool.isRequired
}

const mapStateToProps = createStructuredSelector({
  isInsertMode
})

export default connect(mapStateToProps)(Toolbar)
