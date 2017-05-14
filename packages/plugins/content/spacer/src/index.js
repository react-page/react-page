// @flow
import React from 'react'
import Component from './Component'
import AspectRatio from 'material-ui/svg-icons/action/aspect-ratio'

export default {
  Component,
  name: 'ory/editor/core/content/spacer',
  version: '0.0.1',
  IconComponent: <AspectRatio />,
  text: 'Spacer',
  description: 'Resizeable, empty space.',

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
