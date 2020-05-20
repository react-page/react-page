import classNames from 'classnames';
import * as React from 'react';
import { DropTarget as dropTarget } from 'react-dnd';
import { dragActions } from '../../../actions/cell/drag';
import { insertActions } from '../../../actions/cell/insert';
import { connect } from '../../../reduxConnect';
import {
  ComponetizedCell,
  SimplifiedModesProps
} from '../../../types/editable';
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
} & SimplifiedModesProps;

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
      allowMoveInEditMode,
    } = this.props;

    if (!(isLayoutMode || isInsertMode) && !allowMoveInEditMode) {
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
