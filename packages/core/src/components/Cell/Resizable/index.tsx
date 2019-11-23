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

import classNames from 'classnames';
import throttle from 'lodash/throttle';
import * as React from 'react';
import { Resizable as ReactResizeable } from 'react-resizable';
import { createStructuredSelector } from 'reselect';
import { editMode, resizeMode } from '../../../actions/display';
import { connect } from '../../../reduxConnect';
import { ComponetizedCell } from '../../../types/editable';
import { computeStepWidth, widthToSize } from './helper';
type ResizableProps = ComponetizedCell;

export interface ResizableState {
  stepWidth: number;
  width: number;
  steps: number;
}

class Resizable extends React.PureComponent<ResizableProps, ResizableState> {
  // tslint:disable-next-line:no-any
  onChangeSizeThrottled: any;
  constructor(props: ResizableProps) {
    super(props);

    const sw = computeStepWidth(props);

    this.onChangeSizeThrottled = throttle(this.onChangeSize, 100);
    this.state = {
      stepWidth: sw,
      width: props.node.size * sw,
      steps: props.steps - 1 || 11,
    };
  }

  onChangeSize = (size: { width: number }) => {
    if (isNaN(size.width)) {
      return;
    }
    const newSize = widthToSize(this.state, this.props, size);
    this.props.onChange(newSize);
  }

  onResize = (event: Event, { size }: { size: { width: number } }) => {
    if (isNaN(size.width)) {
      return;
    }
    this.setState({ width: size.width });
    this.onChangeSizeThrottled(size);
  }

  onResizeStop = (event: Event, { size }: { size: { width: number } }) => {
    if (isNaN(size.width)) {
      return;
    }
    this.onChangeSize(size);
    const newSize = widthToSize(this.state, this.props, size);
    this.setState({ width: newSize * this.state.stepWidth });
  }
  render() {
    const {
      node: { bounds, inline },
      children,
    } = this.props;

    return (
      <ReactResizeable
        className={classNames('ory-cell-inner', 'ory-cell-resizable', {
          [`ory-cell-resizable-inline-${inline || ''}`]: inline,
        })}
        onResize={this.onResize}
        onResizeStop={this.onResizeStop}
        minConstraints={inline ? null : [this.state.stepWidth, Infinity]}
        maxConstraints={
          inline ? null : [bounds.right * this.state.stepWidth, Infinity]
        }
        draggableOpts={{ axis: 'none', offsetParent: document.body }}
        width={this.state.width}
        height={0}
      >
        {/* this div needs to be kept or resize will be broken */}
        <div>{children}</div>
      </ReactResizeable>
    );
  }
}

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = { resizeMode, editMode };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Resizable);
