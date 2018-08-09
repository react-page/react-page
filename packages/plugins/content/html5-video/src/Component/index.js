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
import { ContentPluginProps } from 'ory-editor-core/lib/service/plugin/classes'
import TextField from '@material-ui/core/TextField'
import { BottomToolbar } from 'ory-editor-ui'
import { darkTheme } from 'ory-editor-ui/lib/ThemeProvider'

export type Props = ContentPluginProps<*>

const changeUrl = (onChange: any) => (event: Event, newValue: string) =>
  onChange({ url: newValue })

const HTML5Video = ({
  readOnly,
  onChange,
  state: { url = '' },
  focused
}: {
  readOnly: boolean,
  onChange: any,
  state: { url: string },
  focused: boolean
}) => (
  <div className="ory-content-plugin-html5-video">
    {!readOnly ? (
      <BottomToolbar open={focused} theme={darkTheme}>
        <TextField
          placeholder="https://example.com/video.webm"
          label="Video url"
          onChange={changeUrl(onChange)}
          value={url}
        />
      </BottomToolbar>
    ) : null}
    <video autoPlay controls loop muted width="100%">
      <source src={url} type={`video/${url.split('.').pop()}`} />
    </video>
  </div>
)

export default HTML5Video
