/*
 * This file is part of ORY Editor.
 *
 * ORY Editor is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * ORY Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with ORY Editor.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @license LGPL-3.0
 * @copyright 2016-2018 Aeneas Rekkas
 * @author Aeneas Rekkas <aeneas+oss@aeneas.io>
 *
 */

// @flow
/* eslint-disable no-duplicate-imports */
import React from 'react'
import Component from './Component'
import type { ContentPluginProps } from 'ory-editor-core/lib/service/plugin/classes'
import { ControlsProps } from './Controls'
import ImageControls from './Controls'

export type ImagePluginSettings = {
  imageUpload: Promise<Object>,
  controls: (props: ControlsProps) => any,
  renderer: (props: ControlsProps) => any,
  icon: any
}

const imagePlugin = (settings?: ImagePluginSettings) => {
  if (!settings) {
    settings = {}
  }
  settings.controlsWrapped = (props: Object) => <ImageControls {...props} {...settings} />
  return {
    name: 'ory/editor/core/content/image',
    version: '0.0.1',
    text: 'Image',
    isInlineable: true,
    description: 'Loads an image from an url.',
    Component: (props: Object) => <Component {...props} {...settings} />,
    IconComponent: settings.icon,
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

    handleFocus: (props: any, source: any, ref: HTMLElement) => {
      if (!ref) {
        return
      }
      setTimeout(() => ref.focus())
    }
  }
}
const image = imagePlugin()
export default image

export { imagePlugin }
