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
import { SpacerProps } from './../types/component';

export interface SpacerState {
  height: number;
}

class Spacer extends React.PureComponent<SpacerProps, SpacerState> {
  constructor(props: SpacerProps) {
    super(props);
    this.state = {
      height: undefined,
    };
    this.changeHeightPreview = this.changeHeightPreview.bind(this);
    this.commitHeight = this.commitHeight.bind(this);
  }

  render() {
    const { Controls } = this.props;
    return (
      <Controls
        {...this.props}
        state={{
          ...this.props.state,
          height: this.state.height
            ? this.state.height
            : this.props.state.height,
        }}
        changeHeightPreview={this.changeHeightPreview}
        commitHeight={this.commitHeight}
      />
    );
  }

  private changeHeightPreview(height: number) {
    if (!height || height < 24) {
      height = 24;
    }
    this.setState({ height });
  }

  private commitHeight(height: number) {
    let h = height ? height : this.state.height;
    if (!h || h < 24) {
      h = 24;
    }
    this.setState({ height: undefined }, () =>
      this.props.onChange({ height: h })
    );
  }
}

export default Spacer;
