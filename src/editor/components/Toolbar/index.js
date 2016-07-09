import React, { PropTypes, Component } from 'react'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import { connect } from 'react-redux'
import { isInsertMode } from 'src/editor/selector/display'
import { createStructuredSelector } from 'reselect'
import Panorama from 'material-ui/svg-icons/image/panorama'
import Subject from 'material-ui/svg-icons/action/subject'
import AspectRatio from 'material-ui/svg-icons/action/aspect-ratio'
import Movie from 'material-ui/svg-icons/av/movie'
import Announcement from 'material-ui/svg-icons/action/announcement'
// import ViewHeadline from 'material-ui/svg-icons/action/view-headline'
// import ViewCarousel from 'material-ui/svg-icons/action/view-carousel'
// import VoteBox from 'material-ui/svg-icons/action/thumbs-up-down'
import FilterFrames from 'material-ui/svg-icons/image/filter-frames'
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';

const items = {
  content: [{
    icon: <Subject />,
    text: 'Text'
  }, {
    icon: <Panorama />,
    text: 'Image'
  }, {
    icon: <Movie />,
    text: 'Movie'
  }, {
    icon: <AspectRatio />,
    text: 'Spacer'
  }],
  layout: [{
    icon: <Announcement />,
    text: 'Announcement'
  }, {
    icon: <FilterFrames />,
    text: 'Spoiler'
  }]
}

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
    const { isInsertMode } = this.props
    const { isSearching, searchFilter } = this.state
    const content = items.content.filter(searchFilter)
    const layout = items.layout.filter(searchFilter)

    return (
      <Drawer open={isInsertMode}>
        <Subheader>Content</Subheader>
        <div style={{ padding: '0 16px' }}>
          <TextField
            hintText="Search anything"
            fullWidth={true}
            onChange={this.onSearch}
          />
        </div>
        <List>
          {content.length ? <Subheader>Content</Subheader> : null}
          {content.map(({ icon, text }, k) => (
            <ListItem key={k}
                      leftAvatar={<Avatar icon={icon} />}
                      primaryText={text}
            />
          ))}
        </List>
        <List>
          {layout.length ? <Subheader>Layout</Subheader> : null}
          {layout.map(({ icon, text }, k) => (
            <ListItem key={k}
                      leftAvatar={<Avatar icon={icon} />}
                      primaryText={text}
            />
          ))}
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
  isInsertMode: PropTypes.bool.isRequired
}

const mapStateToProps = createStructuredSelector({
  isInsertMode
})

export default connect(mapStateToProps)(Toolbar)
