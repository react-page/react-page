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
import React, { Component } from 'react'
import type { ImagePluginSettings } from '../base'

export type ControlsBaseProps = {
  focused: boolean,
  renderer: (props: Object) => any
}

export type ControlsApi = {
  state: Object,
  src: string,
  openInNewWindow: boolean,
  href: string,
  handleSrcChange: (url: string) => void,
  handleOpenInNewWindowCheckedChange: (checked: boolean) => void,
  handleHrefChange: (url: string) => void
}

export type ControlsProps = ControlsApi &
  ImagePluginSettings &
  ControlsBaseProps

class ImageControls extends Component {
  handleSrcChange = (src: string) => this.props.onChange({ src })

  handleOpenInNewWindowCheckedChange = (checked: boolean) => {
    const change = {}
    if (checked) {
      change.target = '_blank'
      // noopener is safer but not supported in IE, so noreferrer adds some security
      change.rel = 'noreferrer noopener'
    } else {
      change.target = null
      change.rel = null
    }
    this.props.onChange(change)
  }

  handleHrefChange = (href: string) => this.props.onChange({ href })

  render() {
    const { renderer, focused, state } = this.props
    return (
      !this.props.readOnly && (
        <this.props.controls
          renderer={renderer}
          focused={focused}
          state={state}
          handleSrcChange={this.handleSrcChange}
          handleOpenInNewWindowCheckedChange={
            this.handleOpenInNewWindowCheckedChange
          }
          handleHrefChange={this.handleHrefChange}
          src={this.props.state.src}
          openInNewWindow={this.props.state.target === '_blank'}
          href={this.props.state.href}
        />
      )
    )
  }
}

export default ImageControls
