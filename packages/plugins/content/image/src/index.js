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
import Panorama from '@material-ui/icons/Panorama'
import type { ContentPluginProps } from 'ory-editor-core/lib/service/plugin/classes'
import { imagePlugin as baseImagePlugin } from './base'
import type { ImagePluginSettings } from './base'
import ImageHtmlRenderer from './renderer/html'
import DefaultControls from './Controls/default'


const imagePlugin = (settings?: ImagePluginSettings) => {
  if (!settings) {
    settings = {}
  }
  if (!settings.controls) {
    settings.controls = (props: Object) => <DefaultControls {...props} {...settings} />
  }
  if (!settings.renderer) {
    settings.renderer = (props: Object) => <ImageHtmlRenderer {...props} {...settings} />
  }
  if (!settings.icon) {
    settings.icon = <Panorama />
  }
  const base = baseImagePlugin(settings)
  return {
    ...base,
  }
}
const image = imagePlugin()
export default image

export type { ImagePluginSettings }
export { imagePlugin }
