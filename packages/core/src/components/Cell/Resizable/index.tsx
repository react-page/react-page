import classNames from 'classnames';
import pick from 'lodash.pick';
import throttle from 'lodash/throttle';
import * as React from 'react';
import { Resizable as ReactResizeable } from 'react-resizable';
import { useCellBounds, useCellProps, useResizeCell } from '../../hooks';
import { computeStepWidth, widthToSize } from './helper';

export interface ResizableState {
  stepWidth: number;
  width: number;
  steps: number;
}

type ResizableProps = {
  rowWidth: number;
  steps: number;
  bounds: { left: number; right: number };
  size: number;
  inline: string;
  onChange: (size: number) => void;
};
// TODO: refactor to stateless component
class ResizableInner extends React.PureComponent<
  ResizableProps,
  ResizableState
> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChangeSizeThrottled: any;
  constructor(props: ResizableProps) {
    super(props);

    const sw = computeStepWidth({
      rowWidth: props.rowWidth,
      steps: props.size,
    });

    this.onChangeSizeThrottled = throttle(this.onChangeSize, 100);
    this.state = {
      stepWidth: sw,
      width: props.size * sw,
      steps: props.steps - 1 || 11,
    };
  }

  onChangeSize = (size: { width: number }) => {
    if (isNaN(size.width)) {
      return;
    }
    const newSize = widthToSize(
      {
        steps: this.state.steps,
        stepWidth: this.state.stepWidth,
        inline: this.props.inline,
      },
      size
    );
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
    const newSize = widthToSize(
      {
        steps: this.state.steps,
        stepWidth: this.state.stepWidth,
        inline: this.props.inline,
      },
      size
    );
    this.setState({ width: newSize * this.state.stepWidth });
  };
  render() {
    const { bounds, inline, children } = this.props;

    return (
      <ReactResizeable
        className={classNames('ory-cell-inner', 'ory-cell-resizable', {
          [`ory-cell-resizable-inline-${inline || ''}`]: inline,
        })}
        onResize={this.onResize}
        onResizeStop={this.onResizeStop}
        minConstraints={inline ? null : [this.state.stepWidth, Infinity]}
        maxConstraints={
          inline || !bounds
            ? null
            : [bounds.right * this.state.stepWidth, Infinity]
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

const Resizable: React.FC<{
  nodeId: string;
  rowWidth: number;
  steps: number;
}> = ({ nodeId, ...props }) => {
  const resizeCell = useResizeCell(nodeId);
  const { size, inline } = useCellProps(nodeId, (c) =>
    pick(c, 'size', 'inline')
  );
  const bounds = useCellBounds(nodeId);

  return (
    <ResizableInner
      size={size}
      inline={inline}
      {...props}
      bounds={bounds}
      onChange={resizeCell}
    />
  );
};
export default Resizable;
