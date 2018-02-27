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

import Provider from '../Provider'
import ToggleEdit from './ToggleEdit'
import ToggleInsert from './ToggleInsert'
import ToggleLayout from './ToggleLayout'
import TogglePreview from './TogglePreview'
import ToggleResize from './ToggleResize'

const Inner = (props: any) => (
  <Provider {...props}>
    <div className="ory-controls-mode-toggle-control-group">
      <div className="ory-controls-mode-toggle-control">
        <ToggleEdit />
        <div className="ory-controls-mode-toggle-clearfix" />
      </div>

      <div className="ory-controls-mode-toggle-control">
        <ToggleInsert />
        <div className="ory-controls-mode-toggle-clearfix" />
      </div>

      <div className="ory-controls-mode-toggle-control">
        <ToggleLayout />
        <div className="ory-controls-mode-toggle-clearfix" />
      </div>

      <div className="ory-controls-mode-toggle-control">
        <ToggleResize />
        <div className="ory-controls-mode-toggle-clearfix" />
      </div>

      <div className="ory-controls-mode-toggle-control">
        <TogglePreview />
        <div className="ory-controls-mode-toggle-clearfix" />
      </div>
    </div>
  </Provider>
)

export default Inner
