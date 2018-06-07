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
import Display from '../Display'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import type { PropTypes } from '../index.js'

import { BottomToolbar } from 'ory-editor-ui'

const handleChange = (onChange: Function) => (e: Event) => {
  const target = e.target
  if (target instanceof HTMLInputElement) {
    const change = {}

    if (target.name === 'target') {
      if (target.checked) {
        change.target = '_blank'
        // noopener is safer but not supported in IE, so noreferrer adds some security
        change.rel = 'noreferrer noopener'
      } else {
        change.target = null
        change.rel = null
      }
    } else {
      change[target.name] = target.value
    }

    onChange(change)
    return
  }
}

const Form = (props: PropTypes) => (
  <div>
    <Display {...props} />
    <BottomToolbar open={props.focused}>
      <TextField
        placeholder="http://example.com/image.png"
        label="Image location (url)"
        name="src"
        style={{ width: '512px' }}
        value={props.state.src}
        onChange={handleChange(props.onChange)}
      />
      <br/>
      <TextField
        placeholder="http://example.com"
        label="Link location (url)"
        name="href"
        style={{ width: '512px' }}
        value={props.state.href}
        onChange={handleChange(props.onChange)}
      />
      <br/>
      <br/>
      <FormControlLabel
        control={<Checkbox
          checked={props.state.target === '_blank'}
          name="target"
          onChange={handleChange(props.onChange)}
        />}
        label="Open in new window"
      />
    </BottomToolbar>
  </div>
)

export default Form
