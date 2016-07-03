import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateCell } from 'src/editor/actions/cell'

const fallback = (...args) => console.error('onChange callback is missing', ...args)

const Content = ({ id, plugin: { Component }, props = {}, updateCell = fallback }) => (
  <Component {...props} onChange={(state) => updateCell({ id }, state)} />
)

Content.propTypes = {
  plugin: PropTypes.shape({
    Component: PropTypes.element.isRequired
  }).isRequired,
  id: PropTypes.string.isRequired,
  props: PropTypes.object.isRequired,
  updateCell: PropTypes.func.isRequired
}

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  updateCell
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Content)
