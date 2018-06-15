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
import Button from '@material-ui/core/Button'
import { device } from 'device.js'

const DisplayModeToggle = ({
  description,
  icon,
  onClick,
  active,
  disabled
}: {
  description: string,
  icon: any,
  active: boolean,
  disabled?: boolean,
  onClick: Function,
  description: string
}) => (
  <div className="ory-controls-mode-toggle-button">
    <div className="ory-controls-mode-toggle-button-inner">
      <Button
        variant='fab'
        color={active ? 'secondary' : 'default'}
        mini={device.mobile}
        onClick={onClick}
        disabled={disabled}
      >
        {icon}
      </Button>
    </div>
    <div className="ory-controls-mode-toggle-button-description">
      {description}
    </div>
  </div>
)

export default DisplayModeToggle
