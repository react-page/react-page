// @flow
import Subject from 'material-ui/svg-icons/action/subject'
import React from 'react'
import { ContentPlugin } from 'src/editor/service/plugin/classes'

/* eslint no-duplicate-imports: ["off"] */
import Component from './Component'
import type { Props } from './Component'
/* eslint no-duplicate-imports: ["error"] */

import * as hooks from './hooks'

export default class SlatePlugin extends ContentPlugin {
  Component = Component
  name = 'ory/content/slate'
  version = '0.0.1'
  icon = <Subject />
  text = 'Text (Slate)'

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

  onRemoveHotKey = hooks.onRemoveHotKey

  createInitialState = hooks.createInitialState
  serialize = hooks.serialize
  unserialize = hooks.unserialize
  merge = hooks.merge
  split = hooks.split
}
