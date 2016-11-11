/* eslint-disable no-alert, prefer-reflect, no-underscore-dangle */
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import React, { Component } from 'react'
import cssModules from 'react-css-modules'
import Portal from 'react-portal'
import position from 'selection-position'
import { Editor } from 'slate'

import BottomToolbar from 'src/editor/components/BottomToolbar'
import { ContentPluginProps } from 'src/editor/service/plugin/classes'
import styles from './index.scoped.css'

const onBlur = (_event, _data, state) => state

export type Props = ContentPluginProps<{ editorState: Object }>

class Slate extends Component {
  componentDidMount = () => this.updateToolbar()

  // FIXME #135
  // componentWillReceiveProps = (next) => {
    // focus does not work, probably because dom blur and removeAllRanges is missing in slate.
    // What we do is create a ref (this.onRef) on a div that is wrapping slate. If selection is lost in slate state
    // we blur the contenteditable and remove all ranges.
    // if (!next.state.editorState.selection.isFocused && this.props.state.editorState.selection.isFocused) {
    //   this._component.querySelector('[contenteditable]').blur()
    //   window.setTimeout(() => window.getSelection().removeAllRanges(), 0)
    // }

    // This code would potentially focus the contenteditable, but it has issues the selection, because we are blurring
    // it in the code above and removing all ranges. This can lead to weird behaviour, which is why this is disabled.
    //
    //  if (next.state.editorState.selection.isFocused && !this.props.state.editorState.selection.isFocused) {
    //    this._component.querySelector('[contenteditable]').focus()
    //  }
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

  onRef = (c) => {
    this._component = c
  }

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
              <HoverButtons editorState={editorState} onChange={this.onStateChange} />
            </div>
          </MuiThemeProvider>
        </Portal>
        <div ref={this.onRef}>
          <Editor
            onChange={this.onStateChange}
            onKeyDown={onKeyDown}
            readOnly={Boolean(readOnly)}
            onBlur={onBlur}
            schema={schema}
            state={editorState}
            plugins={plugins}
          />
        </div>
        {readOnly ? null : (
          <BottomToolbar open={focused}>
            <ToolbarButtons editorState={editorState} onChange={this.onStateChange} />
          </BottomToolbar>
        )}
      </div>
    )
  }
}

export default cssModules(Slate, styles)
