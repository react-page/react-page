import React, { Component, PropTypes } from 'react'
import cssModules from 'react-css-modules'
import Portal from 'react-portal'
import position from 'selection-position'
import { Editor } from 'slate'
import { connect } from 'react-redux'
import { undo, redo } from 'src/editor/actions/undo'
import IconButton from 'material-ui/IconButton'
import BoldIcon from 'material-ui/svg-icons/editor/format-bold'
import ItalicIcon from 'material-ui/svg-icons/editor/format-italic'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import BottomToolbar from 'src/editor/components/BottomToolbar'
import nodes from './nodes'
import styles from './index.scoped.css'

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

const Bold = (props) => <strong {...props} />
const Italic = (props) => <em {...props} />
const Fallback = (props) => <span {...props} />

const renderMark = (mark) => {
  switch (mark.type) {
    case 'bold':
      return Bold
    case 'italic':
      return Italic
    default:
      console.warn(`No component specified for mark type ${mark.type}`)
      return Fallback
  }
}

/* eslint no-invalid-this: "off" */
class Slate extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  state = {}

  componentDidMount = () => this.updateToolbar()

  shouldComponentUpdate = (nextProps, nextState) => (
    nextProps.state.editorState !== this.props.state.editorState
    || nextProps.focused !== this.props.focused
    || nextProps.readOnly !== this.props.readOnly
    || nextState.toolbar !== this.state.toolbar
  )

  componentDidUpdate = () => this.updateToolbar()

  onStateChange = (editorState) => {
    this.props.onChange({ editorState })
  }

  onKeyDown = (e: Event, data: { key: string, isMod: bool }, state) => {
    // we need to prevent slate from handling undo and redo
    if (data.isMod && (data.key === 'z' || data.key === 'y')) {
      return state
    }

    // TODO if empty and backspace, remove cell
  }

  handleOpen = (portal) => {
    this.setState({ toolbar: portal.firstChild })
  }

  updateToolbar = () => {
    const { toolbar } = this.state
    const { editorState } = this.props.state

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

      const { editorState } = this.props.state

      this.onStateChange(
        // eslint-disable-next-line prefer-reflect
        editorState
          .transform()
          .toggleMark(type)
          .apply()
      )
    }

    const { editorState } = this.props.state
    const isActive = editorState && editorState.marks.some((mark) => mark.type === type)

    return (
      <IconButton onMouseDown={onClick} iconStyle={isActive ? { color: '#007EC1' } : {}}>
        {icon}
      </IconButton>
    )
  }

  render() {
    const { focused, readOnly, state: { editorState } } = this.props
    const isOpened = editorState.isExpanded && editorState.isFocused

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
          renderMark={renderMark}
          placeholder="Write something..."
          onChange={this.onStateChange}
          onKeyDown={this.onKeyDown}
          state={editorState}
        />
        <BottomToolbar open={focused}>
          Hier könnte Ihre Werbung stehen!
        </BottomToolbar>
      </div>
    )
  }
}

Slate.propTypes = {
  state: PropTypes.shape({
    editorState: PropTypes.object
  }),
  focused: PropTypes.bool.isRequired,
  readOnly: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  undo: PropTypes.func.isRequired,
  redo: PropTypes.func.isRequired
}

const mapStateToProps = null

const mapDispatchToProps = { undo, redo }

export default connect(mapStateToProps, mapDispatchToProps)(cssModules(Slate, styles))
