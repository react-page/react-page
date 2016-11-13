// @flow
/* eslint-disable no-duplicate-imports */
import React from 'react'
import Component from './Component'
import Panorama from 'material-ui/svg-icons/image/panorama'
import { ContentPlugin } from 'src/editor/service/plugin/classes'
import type { ContentPluginProps } from 'src/editor/service/plugin/classes'

export default class ImagePlugin extends ContentPlugin {
  Component = Component
  name = 'ory/editor/core/content/image'
  version = '0.0.1'
  icon = <Panorama />
  text = 'Image'
  inlineable = true
  handleRemoveHotKey = (_: Event, __: ContentPluginProps<*>): Promise<*> => Promise.reject()

  // We need this because otherwise we lose hotkey focus on elements like spoilers.
  // This could probably be solved in an easier way by listening to window.document?
  //
  onFocus = (props: any, source: any, ref: HTMLElement) => {
    if (!ref) {
      return
    }
    setTimeout(() => ref.focus())
  }
}
