import React, { PropTypes } from 'react'
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
import ViewCarousel from 'material-ui/svg-icons/action/view-carousel'
import VoteBox from 'material-ui/svg-icons/action/thumbs-up-down'

export const Toolbar = ({ isInsertMode }) => (
  <Drawer open={isInsertMode}>
    <h2>Content</h2>
    <MenuItem><Subject /> Text cell</MenuItem>
    <MenuItem><Panorama /> Image</MenuItem>
    <MenuItem><Movie /> Video</MenuItem>
    <MenuItem><ViewCarousel /> Gallery</MenuItem>
    <MenuItem><VoteBox /> Vote box</MenuItem>
    <MenuItem><AspectRatio /> Spacer</MenuItem>
    <h2>Layout</h2>
    <MenuItem><Announcement /> Announcement</MenuItem>
  </Drawer>
)

Toolbar.propTypes = {
  isInsertMode: PropTypes.bool.isRequired
}

const mapStateToProps = createStructuredSelector({
  isInsertMode
})

export default connect(mapStateToProps)(Toolbar)
