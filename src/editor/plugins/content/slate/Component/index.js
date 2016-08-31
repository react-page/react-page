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

const H1 = ({ attributes, children }) => <h1 {...attributes}>{children}</h1>
const H2 = ({ attributes, children }) => <h2 {...attributes}>{children}</h2>
const H3 = ({ attributes, children }) => <h3 {...attributes}>{children}</h3>
const H4 = ({ attributes, children }) => <h4 {...attributes}>{children}</h4>
const H5 = ({ attributes, children }) => <h5 {...attributes}>{children}</h5>
const H6 = ({ attributes, children }) => <h6 {...attributes}>{children}</h6>

const Bold = ({ attributes, children }) => <strong {...attributes}>{children}</strong>
const Italic = ({ attributes, children }) => <em {...attributes}>{children}</em>
const Underlined = ({ attributes, children }) => <u {...attributes}>{children}</u>

const DEFAULT_NODE = 'paragraph'

const schema = {
  nodes: {
    'heading-one': H1,
    'heading-two': H2,
    'heading-three': H3,
    'heading-four': H4,
    'heading-five': H5,
    'heading-six': H6,
    code: nodes.CodeNode,
    paragraph: nodes.Paragraph
  },
  marks: {
    bold: Bold,
    italic: Italic,
    underlined: Underlined
  }
}

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
        mark = 'bold'
        break
      case 'i':
        mark = 'italic'
        break
      case 'u':
        mark = 'underlined'
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
      <IconButton onMouseDown={onClick} iconStyle={isActive ? { color: '#007EC1' } : {}}>
        {icon}
      </IconButton>
    )
  }

  renderNodeButton = (type, icon) => {
    const onClick = (e) => {
      e.preventDefault()

      // let { state } = this.state
      // let transform = state.transform()
      // const { document } = state

      // Handle everything but list buttons.
      // if (type != 'bulleted-list' && type != 'numbered-list') {
      //   const isActive = this.hasBlock(type)
      //   const isList = this.hasBlock('list-item')
      //
      //   if (isList) {
      //     transform = transform
      //       .setBlock(isActive ? DEFAULT_NODE : type)
      //       .unwrapBlock('bulleted-list')
      //       .unwrapBlock('numbered-list')
      //   }
      //
      //   else {
      //     transform = transform
      //       .setBlock(isActive ? DEFAULT_NODE : type)
      //   }
      // }

      // Handle the extra wrapping required for list buttons.
      // else {
      //   const isList = this.hasBlock('list-item')
      //   const isType = state.blocks.some((block) => {
      //     return !!document.getClosest(block, parent => parent.type == type)
      //   })
      //
      //   if (isList && isType) {
      //     transform = transform
      //       .setBlock(DEFAULT_NODE)
      //       .unwrapBlock('bulleted-list')
      //       .unwrapBlock('numbered-list')
      //   } else if (isList) {
      //     transform = transform
      //       .unwrapBlock(type == 'bulleted-list' ? 'numbered-list' : 'bulleted-list')
      //       .wrapBlock(type)
      //   } else {
      //     transform = transform
      //       .setBlock('list-item')
      //       .wrapBlock(type)
      //   }
      // }

      // state = transform.apply()
      // this.setState({ state })

      const { editorState } = this.props.state
      const isActive = editorState.blocks.some((block) => block.type === type)

      this.onStateChange(
        // eslint-disable-next-line prefer-reflect
        editorState
          .transform()
          .setBlock(isActive ? DEFAULT_NODE : type)
          .apply()
      )
    }

    const { editorState } = this.props.state
    const isActive = editorState.blocks.some((block) => block.type === type)

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
              {this.renderMarkButton('underlined', <UnderlinedIcon />)}
            </div>
          </MuiThemeProvider>
        </Portal>
        <Editor
          onChange={this.onStateChange}
          onKeyDown={this.onKeyDown}
          placeholder="Write something..."
          readOnly={Boolean(readOnly)}
          schema={schema}
          state={editorState}
        />
        <BottomToolbar open={focused}>
          {this.renderNodeButton('heading-one', <H1Icon />)}
          {this.renderNodeButton('heading-two', <H2Icon />)}
          {this.renderNodeButton('heading-three', <H3Icon />)}
          {this.renderNodeButton('heading-four', <H4Icon />)}
          {this.renderNodeButton('heading-five', <H5Icon />)}
          {this.renderNodeButton('heading-six', <H6Icon />)}
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
