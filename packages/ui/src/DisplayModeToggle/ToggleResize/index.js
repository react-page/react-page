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
import Resize from 'material-ui/svg-icons/action/settings-overscan'
import { connect } from 'react-redux'
import { resizeMode } from 'ory-editor-core/lib/actions/display'
import { isResizeMode } from 'ory-editor-core/lib/selector/display'
import { createStructuredSelector } from 'reselect'

import Button from '../Button'

const Inner = ({
  isResizeMode,
  resizeMode
}: {
  isResizeMode: boolean,
  resizeMode: Function
}) => (
  <Button
    icon={<Resize />}
    description="Resize things"
    active={isResizeMode}
    onClick={resizeMode}
  />
)

const mapStateToProps = createStructuredSelector({ isResizeMode })
const mapDispatchToProps = { resizeMode }

export default connect(mapStateToProps, mapDispatchToProps)(Inner)
