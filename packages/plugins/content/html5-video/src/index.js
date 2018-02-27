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
