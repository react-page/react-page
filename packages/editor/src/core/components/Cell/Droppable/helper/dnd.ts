import throttle from 'lodash.throttle';
import type { DropTargetMonitor } from 'react-dnd';
import { delay } from '../../../../helper/throttle';
import type { HoverTarget } from '../../../../service/hover/computeHover';
import {
  computeAndDispatchHover,
  computeAndDispatchInsert,
} from '../../../../service/hover/input';
import logger from '../../../../service/logger';
import type {
  CellDrag,
  HoverInsertActions,
  CellPluginList,
} from '../../../../types';

let last: { hoverId?: string; dragId?: string } = { hoverId: '', dragId: '' };

const shouldClear = (
  hoverId: string | undefined,
  dragId: string | undefined
) => {
  if (hoverId === last.hoverId && dragId === last.dragId) {
    return false;
  }
  last = { hoverId, dragId };
  return true;
};

export const onHover = throttle(
  (
    target: HoverTarget,
    monitor: DropTargetMonitor,
    element: HTMLElement,
    actions: HoverInsertActions,
    cellPlugins: CellPluginList
  ) => {
    const drag: CellDrag = monitor.getItem();
    if (!drag?.cell || !target) {
      // item undefined, happens when throttle triggers after drop
      return;
    }

    if (drag.cell.id === target.id) {
      // If hovering over itself, do nothing
      if (shouldClear(target.id, drag.cell.id)) {
        actions.clear();
      }
      return;
    } else if (!monitor.isOver({ shallow: true })) {
      // If hovering over ancestor cell, do nothing (we are going to propagate later in the tree anyways)
      return;
    } else if (drag.cell.id && target.ancestorIds?.includes(drag.cell.id)) {
      if (shouldClear(target.id, drag.cell.id)) {
        actions.clear();
      }
      return;
    } else if (!target.id) {
      // If hovering over something that isn't a cell or hasn't an id, do nothing. Should be an edge case
      logger.warn('Canceled cell drop, no id given.', target, drag);
      return;
    }

    last = { hoverId: target.id, dragId: drag.cell.id };

    computeAndDispatchHover(
      target,
      drag.cell,
      monitor,
      element,
      actions,
      cellPlugins
    );
  },
  delay,
  { leading: false }
);

export const onDrop = (
  target: HoverTarget,
  monitor: DropTargetMonitor,
  element: HTMLElement,
  actions: HoverInsertActions,
  cellPlugins: CellPluginList
) => {
  const drag: CellDrag = monitor.getItem();
  if (!drag.cell) return;
  if (monitor.didDrop() || !monitor.isOver({ shallow: true }) || !target) {
    // If the item drop occurred deeper down the tree, don't do anything
    return;
  } else if (drag.cell.id === target.id) {
    // If the item being dropped on itself do nothing
    actions.cancelCellDrag();
    return;
  } else if (
    target &&
    drag.cell.id &&
    target.ancestorIds?.includes(drag.cell.id)
  ) {
    // If hovering over a child of itself, don't propagate further
    actions.cancelCellDrag();
    return;
  }

  last = { hoverId: target.id, dragId: drag.cell.id };

  computeAndDispatchInsert(
    target,
    drag.cell,
    monitor,
    element,
    actions,
    cellPlugins
  );
};
