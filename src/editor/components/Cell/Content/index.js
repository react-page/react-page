import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateCell } from 'src/editor/actions/cell'
import { shouldPureComponentUpdate } from 'src/editor/helper/shouldComponentUpdate'
import { isEditMode, isLayoutMode, isPreviewMode } from 'src/editor/selector/display'
import { createStructuredSelector } from 'reselect'

const fallback = (...args) => console.error('onChange callback is missing', ...args)

class Content extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate

  render() {
    const { isEditMode, id, node: { plugin: { Component }, props = {} }, updateCell = fallback } = this.props

    return (
      <Component
        id={id}
        {...props}
        readOnly={!isEditMode}
        onChange={updateCell}
      />
    )
  }
}

Content.propTypes = {
  id: PropTypes.string.isRequired,
  updateCell: PropTypes.func.isRequired,

  isEditMode: PropTypes.bool.isRequired,
  isLayoutMode: PropTypes.bool.isRequired,
  isPreviewMode: PropTypes.bool.isRequired,

  node: PropTypes.shape({
    plugin: PropTypes.shape({
      Component: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired
    }).isRequired,
    props: PropTypes.object.isRequired,
  }).isRequired,
}

const mapStateToProps = createStructuredSelector({ isEditMode, isLayoutMode, isPreviewMode })

const mapDispatchToProps = (dispatch, { id }) => bindActionCreators({
  updateCell: updateCell(id)
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Content)
