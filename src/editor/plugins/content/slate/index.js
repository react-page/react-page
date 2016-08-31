// @flow
import Subject from 'material-ui/svg-icons/action/subject'
import React from 'react'
import { ContentPlugin } from 'src/editor/service/plugin/classes'
import Component from './Component'
import * as hooks from './hooks'

export default class SlatePlugin extends ContentPlugin {
  Component = Component
  name = 'ory/content/slate'
  version = '0.0.1'
  icon = <Subject />
  text = 'Text (Slate)'

  onFocus = (props) => {
    if (props.state.editorState.isFocused) {
      console.log('is already focused')
      return
    }

    console.log('is not yet focused, focusing', props.state.editorState)

    props.onChange({
      editorState: props.state.editorState
        .transform()
        .focus()
        .apply()
    })
  }

  onBlur = (props) => {
    if (!props.state.editorState.isFocused) {
      console.log('is already blurred')
      return
    }

    console.log('is not yet blurred, blurring', props.state.editorState)

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
