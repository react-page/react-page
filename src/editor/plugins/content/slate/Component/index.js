/* eslint-disable no-alert, prefer-reflect, no-underscore-dangle */
import IconButton from 'material-ui/IconButton'
import CodeIcon from 'material-ui/svg-icons/action/code'
import LinkIcon from 'material-ui/svg-icons/content/link'
import BlockquoteIcon from 'material-ui/svg-icons/editor/format-quote'
import AlignLeftIcon from 'material-ui/svg-icons/editor/format-align-left'
import AlignCenterIcon from 'material-ui/svg-icons/editor/format-align-center'
import AlignRightIcon from 'material-ui/svg-icons/editor/format-align-right'
import AlignJustifyIcon from 'material-ui/svg-icons/editor/format-align-justify'
import KatexIcon from 'material-ui/svg-icons/editor/functions'

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

import styles from './index.scoped.css'

const onBlur = (_event, _data, state) => state

// Nodes
const A = 'link'

const BLOCKQUOTE = 'blockquote'
const KATEX = 'KATEX'

// const plugins = [
//   createListPlugin({
//     typeUL: UL,
//     typeOL: OL,
//     typeItem: LI,
//     typeDefault: DEFAULT_NODE
//   }),
//   createBlockquotePlugin({
//     type: BLOCKQUOTE,
//     typeDefault: DEFAULT_NODE
//   })
// ]

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

    // const schema = {
    //   nodes: {
    //     [UL]: makeTagNode('ul'),
    //     [OL]: makeTagNode('ol'),
    //     [LI]: makeTagNode('li'),
    //     [BLOCKQUOTE]: makeTagNode('blockquote'),
    //     [A]: nodes.Link,
    //     [KATEX]: nodes.Katex
    //   }
    // }

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
            {/*
            {this.renderListNodeButton(UL, <ListIcon />)}
            {this.renderListNodeButton(OL, <OrderedListIcon />)}
            {this.renderLinkButton()}
            {this.renderKatexButton()}
            {this.renderBlockquoteNodeButton(<BlockquoteIcon />)}
            {this.renderAlignmentButton('center', <AlignCenterIcon />)}
            {this.renderAlignmentButton('left', <AlignLeftIcon />)}
            {this.renderAlignmentButton('right', <AlignRightIcon />)}
            {this.renderAlignmentButton('justify', <AlignJustifyIcon />)} */}
          </BottomToolbar>
        )}
      </div>
    )
  }
}

export default cssModules(Slate, styles)
