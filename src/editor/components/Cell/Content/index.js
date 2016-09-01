// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateCellContent } from 'src/editor/actions/cell'
import { shouldPureComponentUpdate } from 'src/editor/helper/shouldComponentUpdate'
import { isEditMode, isLayoutMode, isPreviewMode } from 'src/editor/selector/display'
import { createStructuredSelector } from 'reselect'
import type { ComponentizedCell } from 'types/editable'

// TODO clean me up #157
class Content extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate
  props: ComponentizedCell

  componentWillReceiveProps(nextProps: ComponentizedCell) {
    const { node: { focused: was } } = this.props
    const { node: { focused: is } } = nextProps
    const { isEditMode, editable, id, node: { content: { plugin: { onFocus, onBlur }, state = {} }, focused }, updateCellContent } = nextProps

    // FIXME this is really shitty because it will break when fields change #157
    const pass = {
      editable,
      id,
      state,
      focused: isEditMode && focused,
      readOnly: !isEditMode,
      onChange: updateCellContent
    }

    if (!was && is) {
      onFocus(pass)
    } else if (was && !is) {
      onBlur(pass)
    }
  }

  render() {
    const { isPreviewMode, isEditMode, editable, id, node: { content: { plugin: { Component }, state = {} }, focused }, updateCellContent } = this.props

    let focusProps
    if (!isPreviewMode) {
      const { focusCell, blurAllCells } = this.props

      focusProps = {
        onMouseDown: () => {
          if (!focused) {
            blurAllCells()
            focusCell()
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
