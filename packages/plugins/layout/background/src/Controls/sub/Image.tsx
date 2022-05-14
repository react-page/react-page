import React from 'react';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import type { ImageLoaded, ImageUploaded } from '@react-page/editor';
import { ImageUpload } from '@react-page/editor';
import Typography from '@material-ui/core/Typography';

import type { BackgroundProps } from '../../types/component';

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
                translations={this.props.translations}
                imageUpload={this.props.imageUpload}
                imageLoaded={this.handleImageLoaded}
                imageUploaded={this.handleImageUploaded}
              />
              <Typography
                variant="body1"
                style={{ margin: '20px 16px 0 16px' }}
              >
                {this.props.translations?.or}
              </Typography>
            </React.Fragment>
          )}

          <TextField
            placeholder={this.props.translations?.srcPlaceholder}
            label={
              this.props.imageUpload
                ? this.props.translations?.haveUrl
                : this.props.translations?.imageUrl
            }
            style={{ width: '256px' }}
            value={background}
            onChange={this.handleChangeBackground}
          />

          <FormControlLabel
            control={
              <Switch
                onChange={this.handleChangeIsParallax}
                checked={isParallax}
              />
            }
            label={this.props.translations?.isParallax}
          />
        </div>
      </div>
    );
  }
}

export default ImageComponent;
