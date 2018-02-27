/*
 * This file is part of ORY Editor.
 *
 * ORY Editor is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *  
 * ORY Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *  
 * You should have received a copy of the GNU Lesser General Public License
 * along with ORY Editor.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @license LGPL-3.0
 * @copyright 2016-2018 Aeneas Rekkas
 * @author Aeneas Rekkas <aeneas+oss@aeneas.io>
 *
 */

// @flow
// TODO lint: prefer-reflect doesn't work with slate state #158
/* eslint no-duplicate-imports: ["off"] */
/* eslint prefer-reflect: ["off"] */
import Subject from 'material-ui/svg-icons/action/subject'
import { compose, flatten, map, mergeAll, prop, pathOr } from 'ramda'
import { Html } from 'slate'
import React from 'react'
import { ActionTypes } from 'redux-undo'
import Component from './Component'
import type { Props } from './Component'
import Plugin from './plugins/Plugin'
// import KatexPlugin from './plugins/katex'
import * as hooks from './hooks'
import parse5 from 'parse5'

const createNodes = compose(mergeAll, map(prop('nodes')))
const createMarks = compose(mergeAll, map(prop('marks')))
const createPlugins = compose(flatten, map(prop('plugins')))

export const createInitialState = hooks.createInitialState

export const html = new Html({
  rules: [...hooks.defaultPlugins, hooks.lineBreakSerializer],
  parseHtml: parse5.parseFragment
})

export default (plugins: Plugin[] = hooks.defaultPlugins) => {
  const props = {}
  props.schema = {
    nodes: createNodes(plugins),
    marks: createMarks(plugins)
  }
  props.plugins = createPlugins(plugins)
  props.onKeyDown = (
    e: Event,
    data: { key: string, isMod: boolean, isShift: boolean },
    state: any
  ) => {
    // we need to prevent slate from handling undo and redo
    if (data.isMod && (data.key === 'z' || data.key === 'y')) {
      return state
    }

    if (data.isShift && data.key === 'enter') {
      return state
        .transform()
        .insertText('\n')
        .apply()
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
      {plugins.map((plugin: Plugin, i: number) =>
        plugin.hoverButtons.map((Button: any, j: number) => (
          <Button
            key={`${i}-${j}`}
            editorState={editorState}
            onChange={onChange}
            focus={focus}
          />
        ))
      )}
    </div>
  )
  props.HoverButtons = HoverButtons

  const ToolbarButtons = ({ editorState, onChange, focus }: Props) => (
    <div>
      {plugins.map((plugin: Plugin, i: number) =>
        plugin.toolbarButtons.map((Button: any, j: number) => (
          <Button
            key={`${i}-${j}`}
            editorState={editorState}
            onChange={onChange}
            focus={focus}
          />
        ))
      )}
    </div>
  )
  props.ToolbarButtons = ToolbarButtons

  const Slate = (cellProps: Props) => <Component {...cellProps} {...props} />
  const StaticComponent = ({ state: { editorState } = {} }: Props) => (
    <div dangerouslySetInnerHTML={{ __html: html.serialize(editorState) }} />
  )
  return {
    Component: Slate,
    StaticComponent,

    name: 'ory/editor/core/content/slate',
    version: '0.0.1',
    IconComponent: <Subject />,
    text: 'Text',
    description: 'An advanced rich text area.',

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
      if (
        (action.type === ActionTypes.UNDO ||
          action.type === ActionTypes.REDO) &&
        pathOr(false, ['content', 'state', 'editorState'], state)
      ) {
        return {
          ...state,
          content: {
            ...state.content,
            state: {
              ...state.content.state,
              editorState: state.content.state.editorState.merge({
                isNative: false
              })
            }
          }
        }
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
