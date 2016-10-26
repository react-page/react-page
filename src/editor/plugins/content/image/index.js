// @flow
import React from 'react'
import Component from './Component'
import Panorama from 'material-ui/svg-icons/image/panorama'
import { ContentPlugin, ContentPluginProps } from 'src/editor/service/plugin/classes'

export default class ImagePlugin extends ContentPlugin {
  Component = Component
  name = 'ory/editor/core/content/image'
  version = '0.0.1'
  icon = <Panorama />
  text = 'Image'
  inlineable = true
  onRemoveHotKey = (_: Event, __: ContentPluginProps<*>): Promise<*> => Promise.reject()
}
