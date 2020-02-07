import throttle from 'lodash.throttle';
import * as React from 'react';
import { DropTargetConnector, DropTargetMonitor } from 'react-dnd';
import {
  createNativeCellReplacement,
  isNativeHTMLElementDrag
} from '../../../../helper/nativeDragHelpers';
import { delay } from '../../../../helper/throttle';
import {
  computeAndDispatchHover,
  computeAndDispatchInsert
} from '../../../../service/hover/input';
import logger from '../../../../service/logger';
import { ComponetizedCell } from '../../../../types/editable';

let last: { hover: string; drag: string } = { hover: '', drag: '' };

const clear = (hover: ComponetizedCell, drag: string) => {
  if (hover.id === last.hover && drag === last.drag) {
    return;
  }
  last = { hover: hover.id, drag };
  hover.clearHover();
};

export const target = {
  hover: throttle(
    (
      hover: ComponetizedCell,
      monitor: DropTargetMonitor,
      component: React.ReactInstance
    ) => {
      // tslint:disable-next-line:no-any
      let drag: any = monitor.getItem();
      if (!drag) {
        // item undefined, happens when throttle triggers after drop
        return;
      }

      if (isNativeHTMLElementDrag(monitor)) {
        drag = createNativeCellReplacement();
      }

      if (drag.id === hover.id) {
        // If hovering over itself, do nothing
        clear(hover, drag.id);
        return;
      } else if (!monitor.isOver({ shallow: true })) {
        // If hovering over ancestor cell, do nothing (we are going to propagate later in the tree anyways)
        return;
      } else if (hover.ancestors.indexOf(drag.id) > -1) {
        // If hovering over a child of itself
        clear(hover, drag.id);
        return;
      } else if (!hover.id) {
        // If hovering over something that isn't a cell or hasn't an id, do nothing. Should be an edge case
        logger.warn('Canceled cell drop, no id given.', hover, drag);
        return;
      }

      last = { hover: hover.id, drag: drag.id };
      const allowInlineNeighbours =
        hover?.node?.content?.plugin?.allowInlineNeighbours ?? false;
      computeAndDispatchHover(
        hover,
        drag,
        monitor,
        component,
        `10x10${allowInlineNeighbours ? '' : '-no-inline'}`
      );
    },
    delay,
    { leading: false }
  ),

  canDrop: (
    { id, ancestors }: ComponetizedCell,
    monitor: DropTargetMonitor
  ) => {
    const item = monitor.getItem();
    return item.id !== id && ancestors.indexOf(item.id) === -1;
  },

  // tslint:disable-next-line:no-any
  drop(hover: ComponetizedCell, monitor: DropTargetMonitor, component: any) {
    let drag: ComponetizedCell = monitor.getItem();

    if (isNativeHTMLElementDrag(monitor)) {
      const { plugins } = component.props.config;
      drag = plugins.createNativePlugin(hover, monitor, component);
    }

    if (monitor.didDrop() || !monitor.isOver({ shallow: true })) {
      // If the item drop occurred deeper down the tree, don't do anything
      return;
    } else if (drag.id === hover.id) {
      // If the item being dropped on itself do nothing
      hover.cancelCellDrag();
      return;
    } else if (hover.ancestors.indexOf(drag.id) > -1) {
      // If hovering over a child of itself, don't propagate further
      hover.cancelCellDrag();
      return;
    }

    last = { hover: hover.id, drag: drag.id };

    const allowInlineNeighbours =
      hover?.node?.content?.plugin?.allowInlineNeighbours ?? false;
    computeAndDispatchInsert(
      hover,
      drag,
      monitor,
      component,
      `10x10${allowInlineNeighbours ? '' : '-no-inline'}`
    );
  },
};

export const connect = (
  connectInner: DropTargetConnector,
  monitor: DropTargetMonitor
) => ({
  connectDropTarget: connectInner.dropTarget(),
  isOver: monitor.isOver(),
  isOverCurrent: monitor.isOver({ shallow: true }),
});
