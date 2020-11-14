import * as React from 'react';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { ImageUpload, ImageLoaded, ImageUploaded } from '@react-page/editor';
import Typography from '@material-ui/core/Typography';

import { BackgroundProps } from '../../types/component';

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
  };

  handleChangeIsParallax = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.ensureModeOn();
    this.props.onChange({
      isParallax:
        this.props.data.isParallax === undefined
          ? false
          : !this.props.data.isParallax,
    });
  };

  handleImageLoaded = (image: ImageLoaded) => {
    this.props.ensureModeOn();
    this.props.onImageLoaded(image);
  };

  handleImageUploaded = (resp: ImageUploaded) => {
    this.props.onImageUploaded();
    this.props.onChange({ background: resp.url });
  };

  render() {
    const {
      data: { isParallax = true, background = '' },
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
      </div>
    );
  }
}

export default ImageComponent;
