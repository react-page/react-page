// @flow
// TODO lint: prefer-reflect doesn't work with slate state #158
/* eslint no-duplicate-imports: ["off"] */
/* eslint prefer-reflect: ["off"] */
import Subject from 'material-ui/svg-icons/action/subject'
import React from 'react'
import { ContentPlugin } from 'src/editor/service/plugin/classes'
import Component from './Component'
import type { Props } from './Component'

import * as EmphasizePlugin from './plugins/emphasize'

import * as hooks from './hooks'

export default class SlatePlugin extends ContentPlugin {
  constructor(plugins) {
    super(plugins)

    this.plugins = plugins || [
      EmphasizePlugin
    ]
  }

  Component = (props) => <Component slatePlugins={this.plugins} {...props} />
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
