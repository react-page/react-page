// @flow
import React, { Component } from 'react'
import Cell from 'src/editor/components/Cell'
import { shouldPureComponentUpdate } from 'src/editor/helper/shouldComponentUpdate'
import { purifiedEditable } from 'src/editor/selector/editable'
import { connect, Provider } from 'react-redux'
import { isLayoutMode, isResizeMode, isPreviewMode } from 'src/editor/selector/display'
import { createStructuredSelector } from 'reselect'
import cssModules from 'react-css-modules'
import dimensions from 'src/editor/components/Dimensions'
import Notifier, { dismissedMobilePreviewKey } from 'src/editor/components/Notifier'
import { blurAllCells } from 'src/editor/actions/cell'
import * as commonStyles from 'src/editor/styles'
import styles from './index.scoped.css'
import { enableGlobalBlurring, disableGlobalBlurring } from './blur'
import serverContext from 'src/editor/components/ServerContext/connect'
import DragDropContext from 'src/editor/components/DragDropContext'
import HotKeyDecorator from 'src/editor/components/HotKey/Decorator'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { updateEditable } from 'src/editor/actions/editables'
import Editor from './index.js'

import type { Editable as EditableType, EditableComponentState, Cell as CellType } from 'types/editable'

class Inner extends Component {
  componentDidMount() {
    enableGlobalBlurring(this.props.blurAllCells)
  }

  shouldComponentUpdate = shouldPureComponentUpdate

  componentWillUnmount() {
    disableGlobalBlurring(this.props.blurAllCells)
  }

  props: EditableComponentState

  render() {
    const { id, containerWidth, containerHeight, isLayoutMode, isResizeMode, isPreviewMode, node, ...props } = this.props
    if (!node) {
      return null
    }

    const { cells = [] } = node

    if (isLayoutMode || isResizeMode) {
      props.styles = {
        ...props.styles,
        ...commonStyles.flexbox,
        ...styles // override defaults
      }
    }

    return (
      <div styles={props.styles} className={'editor-container'}>
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
        {
          this.props.isServerContext
            ? null
            : (
            <Notifier
              message="Resize the browser window for mobile preview."
              open={isPreviewMode}
              id={dismissedMobilePreviewKey}
            />
          )
        }
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({ node: purifiedEditable, isLayoutMode, isResizeMode, isPreviewMode })

const mapDispatchToProps = { blurAllCells }

const InnerConnected = serverContext()(dimensions()(connect(mapStateToProps, mapDispatchToProps)(cssModules(Inner, {
  ...commonStyles.floating, ...commonStyles.common, ...styles
}))))

class Editable extends Component {
  componentDidMount() {
    if (!this.props.state.id) {
      throw new Error('The state must have an unique id')
    }

    this.props.editor.store.dispatch(updateEditable({
      ...this.props.editor.plugins.unserialize(this.props.state),
      config: {
        whitelist: this.props.editor.plugins.getRegisteredNames()
      }
    }))
  }

  props: {
    state: EditableType,
    editor: Editor,
  }

  render() {
    const { state: { id }, editor: { store } } = this.props

    return (
      <Provider store={store}>
        <DragDropContext>
          <HotKeyDecorator id={id}>
            <MuiThemeProvider muiTheme={getMuiTheme()}>
              <InnerConnected id={id} />
            </MuiThemeProvider>
          </HotKeyDecorator>
        </DragDropContext>
      </Provider>
    )
  }
}

export default Editable
