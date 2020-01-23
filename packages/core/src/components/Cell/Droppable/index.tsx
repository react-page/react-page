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
import * as React from 'react';
import { DropTarget as dropTarget } from 'react-dnd-cjs';
import { dragActions } from '../../../actions/cell/drag';
import { insertActions } from '../../../actions/cell/insert';
import { connect } from '../../../reduxConnect';
import { ComponetizedCell } from '../../../types/editable';
import { connect as monitorConnect, target } from './helper/dnd';

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
  dropTypes: Array<string>;
  connectDropTarget<T>(e: T): T;
};

class Droppable extends React.PureComponent<Props> {
  render() {
    const {
      connectDropTarget,
      isLayoutMode,
      isInsertMode,
      className,
      isLeaf,
      node: { hover },
      children,
    } = this.props;

    if (!(isLayoutMode || isInsertMode)) {
      return (
        <div className={classNames(className, 'ory-cell-droppable-container')}>
          {children}
        </div>
      );
    }

    return connectDropTarget(
      <div
        className={classNames(className, 'ory-cell-droppable', {
          'ory-cell-droppable-is-over-current': hover,
          [`ory-cell-droppable-is-over-${hover}`]: hover,
          'ory-cell-droppable-leaf': isLeaf,
        })}
      >
        {children}
      </div>
    );
  }
}

const mapDispatchToProps = { ...dragActions, ...insertActions };

export default connect(
  null,
  mapDispatchToProps
)(
  dropTarget<Props>(
    ({ dropTypes }: { dropTypes: Array<string> }) => dropTypes,
    target,
    monitorConnect
  )(Droppable)
);
