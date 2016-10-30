// @flow
/* eslint-disable no-duplicate-imports */
import React from 'react'
import Component from './Component'
import PlayArrow from 'material-ui/svg-icons/av/play-arrow'
import { ContentPlugin } from 'src/editor/service/plugin/classes'
import type { ContentPluginProps } from 'src/editor/service/plugin/classes'

export default class VideoPlugin extends ContentPlugin {
  Component = Component
  name = 'ory/editor/core/content/video'
  version = '0.0.1'
  icon = <PlayArrow />
  text = 'Video'
  inlineable = true
  handleRemoveHotKey = (_: Event, __: ContentPluginProps<*>): Promise<*> => Promise.reject()
}
