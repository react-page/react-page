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
  props: ComponentizedCell

  render() {
    const { isPreviewMode, isEditMode, editable, id, node: { content: { plugin: { Component, ...plugin }, state = {} }, focused }, updateCellContent = fallback } = this.props

    let focusProps
    if (!isPreviewMode) {
      const { focusCell, blurAllCells } = this.props

      focusProps = {
        onMouseDown: () => {
          if (!focused) {
            blurAllCells()
            focusCell({ Component, plugin })
          }
          return true
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

const mapStateToProps = createStructuredSelector({ isEditMode, isLayoutMode, isPreviewMode })

const mapDispatchToProps = (dispatch: Function, { id }: ComponentizedCell) => bindActionCreators({
  updateCellContent: updateCellContent(id)
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Content)
