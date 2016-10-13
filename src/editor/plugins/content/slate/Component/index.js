/* eslint-disable no-alert, prefer-reflect */
import IconButton from 'material-ui/IconButton'
import CodeIcon from 'material-ui/svg-icons/action/code'
import ListIcon from 'material-ui/svg-icons/action/list'
import LinkIcon from 'material-ui/svg-icons/content/link'
import BoldIcon from 'material-ui/svg-icons/editor/format-bold'
import ItalicIcon from 'material-ui/svg-icons/editor/format-italic'
import OrderedListIcon from 'material-ui/svg-icons/editor/format-list-numbered'
import UnderlinedIcon from 'material-ui/svg-icons/editor/format-underlined'
import BlockquoteIcon from 'material-ui/svg-icons/editor/format-quote'
import H1Icon from 'material-ui/svg-icons/image/filter-1'
import H2Icon from 'material-ui/svg-icons/image/filter-2'
import H3Icon from 'material-ui/svg-icons/image/filter-3'
import H4Icon from 'material-ui/svg-icons/image/filter-4'
import H5Icon from 'material-ui/svg-icons/image/filter-5'
import H6Icon from 'material-ui/svg-icons/image/filter-6'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import React, { Component } from 'react'
import cssModules from 'react-css-modules'
import Portal from 'react-portal'
import position from 'selection-position'
import { Editor } from 'slate'
import createBlockquotePlugin from 'slate-edit-blockquote'
import createListPlugin from 'slate-edit-list'

import BottomToolbar from 'src/editor/components/BottomToolbar'
import { ContentPluginProps } from 'src/editor/service/plugin/classes'
import nodes from './nodes'
import styles from './index.scoped.css'

const onBlur = (_event, _data, state) => state

const Link = ({ attributes, children, node }) => {
  const { data } = node
  const href = data.get('href')

  return <a {...attributes} href={href}>{children}</a>
}

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
const A = 'link'
const UL = 'unordered-list'
const OL = 'ordered-list'
const LI = 'list-item'
const BLOCKQUOTE = 'blockquote'
const DEFAULT_NODE = P

// Marks
const STRONG = 'STRONG'
const EM = 'EM'
const U = 'U'

const plugins = [
  createListPlugin({
    typeUL: UL,
    typeOL: OL,
    typeItem: LI,
    typeDefault: DEFAULT_NODE
  }),
  createBlockquotePlugin({
    type: BLOCKQUOTE,
    typeDefault: DEFAULT_NODE
  })
]


const schema = {
  nodes: {
    [H1]: makeTagNode('h1'),
    [H2]: makeTagNode('h2'),
    [H3]: makeTagNode('h3'),
    [H4]: makeTagNode('h4'),
    [H5]: makeTagNode('h5'),
    [H6]: makeTagNode('h6'),
    [UL]: makeTagNode('ul'),
    [OL]: makeTagNode('ol'),
    [LI]: makeTagNode('li'),
    [BLOCKQUOTE]: makeTagNode('blockquote'),
    [CODE]: nodes.CodeNode,
    [P]: nodes.Paragraph,
    [A]: Link
  },
  marks: {
    [STRONG]: makeTagMark('strong'),
    [EM]: makeTagMark('em'),
    [U]: makeTagMark('u'),
    [CODE]: makeTagMark('code')
  }
}

export type Props = ContentPluginProps<{ editorState: Object }>

/* eslint no-invalid-this: "off" */
class Slate extends Component {
  componentDidMount = () => this.updateToolbar()

  shouldComponentUpdate = (nextProps) => (
    nextProps.state.editorState !== this.props.state.editorState
    || nextProps.state.toolbar !== this.props.state.toolbar
    || nextProps.focused !== this.props.focused
    || nextProps.readOnly !== this.props.readOnly
  )
  componentDidUpdate = () => this.updateToolbar()

  props: ContentPluginProps

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

  renderLinkButton = () => {
    const onClick = (e) => {
      e.preventDefault()
      const { editorState } = this.props.state
      const hasLinks = editorState.inlines.some((inline: any) => inline.type === A)

      let newState

      if (hasLinks) {
        newState = editorState
          .transform()
          .unwrapInline(A)
          .apply()
      } else if (editorState.isExpanded) {
        const href = window.prompt('Enter the URL of the link:')
        newState = editorState
          .transform()
          .wrapInline({
            type: A,
            data: { href }
          })
          .collapseToEnd()
          .apply()
      } else {
        const href = window.prompt('Enter the URL of the link:')
        const text = window.prompt('Enter the text for the link:')
        newState = editorState
          .transform()
          .insertText(text)
          .extendBackward(text.length)
          .wrapInline({
            type: A,
            data: { href }
          })
          .collapseToEnd()
          .apply()
      }

      this.onStateChange(newState)
    }

    const { editorState } = this.props.state
    const hasLinks = editorState.inlines.some((inline: any) => inline.type === A)

    return (
      <IconButton onMouseDown={onClick} iconStyle={hasLinks ? { color: '#007EC1' } : {}}>
        <LinkIcon />
      </IconButton>
    )
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

  renderListNodeButton = (type, icon) => {
    const onClick = (e) => {
      e.preventDefault()

      const { editorState } = this.props.state

      const isList = editorState.blocks.some((block) => block.type === LI)
      const isType = editorState.blocks.some((block) => (
        Boolean(editorState.document.getClosest(block, (parent) => parent.type === type))
      ))

      let transform = editorState.transform()

      if (isList && isType) {
        transform = transform
          .setBlock(DEFAULT_NODE)
          .unwrapBlock(UL)
          .unwrapBlock(OL)
      } else if (isList) {
        transform = transform
          .unwrapBlock(type === UL ? OL : UL)
          .wrapBlock(type)
      } else {
        transform = transform
          .setBlock(LI)
          .wrapBlock(type)
      }

      this.onStateChange(transform.apply())
    }

    const { editorState } = this.props.state
    const isList = editorState.blocks.some((block) => block.type === LI)
    const isType = editorState.blocks.some((block) => (
      Boolean(editorState.document.getClosest(block, (parent) => parent.type === type))
    ))

    return (
      <IconButton onClick={onClick} iconStyle={(isList && isType) ? { color: '#007EC1' } : {}}>
        {icon}
      </IconButton>
    )
  }

  renderBlockquoteNodeButton = (icon) => {
    const onClick = (e) => {
      e.preventDefault()

      const { editorState } = this.props.state
      const isActive = editorState.blocks.some((block) => (
        Boolean(editorState.document.getClosest(block, (parent) => parent.type === BLOCKQUOTE))
      ))

      let transform = editorState.transform()

      if (isActive) {
        transform = transform.unwrapBlock(BLOCKQUOTE)
      } else {
        transform = transform.wrapBlock(BLOCKQUOTE)
      }

      this.onStateChange(transform.apply())
    }

    const { editorState } = this.props.state
    const isActive = editorState.blocks.some((block) => (
      Boolean(editorState.document.getClosest(block, (parent) => parent.type === BLOCKQUOTE))
    ))

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
            {/* TODO editor-container is needed to avoid global blurry, #190 */}
            <div styleName="toolbar" className="editor-container" style={{ padding: 0 }}>
              {this.renderMarkButton(STRONG, <BoldIcon />)}
              {this.renderMarkButton(EM, <ItalicIcon />)}
              {this.renderMarkButton(U, <UnderlinedIcon />)}
              {this.renderMarkButton(CODE, <CodeIcon />)}
            </div>
          </MuiThemeProvider>
        </Portal>
        <Editor
          onChange={this.onStateChange}
          onKeyDown={this.onKeyDown}
          readOnly={Boolean(readOnly)}
          onBlur={onBlur}
          schema={schema}
          state={editorState}
          plugins={plugins}
        />
        {readOnly ? null : (
          <BottomToolbar open={focused}>
            {this.renderNodeButton(H1, <H1Icon />)}
            {this.renderNodeButton(H2, <H2Icon />)}
            {this.renderNodeButton(H3, <H3Icon />)}
            {this.renderNodeButton(H4, <H4Icon />)}
            {this.renderNodeButton(H5, <H5Icon />)}
            {this.renderNodeButton(H6, <H6Icon />)}
            {this.renderNodeButton(CODE, <CodeIcon />)}
            {this.renderListNodeButton(UL, <ListIcon />)}
            {this.renderListNodeButton(OL, <OrderedListIcon />)}
            {this.renderLinkButton()}
            {this.renderBlockquoteNodeButton(<BlockquoteIcon />)}
          </BottomToolbar>
        )}
      </div>
    )
  }
}

export default cssModules(Slate, styles)
