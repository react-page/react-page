// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateCellContent } from 'src/editor/actions/cell'
import { shouldPureComponentUpdate } from 'src/editor/helper/shouldComponentUpdate'
import { isEditMode, isLayoutMode, isPreviewMode } from 'src/editor/selector/display'
import { createStructuredSelector } from 'reselect'
import type { ComponentizedCell } from 'types/editable'
import serverContext from 'src/editor/components/ServerContext/connect'

// TODO clean me up #157
class Content extends Component {
  componentWillReceiveProps(nextProps: ComponentizedCell) {
    const { node: { focused: was } } = this.props
    const { node: { focused: is, focusSource } } = nextProps
    const { isEditMode, editable, id, node: { content: { plugin: { onFocus, onBlur, name, version }, state = {} }, focused }, updateCellContent } = nextProps

    // FIXME this is really shitty because it will break when the state changes before the blur comes through, see #157
    const pass = {
      editable,
      id,
      state,
      focused: isEditMode && focused,
      readOnly: !isEditMode,
      onChange: updateCellContent,
      name, version
    }

    // Basically we check if the focus state changed and if yes, we execute the callback handler from the plugin, that
    // can set some side effects.
    if (!was && is) {
      // We need this because otherwise we lose hotkey focus on elements like spoilers.
      // This could probably be solved in an easier way by listening to window.document?
      //
      setTimeout(() => {
        if (!this.ref) {
          return
        }
        this.ref.focus()
      }, 0)


      onFocus(pass, focusSource)
    } else if (was && !is) {
      onBlur(pass)
    }
  }

  shouldComponentUpdate = shouldPureComponentUpdate
  props: ComponentizedCell

  onRef = (ref: any) => {
    this.ref = ref
  }

  render() {
    const { isPreviewMode, isEditMode, editable, id, node: { content: { plugin: { Component, name, version }, state = {} }, focused }, updateCellContent, isServerContext } = this.props

    let focusProps
    if (!isPreviewMode) {
      const { focusCell } = this.props

      focusProps = {
        onMouseDown: () => {
          if (!focused) {
            focusCell({ source: 'onMouseDown' })
          }
          return true
        }
      }
    }

    return (
      <div {...focusProps}
        tabIndex="-1"
        style={{ outline: 'none' }}
        ref={this.onRef}>
        <Component
          editable={editable}
          id={id}
          state={state}
          focused={isEditMode && focused}
          name={name}
          version={version}
          readOnly={!isEditMode || isServerContext}
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

export default serverContext()(connect(mapStateToProps, mapDispatchToProps)(Content))
