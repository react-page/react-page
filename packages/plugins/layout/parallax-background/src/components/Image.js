import React, { Component } from 'react'
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { ImageUpload } from 'ory-editor-ui'
import Typography from '@material-ui/core/Typography';

class ImageComponent extends Component {
  handleChangeBackground = (e: any) => this.props.ensureModeOn() | this.props.onChange({ background: e.target.value })

  handleChangeIsParallax = (e: any) => this.props.ensureModeOn() | this.props.onChange({ isParallax: this.props.state.isParallax === undefined ? false : !this.props.state.isParallax })

  handleImageLoaded = (image) => this.props.ensureModeOn() | this.props.onImageLoaded(image)

  handleImageUploaded = (resp: object) => this.props.onImageUploaded() | this.props.onChange({ background: resp.url })

  render() {
    const {
      onChange,
      state: {
        isParallax = true,
        background = ''
      }
    } = this.props
    return (
      <div>
        <div style={{ display: 'flex' }}>
          {this.props.imageUpload && <React.Fragment>
            <ImageUpload
              imageUpload={this.props.imageUpload}
              imageLoaded={this.handleImageLoaded}
              imageUploaded={this.handleImageUploaded}
            />
            <Typography style={{ marginLeft: '20px', marginRight: '20px' }}>OR</Typography>
          </React.Fragment>}
          <TextField
            placeholder="http://example.com/image.png"
            label={this.props.imageUpload ? 'I have a URL' : 'Image URL'}
            style={{ width: '256px' }}
            value={background}
            onChange={this.handleChangeBackground}
          />
        </div>
        <br />
        <div style={{ display: 'flex' }}>
          <FormControlLabel control={<Switch onChange={this.handleChangeIsParallax} checked={isParallax} />} label="Is parallax" />
        </div>
      </div>
    );
  }
}

export default ImageComponent