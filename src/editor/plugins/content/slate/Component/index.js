/* eslint-disable no-alert, prefer-reflect, no-underscore-dangle */
import IconButton from 'material-ui/IconButton'
import CodeIcon from 'material-ui/svg-icons/action/code'
import ListIcon from 'material-ui/svg-icons/action/list'
import LinkIcon from 'material-ui/svg-icons/content/link'
import OrderedListIcon from 'material-ui/svg-icons/editor/format-list-numbered'
import BlockquoteIcon from 'material-ui/svg-icons/editor/format-quote'
import AlignLeftIcon from 'material-ui/svg-icons/editor/format-align-left'
import AlignCenterIcon from 'material-ui/svg-icons/editor/format-align-center'
import AlignRightIcon from 'material-ui/svg-icons/editor/format-align-right'
import AlignJustifyIcon from 'material-ui/svg-icons/editor/format-align-justify'
import KatexIcon from 'material-ui/svg-icons/editor/functions'
import H1Icon from 'material-ui/svg-icons/image/looks-one'
import H2Icon from 'material-ui/svg-icons/image/looks-two'
import H3Icon from 'material-ui/svg-icons/image/looks-3'
import H4Icon from 'material-ui/svg-icons/image/looks-4'
import H5Icon from 'material-ui/svg-icons/image/looks-5'
import H6Icon from 'material-ui/svg-icons/image/looks-6'
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

const makeTagNode = (Tag) => {
  const NodeComponent = ({ attributes, children, node }: { attributes: Object, children: any, node: any }) => {
    const align = node.data.get('align')
    return (
      <Tag {...attributes} style={{ textAlign: align }}>{children}</Tag>
    )
  }

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
const KATEX = 'KATEX'
const DEFAULT_NODE = P

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

export type Props = ContentPluginProps<{ editorState: Object }>

class Slate extends Component {
  componentDidMount = () => this.updateToolbar()

  // FIXME PSEUDO FIX #135
  componentWillReceiveProps = (next) => {
    // focus does not work, probably because dom blur and removeAllRanges is missing in slate.
    // What we do is create a ref (this.onRef) on a div that is wrapping slate. If selection is lost in slate state
    // we blur the contenteditable and remove all ranges.
    if (!next.state.editorState.selection.isFocused && this.props.state.editorState.selection.isFocused) {
      this._component.querySelector('[contenteditable]').blur()
      window.setTimeout(() => window.getSelection().removeAllRanges(), 0)
    }

    // This code would potentially focus the contenteditable, but it has issues the selection, because we are blurring
    // it in the code above and removing all ranges. This can lead to weird behaviour, which is why this is disabled.
    //
    //  if (next.state.editorState.selection.isFocused && !this.props.state.editorState.selection.isFocused) {
    //    this._component.querySelector('[contenteditable]').focus()
    //  }
  }

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

  onKeyDown = (e: Event, data: { key: string, isMod: bool, isShift: bool }, state) => {
    // we need to prevent slate from handling undo and redo
    if (data.isMod && (data.key === 'z' || data.key === 'y')) {
      return state
    }

    if (data.isShift && data.key === 'enter') {
      return state.transform().insertText('\n').apply()
    }

    const { slatePlugins } = this.props

    for (let i = 0; i < slatePlugins.length; i++) {
      const { onKeyDown } = slatePlugins[i]
      const newState = onKeyDown && onKeyDown(e, data, state)

      if (newState) {
        return newState
      }
    }
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
      <IconButton onMouseDown={onClick} iconStyle={hasLinks ? { color: 'rgb(0, 188, 212)' } : { color: 'white' }}>
        <LinkIcon />
      </IconButton>
    )
  }

  renderKatexButton = () => {
    const onClick = (e) => {
      e.preventDefault()
      const { editorState } = this.props.state
      const hasMath = editorState.blocks.some((block) => block.type === KATEX)

      let newState

      if (hasMath) {
        newState = editorState
          .transform()
          .setBlock(DEFAULT_NODE)
          .apply()
      } else {
        const src = window.prompt('Enter the src of the formula:')

        newState = editorState
          .transform()
          .splitBlock()
          .setBlock({
            type: KATEX,
            data: { src }
          })
          .apply()
      }

      this.onStateChange(newState)
    }

    const { editorState } = this.props.state
    const hasMath = editorState.blocks.some((block) => block.type === KATEX)

    return (
      <IconButton onMouseDown={onClick} iconStyle={hasMath ? { color: '#007EC1' } : { color: 'white' }}>
        <KatexIcon />
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
      <IconButton onClick={onClick} iconStyle={isActive ? { color: 'rgb(0, 188, 212)' } : { color: 'white' }}>
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
      <IconButton onClick={onClick} iconStyle={(isList && isType) ? { color: 'rgb(0, 188, 212)' } : { color: 'white' }}>
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
      <IconButton onClick={onClick} iconStyle={isActive ? { color: 'rgb(0, 188, 212)' } : { color: 'white' }}>
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
      <IconButton onClick={onClick} iconStyle={isActive ? { color: 'rgb(0, 188, 212)' } : { color: 'white' }}>
        {icon}
      </IconButton>
    )
  }

  renderAlignmentButton = (align, icon) => {
    const onClick = (e) => {
      e.preventDefault()

      const { editorState } = this.props.state
      const isActive = editorState.blocks.some((block) => block.data.get('align') === align)

      this.onStateChange(
        editorState
          .transform()
          .setBlock({ data: { align: isActive ? null : align } })
          .apply()
      )
    }

    const { editorState } = this.props.state
    const isActive = editorState.blocks.some((block) => block.data.get('align') === align)

    return (
      <IconButton onClick={onClick} iconStyle={isActive ? { color: 'rgb(0, 188, 212)' } : { color: 'white' }}>
        {icon}
      </IconButton>
    )
  }

  onRef = (c) => {
    this._component = c
  }

  render() {
    const { focused, readOnly, state: { editorState }, slatePlugins } = this.props
    const isOpened = editorState.isExpanded && editorState.isFocused

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
        [CODE]: nodes.Code,
        [P]: nodes.Paragraph,
        [A]: nodes.Link,
        [KATEX]: nodes.Katex
      },
      marks: {
        ...slatePlugins[0].marks,
        [CODE]: makeTagMark('code')
      }
    }

    return (
      <div>
        <Portal isOpened={isOpened} onOpen={this.handleOpen}>
          <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            {/* TODO editor-container is needed to avoid global blurry, #190 */}
            <div styleName="inline-toolbar" className="editor-container" style={{ padding: 0 }}>
              {slatePlugins.map(({ inlineButtons }, i) => (
                inlineButtons.map((Button, j) => (
                  <Button key={`${i}-${j}`} editorState={editorState} onChange={this.onStateChange} />
                ))
              ))}
              {this.renderMarkButton(CODE, <CodeIcon />)}
            </div>
          </MuiThemeProvider>
        </Portal>
        <div ref={this.onRef}>
          <Editor
            onChange={this.onStateChange}
            onKeyDown={this.onKeyDown}
            readOnly={Boolean(readOnly)}
            onBlur={onBlur}
            schema={schema}
            state={editorState}
            plugins={plugins}
          />
        </div>
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
            {this.renderKatexButton()}
            {this.renderBlockquoteNodeButton(<BlockquoteIcon />)}
            {this.renderAlignmentButton('center', <AlignCenterIcon />)}
            {this.renderAlignmentButton('left', <AlignLeftIcon />)}
            {this.renderAlignmentButton('right', <AlignRightIcon />)}
            {this.renderAlignmentButton('justify', <AlignJustifyIcon />)}
          </BottomToolbar>
        )}
      </div>
    )
  }
}

export default cssModules(Slate, styles)
