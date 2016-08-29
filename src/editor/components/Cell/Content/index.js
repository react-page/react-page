// @flow
import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateCellContent } from 'src/editor/actions/cell'
import { shouldPureComponentUpdate } from 'src/editor/helper/shouldComponentUpdate'
import { isEditMode, isLayoutMode, isPreviewMode } from 'src/editor/selector/display'
import { createStructuredSelector } from 'reselect'
import type { ComponentizedCell } from 'types/editable'

const fallback = (...args: Array<string>) => console.error('onChange callback is missing', ...args)

class Content extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate

  render() {
    const { isPreviewMode, isEditMode, editable, id, node: { content: { plugin: { Component }, state = {} }, focused }, updateCellContent = fallback }: ComponentizedCell = this.props

    let focusProps
    if (!isPreviewMode) {
      const { focusCell, blurAllCells } = this.props

      focusProps = {
        onMouseUp: () => {
          if (!focused) {
            blurAllCells()
            focusCell()
          }
        }
      }
    }

    return (
      <div {...focusProps}>
        <Component
          editable={editable}
          id={id}
          state={state}
          focused={isEditMode && focused}
          readOnly={!isEditMode}
          onChange={updateCellContent}
        />
      </div>
    )
  }
}

Content.propTypes = {
  id: PropTypes.string.isRequired,

  updateCellContent: PropTypes.func.isRequired,
  focusCell: PropTypes.func.isRequired,
  blurCell: PropTypes.func.isRequired,

  isEditMode: PropTypes.bool.isRequired,
  isLayoutMode: PropTypes.bool.isRequired,
  isPreviewMode: PropTypes.bool.isRequired,

  node: PropTypes.shape({
    content: PropTypes.shape({
      plugin: PropTypes.shape({
        Component: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired
      }).isRequired,
      state: PropTypes.object.isRequired
    }),
  }).isRequired,
}

const mapStateToProps = createStructuredSelector({ isEditMode, isLayoutMode, isPreviewMode })

const mapDispatchToProps = (dispatch: Function, { id }: ComponentizedCell) => bindActionCreators({
  updateCellContent: updateCellContent(id)
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Content)
