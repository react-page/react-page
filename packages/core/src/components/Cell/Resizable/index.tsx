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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  };

  onResize = (event: Event, { size }: { size: { width: number } }) => {
    if (isNaN(size.width)) {
      return;
    }
    this.setState({ width: size.width });
    this.onChangeSizeThrottled(size);
  };

  onResizeStop = (event: Event, { size }: { size: { width: number } }) => {
    if (isNaN(size.width)) {
      return;
    }
    this.onChangeSize(size);
    const newSize = widthToSize(this.state, this.props, size);
    this.setState({ width: newSize * this.state.stepWidth });
  };
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

export default connect(mapStateToProps, mapDispatchToProps)(Resizable);
