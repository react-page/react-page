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
import { Html5VideoProps } from './../types/component';

export interface HTML5VideoState {
  url: string;
}

class HTML5Video extends React.PureComponent<Html5VideoProps, HTML5VideoState> {
  constructor(props: Html5VideoProps) {
    super(props);
    this.state = {
      url: undefined,
    };
    this.changeUrlPreview = this.changeUrlPreview.bind(this);
    this.commitUrl = this.commitUrl.bind(this);
  }

  render() {
    const { Controls } = this.props;
    return (
      <Controls
        {...this.props}
        state={{
          ...this.props.state,
          url: this.state.url ? this.state.url : this.props.state.url,
        }}
        changeUrlPreview={this.changeUrlPreview}
        commitUrl={this.commitUrl}
      />
    );
  }

  private changeUrlPreview(url: string) {
    this.setState({ url });
  }

  private commitUrl() {
    this.setState({ url: undefined }, () =>
      this.props.onChange({ url: this.state.url })
    );
  }
}

export default HTML5Video;

// <div className="ory-content-plugin-html5-video">
