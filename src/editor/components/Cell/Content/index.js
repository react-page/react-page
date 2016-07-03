import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateCell } from 'src/editor/actions/cell'
import { isEditMode, isLayoutMode, isPreviewMode } from 'src/editor/selector/display'
import { createStructuredSelector } from 'reselect'

const fallback = (...args) => console.error('onChange callback is missing', ...args)

const onChange = (id, cb) => (state) => cb({ id }, state)

const Content = ({ isEditMode, id, plugin: { Component }, props = {}, updateCell = fallback }) => (
  <Component
    {...props}
    readOnly={!isEditMode}
    onChange={onChange(id, updateCell)} />
)

Content.propTypes = {
  plugin: PropTypes.shape({
    Component: PropTypes.element.isRequired
  }).isRequired,
  id: PropTypes.string.isRequired,
  props: PropTypes.object.isRequired,
  updateCell: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  isLayoutMode: PropTypes.bool.isRequired,
  isPreviewMode: PropTypes.bool.isRequired
}

const mapStateToProps = createStructuredSelector({ isEditMode, isLayoutMode, isPreviewMode })

const mapDispatchToProps = (dispatch) => bindActionCreators({
  updateCell
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Content)
