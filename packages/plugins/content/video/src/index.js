// @flow
/* eslint-disable no-duplicate-imports */
import React from 'react'
import Component from './Component'
import PlayArrow from 'material-ui/svg-icons/av/play-arrow'
import type { ContentPluginProps } from 'ory-editor-core/lib/service/plugin/classes'

export default {
  Component,
  name: 'ory/editor/core/content/video',
  version: '0.0.1',
  IconComponent: <PlayArrow />,
  text: 'Video',
  description: 'Include videos from Vimeo or YouTube.',
  isInlineable: true,

  handleRemoveHotKey: (_: Event, __: ContentPluginProps<*>): Promise<*> =>
    Promise.reject(),
  handleFocusPreviousHotKey: (
    _: Event,
    __: ContentPluginProps<*>
  ): Promise<*> => Promise.reject(),
  handleFocusNextHotKey: (_: Event, __: ContentPluginProps<*>): Promise<*> =>
    Promise.reject(),

  // We need this because otherwise we lose hotkey focus on elements like spoilers.
  // This could probably be solved in an easier way by listening to window.document?
  //
  handleFocus: (props: any, source: any, ref: HTMLElement) => {
    if (!ref) {
      return
    }
    setTimeout(() => ref.focus())
  }
}
