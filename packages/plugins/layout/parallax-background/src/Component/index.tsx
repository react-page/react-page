import * as React from 'react';

import { ParallaxBackgroundProps } from '../types/component';

export interface ParallaxBackgroundState {
  darken?: string | number;
  background?: string;
}

class ParallaxBackground extends React.Component<
  ParallaxBackgroundProps,
  ParallaxBackgroundState
> {
  constructor(props: ParallaxBackgroundProps) {
    super(props);
    this.state = {};
    this.handleDarkenPreviewChange = this.handleDarkenPreviewChange.bind(this);
    this.commitDarken = this.commitDarken.bind(this);
    this.handleBackgroundPreviewChange = this.handleBackgroundPreviewChange.bind(
      this
    );
    this.commitBackground = this.commitBackground.bind(this);
  }

  render() {
    const { Controls } = this.props;
    return (
      <Controls
        {...this.props}
        state={{
          ...this.props.state,
          darken: this.state.darken
            ? this.state.darken
            : this.props.state.darken,
          background: this.state.background
            ? this.state.background
            : this.props.state.background,
        }}
        handleDarkenPreviewChange={this.handleDarkenPreviewChange}
        commitDarken={this.commitDarken}
        handleBackgroundPreviewChange={this.handleBackgroundPreviewChange}
        commitBackground={this.commitBackground}
      />
    );
  }

  private handleDarkenPreviewChange(darken: number | string) {
    this.setState({ darken });
  }

  private commitDarken() {
    this.props.onChange({ darken: this.state.darken });
    this.setState({ darken: undefined });
  }

  private handleBackgroundPreviewChange(background: string) {
    this.setState({ background });
  }

  private commitBackground() {
    this.props.onChange({ background: this.state.background });
    this.setState({ background: undefined });
  }
}

export default ParallaxBackground;
