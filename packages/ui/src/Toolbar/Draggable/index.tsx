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
import { shouldPureComponentUpdate } from '@react-page/core/lib/helper/shouldComponentUpdate';
import { DragSource as dragSource } from 'react-dnd';
import { source, collect } from './helper/index';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { clearHover } from '@react-page/core/lib/actions/cell/drag';
import {
  insertMode,
  editMode,
  layoutMode
} from '@react-page/core/lib/actions/display';

const instances = {};

export interface DraggableProps {
  isDragging: boolean;
  className: string;
  // tslint:disable-next-line:no-any
  insert: any;
  connectDragSource<T>(element: T): T;
  connectDragPreview<T>(element: T): T;
  layoutMode(): void;
}

class Draggable extends React.Component<DraggableProps> {
  shouldComponentUpdate = shouldPureComponentUpdate;

  componentDidMount() {
    const img = new Image();
    img.onload = () => this.props.connectDragPreview(img);
    img.src =
      // tslint:disable-next-line:max-line-length
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAhCAYAAACbffiEAAAA6UlEQVRYhe2ZQQ6CMBBFX0njHg7ESXTp1p3uvIBewc3Em3AfdelSFwRDCAm01JRO+pa0lP8zzc9kMCKyAa7AFqhIixdwB44WuACHuHq8KWm1vwtgF1lMCPaWkevUNE3Qr9R17XTu1P5uvUdV+IpbG2qMGBH5xBYRAjUVUWPEjj10SS3XRFry3kha/VBTETVGcmqtDTVGFqdWn7k9ku96f88QNRVRYySn1tpQY8QptXz7qinmnpt7rZTIqbU21BgJ2mv1+XfCDVFTETVGjIg8SG8KP+RZ0I7lU+dmgRNgaKfyZVw9znT/R85fOHJJE77U6UcAAAAASUVORK5CYII=';
  }

  render() {
    const { connectDragSource, isDragging, children, className } = this.props;
    const classes = classNames(
      className,
      { 'ory-toolbar-draggable-is-dragged': isDragging },
      'ory-toolbar-draggable'
    );

    return connectDragSource(<div className={classes}>{children}</div>);
  }
}

const mapStateToProps = null;

const mapDispatchToProps = { insertMode, editMode, layoutMode, clearHover };

export default (dragType: string = 'CELL') => {
  if (!instances[dragType]) {
    instances[dragType] = connect(
      mapStateToProps,
      mapDispatchToProps
    )(dragSource(dragType, source, collect)(Draggable));
  }

  return instances[dragType];
};
