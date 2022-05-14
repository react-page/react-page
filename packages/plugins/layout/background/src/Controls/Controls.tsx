import React from 'react';

import type { BackgroundProps } from '../types/component';

import type { ImageLoaded, RGBColor } from '@react-page/editor';
import type { ModeEnum } from '../types/ModeEnum';

import Inner from './Inner';

export type BackgroundState = {
  backgroundColorPreview?: RGBColor;
  gradientDegPreview?: number;
  gradientDegPreviewIndex?: number;
  gradientOpacityPreview?: number;
  gradientOpacityPreviewIndex?: number;
  gradientColorPreview?: RGBColor;
  gradientColorPreviewIndex?: number;
  gradientColorPreviewColorIndex?: number;
  darkenPreview?: number;
  lightenPreview?: number;
  imagePreview?: ImageLoaded;
};

class BackgroundDefaultControls extends React.Component<
  BackgroundProps,
  BackgroundState
> {
  constructor(props: BackgroundProps) {
    super(props);
    this.state = {};
  }

  handleChangeDarken = () => {
    this.props.onChange({ darken: this.state.darkenPreview });
    this.setState({ darkenPreview: undefined });
  };

  handleChangeDarkenPreview = (value: number) => {
    this.setState({ darkenPreview: value });
  };

  handleChangeLighten = () => {
    this.props.onChange({ lighten: this.state.lightenPreview });
    this.setState({ lightenPreview: undefined });
  };

  handleChangeLightenPreview = (value: number) => {
    this.setState({ lightenPreview: value });
  };

  handleChangeHasPadding = () => {
    this.props.onChange({
      hasPadding:
        this.props.data.hasPadding === undefined
          ? !this.props.defaultHasPadding
          : !this.props.data.hasPadding,
    });
  };

  handleChangeBackgroundColorPreview = (e?: RGBColor) =>
    this.setState({ backgroundColorPreview: e });

  handleChangeGradientDegPreview = (
    gradientDegPreview: number | undefined,
    gradientDegPreviewIndex?: number
  ) => this.setState({ gradientDegPreview, gradientDegPreviewIndex });

  handleChangeGradientOpacityPreview = (
    gradientOpacityPreview: number | undefined,
    gradientOpacityPreviewIndex?: number
  ) => this.setState({ gradientOpacityPreview, gradientOpacityPreviewIndex });

  handleChangeGradientColorPreview = (
    gradientColorPreview: RGBColor | undefined,
    gradientColorPreviewIndex?: number,
    gradientColorPreviewColorIndex?: number
  ) =>
    this.setState({
      gradientColorPreview,
      gradientColorPreviewIndex,
      gradientColorPreviewColorIndex,
    });

  handleImageLoaded = (imagePreview: ImageLoaded) =>
    this.setState({ imagePreview });

  handleImageUploaded = () => this.setState({ imagePreview: undefined });

  handleChangeModeSwitch =
    (mode: ModeEnum | undefined, modeFlag: ModeEnum | undefined) => () => {
      if (mode && modeFlag) {
        modeFlag ^= mode;
        this.props.onChange({ modeFlag });
      } else {
        this.props.onChange({ modeFlag });
      }
    };

  render() {
    return (
      <Inner
        {...this.props}
        handleChangeDarken={this.handleChangeDarken}
        handleChangeDarkenPreview={this.handleChangeDarkenPreview}
        handleChangeLighten={this.handleChangeLighten}
        handleChangeLightenPreview={this.handleChangeLightenPreview}
        handleChangeHasPadding={this.handleChangeHasPadding}
        handleChangeModeSwitch={this.handleChangeModeSwitch}
        handleChangeBackgroundColorPreview={
          this.handleChangeBackgroundColorPreview
        }
        handleChangeGradientDegPreview={this.handleChangeGradientDegPreview}
        handleChangeGradientOpacityPreview={
          this.handleChangeGradientOpacityPreview
        }
        handleChangeGradientColorPreview={this.handleChangeGradientColorPreview}
        handleImageLoaded={this.handleImageLoaded}
        handleImageUploaded={this.handleImageUploaded}
        {...this.state}
      />
    );
  }
}

export default BackgroundDefaultControls;
