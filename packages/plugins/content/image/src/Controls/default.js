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
import FormControlLabel from '@material-ui/core/FormControlLabel'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Checkbox from '@material-ui/core/Checkbox'
import { ImageUpload } from 'ory-editor-ui'

import { BottomToolbar } from 'ory-editor-ui'
import { darkTheme } from 'ory-editor-ui/lib/ThemeProvider'
import type { ImageLoaded, ImageUploaded } from 'ory-editor-ui/lib/ImageUpload'
import type { ImagePluginSettings } from '../base'
import type { ControlsProps } from './index'

type StateType = {
  imagePreview?: ImageLoaded
}

class DefaultControls extends Component {
  state: StateType
  props: ControlsProps

  constructor(props: PropTypes) {
    super(props)
    this.state = {}
  }

  handleImageLoaded = (image: ImageLoaded) =>
    this.setState({ imagePreview: image })

  handleImageUploaded = (resp: ImageUploaded) => {
    this.setState({ imagePreview: undefined })
    this.props.handleSrcChange(resp.url)
  }

  handleSrcChange = (e: any) => this.props.handleSrcChange(e.target.value)

  handleOpenInNewWindowCheckedChange = () =>
    this.props.handleOpenInNewWindowCheckedChange(!this.props.openInNewWindow)

  handleHrefChange = (e: any) => this.props.handleHrefChange(e.target.value)

  render() {
    return (
      <div>
        <BottomToolbar open={this.props.focused} theme={darkTheme}>
          <div style={{ display: 'flex' }}>
            {this.props.imageUpload && (
              <React.Fragment>
                <ImageUpload
                  imageUpload={this.props.imageUpload}
                  imageLoaded={this.handleImageLoaded}
                  imageUploaded={this.handleImageUploaded}
                />
                <Typography style={{ marginLeft: '20px', marginRight: '20px' }}>
                  OR
                </Typography>
              </React.Fragment>
            )}
            <TextField
              placeholder="http://example.com/image.png"
              label={this.props.imageUpload ? 'I have a URL' : 'Image URL'}
              style={{ flex: 1 }}
              value={this.props.src}
              onChange={this.handleSrcChange}
            />
          </div>
          <TextField
            placeholder="http://example.com"
            label="Link location (url)"
            style={{ width: '512px' }}
            value={this.props.href}
            onChange={this.handleHrefChange}
          />
          <br />
          <br />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.props.openInNewWindow}
                onChange={this.handleOpenInNewWindowCheckedChange}
              />
            }
            label="Open in new window"
          />
        </BottomToolbar>
        <this.props.renderer
          {...this.props}
          imagePreview={this.state.imagePreview}
        />
      </div>
    )
  }
}

export default DefaultControls
