// @flow
// TODO lint: prefer-reflect doesn't work with slate state #158
/* eslint no-duplicate-imports: ["off"] */
/* eslint prefer-reflect: ["off"] */
import Subject from 'material-ui/svg-icons/action/subject'
import { compose, flatten, map, mergeAll, prop } from 'ramda'
import React from 'react'

import { ContentPlugin } from 'src/editor/service/plugin/classes'
import Component from './Component'
import type { Props } from './Component'

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

const createNodes = compose(mergeAll, map(prop('nodes')))
const createMarks = compose(mergeAll, map(prop('marks')))
const createPlugins = compose(flatten, map(prop('plugins')))

export default class SlatePlugin extends ContentPlugin {
  constructor(plugins?: Plugin[] = []) {
    super(plugins)

    this.DEFAULT_NODE = P

    this.plugins = plugins || [
      new ParagraphPlugin(),
      new EmphasizePlugin(),
      new HeadingsPlugin({ DEFAULT_NODE: this.DEFAULT_NODE }),
      new LinkPlugin(),
      new CodePlugin({ DEFAULT_NODE: this.DEFAULT_NODE }),
      new ListsPlugin({ DEFAULT_NODE: this.DEFAULT_NODE }),
      new BlockquotePlugin({ DEFAULT_NODE: this.DEFAULT_NODE }),
      new AlignmentPlugin(),
      new KatexPlugin({ DEFAULT_NODE: this.DEFAULT_NODE })
    ]

    this.props = {}

    this.props.schema = {
      nodes: createNodes(this.plugins),
      marks: createMarks(this.plugins)
    }

    this.props.plugins = createPlugins(this.plugins)

    this.props.onKeyDown = (e: Event, data: { key: string, isMod: bool, isShift: bool }, state: any) => {
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

    const HoverButtons = ({ editorState, onChange }: Props) => (
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
    this.props.HoverButtons = HoverButtons

    const ToolbarButtons = ({ editorState, onChange }: Props) => (
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
    this.props.ToolbarButtons = ToolbarButtons

    const Inner = (props: Props) => <Component {...props} {...this.props} />
    this.Component = Inner
  }

  props = {}
  plugins = []
  DEFAULT_NODE = P

  name = 'ory/editor/core/content/slate'
  version = '0.0.1'
  icon = <Subject />
  text = 'Text'

  allowInline = true

  onFocus = (props: Props) => {
    if (props.state.editorState.isFocused) {
      return
    }
  }

  onBlur = (props: Props) => {
    if (!props.state.editorState.isFocused) {
      return
    }

    props.onChange({
      editorState: props.state.editorState
        .transform()
        .blur()
        .apply()
    })
  }

  handleRemoveHotKey = hooks.handleRemoveHotKey
  handleFocusPreviousHotKey = hooks.handleFocusPreviousHotKey
  handleFocusNextHotKey = hooks.handleFocusNextHotKey

  createInitialState = hooks.createInitialState
  serialize = hooks.serialize
  unserialize = hooks.unserialize

  // TODO this is disabled because of #207
  // merge = hooks.merge
  // split = hooks.split
}
