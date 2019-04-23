import * as React from 'react';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import SelectField from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { ImageUpload } from 'ory-editor-ui';
import Typography from '@material-ui/core/Typography';
import { ImageLoaded, ImageUploaded } from 'ory-editor-ui/lib/ImageUpload';
import { BackgroundProps } from '../../types/component';
import { MenuItem } from '@material-ui/core';

export interface ImageComponentProps {
  ensureModeOn: () => void;
  onImageLoaded: (image: ImageLoaded) => void;
  onImageUploaded: () => void;
}

class ImageComponent extends React.Component<
BackgroundProps & ImageComponentProps
> {
  handleChangeBackground = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.ensureModeOn();
    this.props.onChange({ background: e.target.value });
  }  

  handleChangeIsParallax = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.ensureModeOn();
    this.props.onChange({
      isParallax:
        this.props.state.isParallax === undefined
          ? false
          : !this.props.state.isParallax,
    });
  }

  handleChangeBackgroundSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.props.ensureModeOn();
    this.props.onChange({ backgroundSize: e.target.value });
  }  

  handleChangeBackgroundPositionH = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.props.ensureModeOn();
    this.props.onChange({ backgroundPositionH: e.target.value });
  }  

  handleChangeBackgroundPositionV = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.props.ensureModeOn();
    this.props.onChange({ backgroundPositionV: e.target.value });
  }  

  handleImageLoaded = (image: ImageLoaded) => {
    this.props.ensureModeOn();
    this.props.onImageLoaded(image);
  }

  handleImageUploaded = (resp: ImageUploaded) => {
    this.props.onImageUploaded();
    this.props.onChange({ background: resp.url });
  }

  render() {
    const {
      state: { isParallax = true, background = '', backgroundSize = 'cover', backgroundPositionH = 'center', backgroundPositionV = 'center' },
    } = this.props;
    return (
      <div>
        <div style={{ display: 'flex' }}>
          {this.props.imageUpload && (
            <React.Fragment>
              <ImageUpload
                imageUpload={this.props.imageUpload}
                imageLoaded={this.handleImageLoaded}
                imageUploaded={this.handleImageUploaded}
              />
              <Typography
                variant="body1"
                style={{ marginLeft: '20px', marginRight: '20px' }}
              >
                OR
              </Typography>
            </React.Fragment>
          )}
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
          <FormControlLabel
            control={
              <Switch
                onChange={this.handleChangeIsParallax}
                checked={isParallax}
              />
            }
            label="Is parallax"
          />
        </div>
        <div style={{ display: 'flex' }}>
          <FormControlLabel
            control={
              <SelectField
                value={backgroundSize}
                onChange={this.handleChangeBackgroundSize}                
              >
                <MenuItem value="cover">Cover</MenuItem>
                <MenuItem value="contain">Contain</MenuItem>
                <MenuItem value="auto">Auto</MenuItem>
              </SelectField>
            }
            label="Size"
          />
        </div>
        <div style={{ display: 'flex' }}>
          <FormControlLabel
            control={
              <SelectField
                value={backgroundPositionH}
                onChange={this.handleChangeBackgroundPositionH}                
              >
                <MenuItem value="left">Left</MenuItem>
                <MenuItem value="center">Center</MenuItem>
                <MenuItem value="right">Right</MenuItem>
              </SelectField>
            }
            label="Horizontal position"
          />
        </div>
        <div style={{ display: 'flex' }}>
          <FormControlLabel
            control={
              <SelectField
                value={backgroundPositionV}
                onChange={this.handleChangeBackgroundPositionV}                
              >
                <MenuItem value="top">Top</MenuItem>
                <MenuItem value="center">Center</MenuItem>
                <MenuItem value="bottom">Bottom</MenuItem>
              </SelectField>
            }
            label="Vertical position"
          />
        </div>
      </div>
    );
  }
}

export default ImageComponent;
