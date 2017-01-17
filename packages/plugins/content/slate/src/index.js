// @flow
// TODO lint: prefer-reflect doesn't work with slate state #158
/* eslint no-duplicate-imports: ["off"] */
/* eslint prefer-reflect: ["off"] */

import 'cheerio'

import Subject from 'material-ui/svg-icons/action/subject'
import { compose, flatten, map, mergeAll, prop, pathOr } from 'ramda'
import React from 'react'
import { ActionTypes } from 'redux-undo'

import Component from './Component'
import type { Props } from './Component'

import AlignmentPlugin from './plugins/alignment'
import BlockquotePlugin from './plugins/blockquote'
import CodePlugin from './plugins/code'
import EmphasizePlugin from './plugins/emphasize'
import HeadingsPlugin from './plugins/headings'
import LinkPlugin from './plugins/link'
import ListsPlugin from './plugins/lists'
import ParagraphPlugin, { P } from './plugins/paragraph'
import Plugin from './plugins/Plugin'
// import KatexPlugin from './plugins/katex'

import * as hooks from './hooks'

const createNodes = compose(mergeAll, map(prop('nodes')))
const createMarks = compose(mergeAll, map(prop('marks')))
const createPlugins = compose(flatten, map(prop('plugins')))
const DEFAULT_NODE = P

export const createInitialState = hooks.createInitialState

export default (plugins: Plugin[] = [
  new ParagraphPlugin(),
  new EmphasizePlugin(),
  new HeadingsPlugin({ DEFAULT_NODE }),
  new LinkPlugin(),
  new CodePlugin({ DEFAULT_NODE }),
  new ListsPlugin({ DEFAULT_NODE }),
  new BlockquotePlugin({ DEFAULT_NODE }),
  new AlignmentPlugin(),
  // new KatexPlugin({ DEFAULT_NODE })
]) => {
  const props = {}
  props.schema = {
    nodes: createNodes(plugins),
    marks: createMarks(plugins)
  }
  props.plugins = createPlugins(plugins)
  props.onKeyDown = (e: Event, data: { key: string, isMod: bool, isShift: bool }, state: any) => {
    // we need to prevent slate from handling undo and redo
    if (data.isMod && (data.key === 'z' || data.key === 'y')) {
      return state
    }

    if (data.isShift && data.key === 'enter') {
      return state.transform().insertText('\n').apply()
    }

    for (let i = 0; i < plugins.length; i++) {
      const { onKeyDown } = plugins[i]
      const newState = onKeyDown && onKeyDown(e, data, state)

      if (newState) {
        return newState
      }
    }

    return
  }

  const HoverButtons = ({ editorState, onChange, focus }: Props) => (
    <div>
      {plugins.map((plugin: Plugin, i: number) => (
        plugin.hoverButtons.map((Button: Component<*, *, *>, j: number) => (
          <Button
            key={`${i}-${j}`}
            editorState={editorState}
            onChange={onChange}
            focus={focus}
          />
        ))
      ))}
    </div>
  )
  props.HoverButtons = HoverButtons

  const ToolbarButtons = ({ editorState, onChange, focus }: Props) => (
    <div>
      {plugins.map((plugin: Plugin, i: number) => (
        plugin.toolbarButtons.map((Button: Component<*, *, *>, j: number) => (
          <Button
            key={`${i}-${j}`}
            editorState={editorState}
            onChange={onChange}
            focus={focus}
          />
        ))
      ))}
    </div>
  )
  props.ToolbarButtons = ToolbarButtons

  const Slate = (cellProps: Props) => <Component {...cellProps} {...props} />
  return {
    Component: Slate,

    name: 'ory/editor/core/content/slate',
    version: '0.0.1',
    IconComponent: <Subject />,
    text: 'Text',

    allowInlineNeighbours: true,

    handleFocus: (props: Props, source: string) => {
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

    handleBlur: (props: Props) => {
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
              editorState: state.content.state.editorState.merge({ isNative: false }),

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
    unserialize: hooks.unserialize

    // TODO this is disabled because of #207
    // merge = hooks.merge
    // split = hooks.split
  }
}
