// @flow
import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateCell } from 'src/editor/actions/cell'
import { shouldPureComponentUpdate } from 'src/editor/helper/shouldComponentUpdate'
import { isEditMode, isLayoutMode, isPreviewMode } from 'src/editor/selector/display'
import { createStructuredSelector } from 'reselect'
import type { ComponentizedCell } from 'types/editable'

const fallback = (...args: Array<string>) => console.error('onChange callback is missing', ...args)

class Content extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate

  render() {
    const { isEditMode, id, node: { content: { plugin: { Component }, state = {} }, focused }, updateCell = fallback }: ComponentizedCell = this.props

    let focusProps
    if (isEditMode) {
      const { focusCell, blurCell } = this.props

      focusProps = {
        onBlur: blurCell,
        onFocus: focusCell,
        tabIndex: -1
      }
    }

    return (
      <div {...focusProps}>
        <Component
          id={id}
          state={state}
          focused={Boolean(isEditMode && focused)}
          readOnly={!isEditMode}
          onChange={updateCell}
        />
      </div>
    )
  }
}

Content.propTypes = {
  id: PropTypes.string.isRequired,

  updateCell: PropTypes.func.isRequired,
  focusCell: PropTypes.func.isRequired,
  blurCell: PropTypes.func.isRequired,

  isEditMode: PropTypes.bool.isRequired,
  isLayoutMode: PropTypes.bool.isRequired,
  isPreviewMode: PropTypes.bool.isRequired,

  node: PropTypes.shape({
    content: PropTypes.shape({
      plugin: PropTypes.shape({
        Component: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired
      }).isRequired
    }),
    props: PropTypes.object.isRequired,
  }).isRequired,
}

const mapStateToProps = createStructuredSelector({ isEditMode, isLayoutMode, isPreviewMode })

const mapDispatchToProps = (dispatch: Function, { id }: ComponentizedCell) => bindActionCreators({
  updateCell: updateCell(id)
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Content)
