/* eslint-disable no-alert, prefer-reflect, no-underscore-dangle */
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import React, { Component } from 'react'
import cssModules from 'react-css-modules'
import Portal from 'react-portal'
import position from 'selection-position'
import { Editor } from 'slate'
import pathOr from 'ramda/src/pathOr'

import BottomToolbar from 'src/editor/components/BottomToolbar'
import { ContentPluginProps } from 'src/editor/service/plugin/classes'
import styles from './index.scoped.css'

const onBlur = (_event, _data, state) => state

export type Props = ContentPluginProps<{ editorState: Object }>

class Slate extends Component {
  componentDidMount = () => {
    this.selection = window.getSelection()
    this.updateToolbar()
  }

  // FIXME #135
  // componentWillReceiveProps = (next) => {
  // //   // focus does not work, probably because dom blur and removeAllRanges is missing in slate.
  // //   // What we do is create a ref (this.onRef) on a div that is wrapping slate. If selection is lost in slate state
  // //   // we blur the contenteditable and remove all ranges.
  // //
  // //   // https://jsfiddle.net/q2mmegtj/4/
  //   const isFocused = pathOr(false, ['state', 'editorState', 'selection', 'isFocused'], next)
  //   const wasFocused = pathOr(false, ['state', 'editorState', 'selection', 'isFocused'], this.props)
  // //   if (!isFocused && wasFocused) {
  // //     console.log('executing blur on cell', this.props.id)
  // //     this._component.querySelector('[contenteditable]').blur()
  // //     // console.log(window.getSelection().getRangeAt(0))
  // //     window.setTimeout(() => {
  // //       if (window.getSelection().rangeCount === 0) {
  // //         return
  // //       }
  // //
  // //       const isSlateNext = window.getSelection().getRangeAt(0).startContainer.isContentEditable
  // //       if (!isSlateNext) {
  // //         console.log('removing ranges :)')
  // //         window.getSelection().removeAllRanges()
  // //       }
  // //     }, 10)
  // //
  // //     // this works well when the next cell is not another slate instance, but something different
  // //     // window.setTimeout(() => window.getSelection().removeAllRanges(), 1)
  // //     // this._component.querySelector('[contenteditable]').blur()
  // //   }
  // //
  // //   // This code would potentially focus the contenteditable, but it has issues the selection, because we are blurring
  // //   // it in the code above and removing all ranges. This can lead to weird behaviour, which is why this is disabled.
  // //   //
  //
  //   if (isFocused && !wasFocused) {
  //     console.log('executing focus on cell', this.props.id)
  //     window.setTimeout(() => {
  //       this.onStateChange(
  //         next.state.editorState.transform().moveTo(window.getSelection()).apply()
  //       )
  //     }, 100)
  //     this._component.querySelector('[contenteditable]').focus()
  //   }
  // }

  shouldComponentUpdate = (nextProps) => (
    nextProps.state.editorState !== this.props.state.editorState
    || nextProps.state.toolbar !== this.props.state.toolbar
    || nextProps.focused !== this.props.focused
    || nextProps.readOnly !== this.props.readOnly
  )

  componentDidUpdate = () => this.updateToolbar()

  props: ContentPluginProps<{ editorState: Object }>

  onStateChange = (editorState) => {
    this.props.onChange({ editorState })
  }

  handleOpen = (portal) => {
    this.props.onChange({ toolbar: portal.firstChild })
  }

  updateToolbar = () => {
    const { editorState, toolbar } = this.props.state

    if (!toolbar || editorState.isBlurred || editorState.isCollapsed) {
      return
    }

    const { left, top, width } = position()

    toolbar.style.opacity = 1
    toolbar.style.top = `${top + window.scrollY - toolbar.offsetHeight}px`
    toolbar.style.left = `${left + window.scrollX - (toolbar.offsetWidth / 2) + (width / 2)}px`
  }

  // onRef = (c) => {
  //   this._component = c
  // }

  render() {
    const {
      focused,
      readOnly,
      state: { editorState },
      schema,
      plugins,
      onKeyDown,
      HoverButtons,
      ToolbarButtons
    } = this.props
    const isOpened = editorState.isExpanded && editorState.isFocused

    return (
      <div>
        <Portal isOpened={isOpened} onOpen={this.handleOpen}>
          <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            {/* TODO editor-container is needed to avoid global blurry, #190 */}
            <div styleName="inline-toolbar" className="editor-container" style={{ padding: 0 }}>
              <HoverButtons editorState={editorState} onChange={this.onStateChange}/>
            </div>
          </MuiThemeProvider>
        </Portal>
        <Editor
          onChange={this.onStateChange}
          onKeyDown={onKeyDown}
          readOnly={Boolean(readOnly)}
          onBlur={onBlur}
          schema={schema}
          state={editorState}
          plugins={plugins}
        />
        {readOnly ? null : (
          <BottomToolbar open={focused}>
            <ToolbarButtons editorState={editorState} onChange={this.onStateChange}/>
          </BottomToolbar>
        )}
      </div>
    )
  }
}

export default cssModules(Slate, styles)
