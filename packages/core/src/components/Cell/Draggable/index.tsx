import classNames from 'classnames';
import * as React from 'react';
import { DragSource as dragSource } from 'react-dnd';
import { dragActions } from '../../../actions/cell/drag';
import { insertActions } from '../../../actions/cell/insert';
import { connect } from '../../../reduxConnect';
import {
  ComponetizedCell,
  SimplifiedModesProps
} from '../../../types/editable';
import { collect, source } from './helper/dnd';

const icon =
  // tslint:disable-next-line:max-line-length
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAhCAYAAACbffiEAAAA6UlEQVRYhe2ZQQ6CMBBFX0njHg7ESXTp1p3uvIBewc3Em3AfdelSFwRDCAm01JRO+pa0lP8zzc9kMCKyAa7AFqhIixdwB44WuACHuHq8KWm1vwtgF1lMCPaWkevUNE3Qr9R17XTu1P5uvUdV+IpbG2qMGBH5xBYRAjUVUWPEjj10SS3XRFry3kha/VBTETVGcmqtDTVGFqdWn7k9ku96f88QNRVRYySn1tpQY8QptXz7qinmnpt7rZTIqbU21BgJ2mv1+XfCDVFTETVGjIg8SG8KP+RZ0I7lU+dmgRNgaKfyZVw9znT/R85fOHJJE77U6UcAAAAASUVORK5CYII=';

type Props = ComponetizedCell & {
  isLeaf: boolean;
  isOver: boolean;
  isOverCurrent: boolean;
  isDragging: boolean;
  isInsertMode: boolean;
  isLayoutMode: boolean;
  node: { hover: string; inline: string };
  // tslint:disable-next-line:no-any
  children: any;
  className: string;
  name: string;
  dragType: string;
  connectDragSource<T>(e: T): T;
  connectDragPreview(image: HTMLImageElement): void;
} & SimplifiedModesProps;

const defaultSmallHandle = (
  <div className="ory-cell-draggable-overlay-handle">
    <div className="ory-cell-draggable-overlay-handle-icon" />
  </div>
);

class Draggable extends React.PureComponent<Props> {
  props: Props;
  componentDidMount() {
    const img = new Image();
    img.onload = () => this.props.connectDragPreview(img);
    img.src = icon;
  }

  render() {
    const {
      isLeaf,
      connectDragSource,
      isDragging,
      isLayoutMode,
      node: { inline },
      children,
      name,
      allowMoveInEditMode,
    } = this.props;

    if (!isLayoutMode && !this.props.allowMoveInEditMode) {
      return (
        <div className="ory-cell-draggable-container">
          {/* these divs are here to prevent page jumping, they are a placeholder for draggable / draggable-overlay */}
          <div className="ory-cell-draggable-overlay-placeholder" />
          {children}
        </div>
      );
    }

    if (this.props.allowMoveInEditMode) {
      const handle = connectDragSource(
        this.props.editModeResizeHandle || defaultSmallHandle
      );
      return (
        <div
          className={classNames({
            'ory-cell-draggable-in-edit': allowMoveInEditMode,
            'ory-cell-draggable': isLayoutMode && !allowMoveInEditMode,
            'ory-cell-draggable-is-dragging': isDragging,
          })}
        >
          {handle}
          <div>{children}</div>
        </div>
      );
    }

    return connectDragSource(
      <div
        className={classNames({
          'ory-cell-draggable-in-edit': allowMoveInEditMode,
          'ory-cell-draggable': isLayoutMode && !allowMoveInEditMode,
          'ory-cell-draggable-is-dragging': isDragging,
        })}
      >
        <div
          className={classNames({
            'ory-cell-draggable-in-edit-overlay': allowMoveInEditMode,
            'ory-cell-draggable-overlay': isLayoutMode && !allowMoveInEditMode,
            [`ory-cell-draggable-inline-${inline}`]: inline,
            'ory-cell-draggable-leaf': isLeaf,
          })}
        >
          <div className="ory-cell-draggable-overlay-description">
            <span>{name}</span>
          </div>
        </div>
        <div>{children}</div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  ...dragActions,
  ...insertActions,
};

export default connect(
  null,
  mapDispatchToProps
)(
  dragSource<Props>(
    ({ dragType }: { dragType: string }) => dragType,
    source,
    collect
  )(Draggable)
);
