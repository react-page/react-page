// @flow
import React from 'react'
import Icon from 'material-ui/svg-icons/av/play-arrow'
import { ContentPluginProps } from 'ory-editor-core/lib/service/plugin/classes'
import Component from './Component'

export type Props = ContentPluginProps<*>

const rejectPromise = (e: Event, props: Props): Promise<*> => Promise.reject()

export default {
  Component,
  name: 'ory/sites/plugin/content/html5-video',
  version: '0.0.1',
  text: 'HTML 5 Video',
  description: 'Add webm, ogg and other HTML5 video',
  IconComponent: <Icon />,
  handleFocusNextHotKey: rejectPromise,
  handleFocusPreviousHotKey: rejectPromise
}
