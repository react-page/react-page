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

  createInitialState = hooks.createInitialState
  serialize = hooks.serialize
  unserialize = hooks.unserialize
}
