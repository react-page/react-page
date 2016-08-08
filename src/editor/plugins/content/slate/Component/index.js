import React, { Component, PropTypes } from 'react'
import cssModules from 'react-css-modules'
import Portal from 'react-portal'
import position from 'selection-position'
import { Editor, Html } from 'slate'

import IconButton from 'material-ui/IconButton'
import BoldIcon from 'material-ui/svg-icons/editor/format-bold'
import ItalicIcon from 'material-ui/svg-icons/editor/format-italic'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Drawer from 'material-ui/Drawer'

import nodes from './nodes'
import styles from './index.scoped.css'

const rules = [{
  deserialize: (el) => el.tagName === 'p' ? {
    kind: 'block',
    type: 'paragraph',
    nodes: [{ kind: 'text', ranges: [{ text: el.children[0].data }] }]
  } : null
}, {
  deserialize: (el) => el.tagName === 'h1' ? {
    kind: 'block',
    type: 'heading-one',
    nodes: [{ kind: 'text', ranges: [{ text: el.children[0].data }] }]
  } : null
}, {
  deserialize: (el) => el.tagName === 'h2' ? {
    kind: 'block',
    type: 'heading-two',
    nodes: [{ kind: 'text', ranges: [{ text: el.children[0].data }] }]
  } : null
}, {
  deserialize: (el) => el.tagName === 'h3' ? {
    kind: 'block',
    type: 'heading-three',
    nodes: [{ kind: 'text', ranges: [{ text: el.children[0].data }] }]
  } : null
}]

const html = new Html({ rules })

const renderNode = (node) => {
  switch (node.type) {
    case 'heading-one':
      return nodes.HeadingOne
    case 'heading-two':
      return nodes.H2
    case 'heading-three':
      return nodes.H3
    case 'code':
      return nodes.CodeNode
    default:
      return nodes.Paragraph
  }
}

const MARKS = {
  bold: ({ children }) => <strong>{children}</strong>,
  italic: ({ children }) => <em>{children}</em>
}

/* eslint no-invalid-this: "off" */
class Slate extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount = () => this.updateToolbar()

  shouldComponentUpdate = (nextProps, nextState) => (
    nextProps.editorState !== this.props.editorState
      || nextProps.importFromHtml !== this.props.importFromHtml
      || nextProps.readOnly !== this.props.readOnly
      || nextState.toolbar !== this.state.toolbar
  )

  componentDidUpdate = () => this.updateToolbar()

  onStateChange = (editorState) => {
    this.props.onChange({ editorState })
  }

  handleOpen = (portal) => {
    this.setState({ toolbar: portal.firstChild })
  }

  updateToolbar = () => {
    const { toolbar } = this.state
    const { editorState } = this.props

    if (!toolbar || editorState.isBlurred || editorState.isCollapsed) {
      return
    }

    const { left, top, width } = position()

    toolbar.style.opacity = 1
    toolbar.style.top = `${top + window.scrollY - toolbar.offsetHeight}px`
    toolbar.style.left = `${left + window.scrollX - (toolbar.offsetWidth / 2) + (width / 2)}px`
  }

  renderMarkButton = (type, icon) => {
    const onClick = (e) => {
      e.preventDefault()

      const { editorState } = this.props

      this.onStateChange(
        // eslint-disable-next-line prefer-reflect
        editorState
          .transform()
          .toggleMark(type)
          .apply()
      )
    }

    const { editorState } = this.props
    const isActive = editorState && editorState.marks.some((mark) => mark.type === type)

    return (
      <IconButton onMouseDown={onClick} iconStyle={isActive ? { color: '#007EC1' } : {}}>
        {icon}
      </IconButton>
    )
  }

  render() {
    const { focused, readOnly, importFromHtml, editorState } = this.props
    const state = editorState || html.deserialize(importFromHtml, { terse: true })
    const isOpened = state.isExpanded && state.isFocused

    return (
      <div>
        <Portal isOpened={isOpened} onOpen={this.handleOpen}>
          <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            <div styleName="toolbar">
              {this.renderMarkButton('bold', <BoldIcon />)}
              {this.renderMarkButton('italic', <ItalicIcon />)}
            </div>
          </MuiThemeProvider>
        </Portal>
        <Editor
          readOnly={Boolean(readOnly)}
          renderNode={renderNode}
          renderMark={(mark) => MARKS[mark.type]}
          placeholder="Write something..."
          onChange={this.onStateChange}
          state={state}
        />
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <Drawer open={focused}>
            blabla
          </Drawer>
        </MuiThemeProvider>
      </div>
    )
  }
}

Slate.propTypes = {
  editorState: PropTypes.object,
  importFromHtml: PropTypes.string,
  readOnly: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
}

export default cssModules(Slate, styles)
