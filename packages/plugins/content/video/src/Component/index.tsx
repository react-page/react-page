import * as React from 'react';
import { VideoProps } from './../types/component';

export interface VideoState {
  src: string;
}

class Video extends React.PureComponent<VideoProps, VideoState> {
  constructor(props: VideoProps) {
    super(props);
    this.state = {
      src: undefined,
    };
    this.changeSrcPreview = this.changeSrcPreview.bind(this);
    this.commitSrc = this.commitSrc.bind(this);
  }

  render() {
    const { Controls, readOnly, Renderer } = this.props;
    return (
      <>
        {!readOnly ? (
          <Controls
            {...this.props}
            state={{
              ...this.props.state,
              src: this.state.src ? this.state.src : this.props.state.src,
            }}
            changeSrcPreview={this.changeSrcPreview}
            commitSrc={this.commitSrc}
          />
        ) : null}
        <Renderer {...this.props} />
      </>
    );
  }

  private changeSrcPreview(src: string) {
    this.setState({ src });
  }

  private commitSrc() {
    const src = this.state.src;
    this.setState({ src: undefined }, () => this.props.onChange({ src }));
  }
}

export default Video;

// <div className="ory-content-plugin--video">
