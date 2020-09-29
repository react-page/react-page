import * as React from 'react';
import { ImageLoaded, ImageUploaded } from '@react-page/ui';
import { ImageProps } from '../types/component';
import { ImageState } from './../types/state';

type StateType = {
  imagePreview?: ImageLoaded;
};

class Form extends React.Component<ImageProps, StateType> {
  constructor(props: ImageProps) {
    super(props);
    this.state = {};
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    if (target instanceof HTMLInputElement) {
      const change: Partial<ImageState> = {};

      if (target.name === 'target') {
        if (target.checked) {
          change.target = '_blank';
          // noopener is safer but not supported in IE, so noreferrer adds some security
          change.rel = 'noreferrer noopener';
        } else {
          change.target = null;
          change.rel = null;
        }
      } else {
        change[target.name] = target.value;
      }

      this.props.onChange(change);
      return;
    }
  };

  handleImageLoaded = (image: ImageLoaded) =>
    this.setState({ imagePreview: image });

  handleImageUploaded = (resp: ImageUploaded) => {
    this.setState({ imagePreview: undefined });
    this.props.onChange({ src: resp.url });
  };

  render() {
    const { Controls, Renderer, readOnly } = this.props;
    // only render either controls or renderer, because controls also include renderer
    return !readOnly ? (
      <Controls
        {...this.props}
        imagePreview={this.state.imagePreview}
        handleImageLoaded={this.handleImageLoaded}
        handleImageUploaded={this.handleImageUploaded}
        handleChange={this.handleChange}
      />
    ) : (
      <Renderer {...this.props} />
    );
  }
}

export default Form;
