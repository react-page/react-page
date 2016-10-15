// @flow
import React from 'react'
import Component from './Component'
import Panorama from 'material-ui/svg-icons/image/panorama'
import { ContentPlugin } from 'src/editor/service/plugin/classes'

export default class FaIcon extends ContentPlugin {
  Component = Component
  name = 'ory/content/fa-icon'
  version = '0.0.1'
  icon = <Panorama />
  text = 'Image'
  inlineable = true
  onRemoveHotKey = () => Promise.reject()
}
