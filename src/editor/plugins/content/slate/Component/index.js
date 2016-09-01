/* eslint-disable prefer-reflect */
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
import UnderlinedIcon from 'material-ui/svg-icons/editor/format-underlined'
import H1Icon from 'material-ui/svg-icons/image/filter-1'
import H2Icon from 'material-ui/svg-icons/image/filter-2'
import H3Icon from 'material-ui/svg-icons/image/filter-3'
import H4Icon from 'material-ui/svg-icons/image/filter-4'
import H5Icon from 'material-ui/svg-icons/image/filter-5'
import H6Icon from 'material-ui/svg-icons/image/filter-6'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import BottomToolbar from 'src/editor/components/BottomToolbar'
import nodes from './nodes'
import styles from './index.scoped.css'

const makeTagNode = (Tag) => {
  const NodeComponent = ({ attributes, children }: { attributes: Object, children: any }) => (
    <Tag {...attributes}>{children}</Tag>
  )

  NodeComponent.displayName = `${Tag}-node`

  return NodeComponent
}

const makeTagMark = (Tag) => {
  const MarkComponent = ({ children }: { children: any }) => (
    <Tag>{children}</Tag>
  )

  MarkComponent.displayName = `${Tag}-mark`

  return MarkComponent
}

// Nodes
const H1 = 'heading-one'
const H2 = 'heading-two'
const H3 = 'heading-three'
const H4 = 'heading-four'
const H5 = 'heading-five'
const H6 = 'heading-six'
const CODE = 'code'
const P = 'paragraph'
const DEFAULT_NODE = P

// Marks
const STRONG = 'STRONG'
const EM = 'EM'
const U = 'U'


const schema = {
  nodes: {
    [H1]: makeTagNode('h1'),
    [H2]: makeTagNode('h2'),
    [H3]: makeTagNode('h3'),
    [H4]: makeTagNode('h4'),
    [H5]: makeTagNode('h5'),
    [H6]: makeTagNode('h6'),
    [CODE]: nodes.CodeNode,
    [P]: nodes.Paragraph
  },
  marks: {
    [STRONG]: makeTagMark('strong'),
    [EM]: makeTagMark('em'),
    [U]: makeTagMark('u')
  }
}

const falser = () => false

/* eslint no-invalid-this: "off" */
class Slate extends Component {
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

  onKeyDown = (e: Event, data: { key: string, isMod: bool, isShift: bool }, state) => {
    // we need to prevent slate from handling undo and redo
    if (data.isMod && (data.key === 'z' || data.key === 'y')) {
      return state
    }

    // TODO if empty and backspace, remove cell

    if (data.isShift && data.key === 'enter') {
      return state.transform().insertText('\n').apply()
    }

    if (!data.isMod) {
      return
    }

    e.preventDefault()

    let mark

    switch (data.key) {
      case 'b':
        mark = STRONG
        break
      case 'i':
        mark = EM
        break
      case 'u':
        mark = U
        break
      default:
        return
    }

    return state
      .transform()
      .toggleMark(mark)
      .apply()
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
        editorState
          .transform()
          .toggleMark(type)
          .apply()
      )
    }

    const { editorState } = this.props.state
    const isActive = editorState && editorState.marks.some((mark) => mark.type === type)

    return (
      <IconButton onClick={onClick} iconStyle={isActive ? { color: '#007EC1' } : {}}>
        {icon}
      </IconButton>
    )
  }

  renderNodeButton = (type, icon) => {
    const onClick = (e) => {
      e.preventDefault()

      const { editorState } = this.props.state
      const isActive = editorState.blocks.some((block) => block.type === type)

      this.onStateChange(
        editorState
          .transform()
          .setBlock(isActive ? DEFAULT_NODE : type)
          .apply()
      )
    }

    const { editorState } = this.props.state
    const isActive = editorState.blocks.some((block) => block.type === type)

    return (
      <IconButton onClick={onClick} iconStyle={isActive ? { color: '#007EC1' } : {}}>
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
              {this.renderMarkButton(STRONG, <BoldIcon />)}
              {this.renderMarkButton(EM, <ItalicIcon />)}
              {this.renderMarkButton(U, <UnderlinedIcon />)}
            </div>
          </MuiThemeProvider>
        </Portal>
        <Editor
          onChange={this.onStateChange}
          onKeyDown={this.onKeyDown}
          placeholder="Write something..."
          readOnly={Boolean(readOnly)}
          onFocus={() => false}
          onBlur={() => false}
          schema={schema}
          state={editorState}
        />
        <BottomToolbar open={focused}>
          {this.renderNodeButton(H1, <H1Icon />)}
          {this.renderNodeButton(H2, <H2Icon />)}
          {this.renderNodeButton(H3, <H3Icon />)}
          {this.renderNodeButton(H4, <H4Icon />)}
          {this.renderNodeButton(H5, <H5Icon />)}
          {this.renderNodeButton(H6, <H6Icon />)}
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
