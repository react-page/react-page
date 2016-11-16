// @flow
// TODO lint: prefer-reflect doesn't work with slate state #158
/* eslint no-duplicate-imports: ["off"] */
/* eslint prefer-reflect: ["off"] */
/* eslint-disable no-alert, prefer-reflect, no-underscore-dangle */
import Subject from 'material-ui/svg-icons/action/subject'
import { compose, flatten, map, mergeAll, prop, pathOr } from 'ramda'
import React, { SyntheticEvent, Component } from 'react'
import { ActionTypes } from 'redux-undo'

import AlignmentPlugin from './plugins/alignment'
import BlockquotePlugin from './plugins/blockquote'
import CodePlugin from './plugins/code'
import EmphasizePlugin from './plugins/emphasize'
import HeadingsPlugin from './plugins/headings'
import KatexPlugin from './plugins/katex'
import LinkPlugin from './plugins/link'
import ListsPlugin from './plugins/lists'
import ParagraphPlugin, { P } from './plugins/paragraph'
import Plugin from './plugins/Plugin'

import * as hooks from './hooks'

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import cssModules from 'react-css-modules'
import Portal from 'react-portal'
import position from 'selection-position'
import { Editor } from 'slate'

const createNodes = compose(mergeAll, map(prop('nodes')))
const createMarks = compose(mergeAll, map(prop('marks')))
const createPlugins = compose(flatten, map(prop('plugins')))

import BottomToolbar from 'src/editor/components/BottomToolbar'
import { ContentPluginProps } from 'src/editor/service/plugin/classes'
import styles from './index.scoped.css'

const onBlur = (_event, _data, state) => state

export type Props = ContentPluginProps<{ editorState: Object }>

export default function (plugins?: Plugin[], defaultNode: string = P) {
  class Slate extends Component {
    constructor(props: Props) {
      super(props)

      const p = plugins | [
        new ParagraphPlugin(),
        new EmphasizePlugin(),
        new HeadingsPlugin({ DEFAULT_NODE: defaultNode }),
        new LinkPlugin(),
        new CodePlugin({ DEFAULT_NODE: defaultNode }),
        new ListsPlugin({ DEFAULT_NODE: defaultNode }),
        new BlockquotePlugin({ DEFAULT_NODE: defaultNode }),
        new AlignmentPlugin(),
        new KatexPlugin({ DEFAULT_NODE: defaultNode })
      ]

      this.schema = {
        nodes: createNodes(plugins),
        marks: createMarks(plugins)
      }

      this.DEFAULT_NODE = defaultNode
      this.plugins = createPlugins(p)
    }

    componentDidMount = () => {
      this.selection = window.getSelection()
      this.updateToolbar()
    }

    shouldComponentUpdate = (nextProps) => (
      nextProps.state.editorState !== this.props.state.editorState
      || nextProps.state.toolbar !== this.props.state.toolbar
      || nextProps.focused !== this.props.focused
      || nextProps.readOnly !== this.props.readOnly
    )

    componentDidUpdate = () => this.updateToolbar()

    // DEFAULT_NODE: string
    props: ContentPluginProps<{ editorState: Object }>
    plugins: []

    onStateChange = (editorState) => {
      this.props.onChange({ editorState })
    }

    onKeyDown = (e: Event, data: { key: string, isMod: bool, isShift: bool }, state: any) => {
      // we need to prevent slate from handling undo and redo
      if (data.isMod && (data.key === 'z' || data.key === 'y')) {
        return state
      }

      if (data.isShift && data.key === 'enter') {
        return state.transform().insertText('\n').apply()
      }

      const plugins = this.plugins

      for (let i = 0; i < plugins.length; i++) {
        const { onKeyDown } = plugins[i]
        const newState = onKeyDown && onKeyDown(e, data, state)

        if (newState) {
          return newState
        }
      }
    }

    handleOpen = (portal) => {
      this.props.onChange({ toolbar: portal.firstChild })
    }

    HoverButtons = ({ editorState, onChange }: Props) => (
      <div>
        {this.plugins.map((plugin: Plugin, i: number) => (
          plugin.hoverButtons.map((Button: Component<*, *, *>, j: number) => (
            <Button
              key={`${i}-${j}`}
              editorState={editorState}
              onChange={onChange}
            />
          ))
        ))}
      </div>
    )

    ToolbarButtons = ({ editorState, onChange }: Props) => (
      <div>
        {this.plugins.map((plugin: Plugin, i: number) => (
          plugin.toolbarButtons.map((Button: Component<*, *, *>, j: number) => (
            <Button
              key={`${i}-${j}`}
              editorState={editorState}
              onChange={onChange}
            />
          ))
        ))}
      </div>
    )

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

    render() {
      const {
        focused,
        readOnly,
        state: { editorState },
      } = this.props
      const isOpened = editorState.isExpanded && editorState.isFocused
      const HoverButtons = this.HoverButtons
      const ToolbarButtons = this.ToolbarButtons
      const plugins = this.plugins
      const schema = this.schema

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
            onKeyDown={this.onKeyDown}
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

  Slate.config = {
    name: 'ory/editor/core/content/slate',
    version: '0.0.1',
    icon: <Subject />,
    text: 'Text',
    allowInline: true,
    onFocus: (props: Props, source: string) => {
      if (source === 'onMouseDown') {
        return
      } else if (props.state.editorState.isFocused) {
        return
      }

      setTimeout(() => {
        props.onChange({
          editorState: props.state.editorState
            .transform()
            .focus()
            .apply()
        })
      }, 0)
    },

    onBlur: (props: Props) => {
      if (!props.state.editorState.isFocused) {
        return
      }

      props.onChange({
        editorState: props.state.editorState
          .transform()
          .blur()
          .apply()
      })
    },

    reducer: (state: any, action: any) => {
      if ((action.type === ActionTypes.UNDO || action.type === ActionTypes.REDO) && pathOr(false, ['content', 'state', 'editorState'], state)) {
        return ({
          ...state,
          content: {
            ...state.content,
            state: {
              ...state.content.state,
              editorState: state.content.state.editorState.merge({ isNative: false })
            }
          }
        })
      }
      return state
    },

    handleRemoveHotKey: hooks.handleRemoveHotKey,
    handleFocusPreviousHotKey: hooks.handleFocusPreviousHotKey,
    handleFocusNextHotKey: hooks.handleFocusNextHotKey,

    createInitialState: hooks.createInitialState,
    serialize: hooks.serialize,
    unserialize: hooks.unserialize,

    // TODO this is disabled because of #207
    // merge = hooks.merge
    // split = hooks.split
  }

  return cssModules(Slate, styles)
}
