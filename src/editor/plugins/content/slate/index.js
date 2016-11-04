// @flow
// TODO lint: prefer-reflect doesn't work with slate state #158
/* eslint no-duplicate-imports: ["off"] */
/* eslint prefer-reflect: ["off"] */
import Subject from 'material-ui/svg-icons/action/subject'
import { compose, map, mergeAll, prop } from 'ramda'
import React from 'react'

import { ContentPlugin } from 'src/editor/service/plugin/classes'
import Component from './Component'
import type { Props } from './Component'

import EmphasizePlugin from './plugins/emphasize'

import * as hooks from './hooks'

const createNodes = compose(mergeAll, map(prop('nodes')))
const createMarks = compose(mergeAll, map(prop('marks')))

export default class SlatePlugin extends ContentPlugin {
  constructor(plugins) {
    super(plugins)

    this.plugins = plugins || [
      new EmphasizePlugin()
    ]

    this.props = {}

    this.props.schema = {
      nodes: createNodes(this.plugins),
      marks: createMarks(this.plugins)
    }

    this.props.onKeyDown = (e: Event, data: { key: string, isMod: bool, isShift: bool }, state) => {
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

    this.props.HoverButtons = ({ editorState, onChange }) => (
      <div>
        {this.plugins.map((plugin, i) => (
          plugin.hoverButtons.map((Button, j) => (
            <Button key={`${i}-${j}`} editorState={editorState} onChange={onChange} />
          ))
        ))}
      </div>
    )
  }

  Component = (props) => <Component {...props} {...this.props} />
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
