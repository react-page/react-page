// @flow
import React from 'react'
import Component from './Component'
import Panorama from 'material-ui/svg-icons/toggle/star'
import { ContentPlugin } from 'src/editor/service/plugin/classes'

export default class FaIcon extends ContentPlugin {
  Component = Component
  name = 'oh'
  version = '0.0.1'
  icon = <Panorama />
  text = 'Icon'
  inlineable = true
  onRemoveHotKey = () => Promise.reject()
}
