// @flow
import React, { Component } from 'react'
import Cell from 'src/editor/components/Cell'
import { shouldPureComponentUpdate } from 'src/editor/helper/shouldComponentUpdate'
import { purifiedEditable } from 'src/editor/selector/editable'
import { connect } from 'react-redux'
import { isLayoutMode, isResizeMode, isPreviewMode } from 'src/editor/selector/display'
import { createStructuredSelector } from 'reselect'
import cssModules from 'react-css-modules'
import dimensions from 'react-dimensions'
import Notifier, { dismissedMobilePreviewKey } from 'src/editor/components/Notifier'
import { blurAllCells } from 'src/editor/actions/cell'
import NativeListener from 'react-native-listener'
import type { EditableComponentState, Cell as CellType } from 'types/editable'
import * as commonStyles from 'src/editor/styles'
import styles from './index.scoped.css'

let handling = false

// We need to stop some events from bubbling up
const stopPropagation = (blurAllCells: Function) => (e: Event) => {
  let c = e.target
  while (c = c.parentElement) {
    if (c.classList.contains('editor-container')) {
      return
    }
  }
  blurAllCells()
}

class Editable extends Component {
  componentDidMount() {
    if (!handling && document && document.body) {
      document.body.addEventListener('click', stopPropagation(this.props.blurAllCells))
      handling = true
    }
  }

  shouldComponentUpdate = shouldPureComponentUpdate

  componentWillUnmount() {
    if (document && document.body) {
      document.body.removeEventListener('click', stopPropagation(this.props.blurAllCells))
      handling = false
    }
  }

  props: EditableComponentState

  render() {
    const { id, containerWidth, containerHeight, isLayoutMode, isResizeMode, isPreviewMode, node: { cells = [] }, ...props } = this.props

    if (isLayoutMode || isResizeMode) {
      props.styles = {
        ...props.styles,
        ...commonStyles.flexbox,
        ...styles // override defaults
      }
    }

    return (
      <NativeListener onClick={stopPropagation}>
        <div styles={props.styles} className={`editor-container ${id}`} onClick={stopPropagation}>
          <div styles={props.styles} styleName="row" className="editor-row">
            {cells.map((c: string | CellType) => (
              <Cell
                rowWidth={containerWidth}
                rowHeight={containerHeight}
                editable={id}
                ancestors={[]}
                key={c}
                id={c}
              />
            ))}
          </div>
          <Notifier
            message="Resize the browser window for mobile preview."
            open={isPreviewMode}
            id={dismissedMobilePreviewKey}
          />
        </div>
      </NativeListener>
    )
  }
}

const mapStateToProps = createStructuredSelector({ node: purifiedEditable, isLayoutMode, isResizeMode, isPreviewMode })

const mapDispatchToProps = {
  blurAllCells
}

export default dimensions()(connect(mapStateToProps, mapDispatchToProps)(cssModules(Editable, {
  ...commonStyles.floating,
  ...commonStyles.common,
  ...styles
})))
