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
    const { Controls } = this.props;
    return (
      <Controls
        {...this.props}
        state={{
          ...this.props.state,
          src: this.state.src ? this.state.src : this.props.state.src,
        }}
        changeSrcPreview={this.changeSrcPreview}
        commitSrc={this.commitSrc}
      />
    );
  }

  private changeSrcPreview(src: string) {
    this.setState({ src });
  }

  private commitSrc() {
    this.setState({ src: undefined }, () =>
      this.props.onChange({ src: this.state.src })
    );
  }
}

export default Video;

// <div className="ory-content-plugin--video">
