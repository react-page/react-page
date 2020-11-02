import throttle from 'lodash.throttle';
import type { DropTargetMonitor } from 'react-dnd';
import { delay } from '../../../../helper/throttle';
import { HoverTarget } from '../../../../service/hover/computeHover';
import {
  computeAndDispatchHover,
  computeAndDispatchInsert,
} from '../../../../service/hover/input';
import logger from '../../../../service/logger';
import { CellDrag, Options } from '../../../../types/editable';
import { HoverInsertActions } from '../../../../types/hover';

let last: { hoverId: string; dragId: string } = { hoverId: '', dragId: '' };

const shouldClear = (hoverId: string, dragId: string) => {
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
    options: Options
  ) => {
    const drag: CellDrag = monitor.getItem();
    if (!drag || !target) {
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
    } else if (target.ancestorIds.includes(drag.cell.id)) {
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
    const allowInlineNeighbours =
      options.plugins.find((p) => p.id === target.pluginId)
        ?.allowInlineNeighbours ?? false;

    computeAndDispatchHover(
      target,
      drag.cell,
      monitor,
      element,
      actions,
      options,
      `10x10${allowInlineNeighbours ? '' : '-no-inline'}`
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
  options: Options
) => {
  const drag: CellDrag = monitor.getItem();

  if (monitor.didDrop() || !monitor.isOver({ shallow: true }) || !target) {
    // If the item drop occurred deeper down the tree, don't do anything
    return;
  } else if (drag.cell.id === target.id) {
    // If the item being dropped on itself do nothing
    actions.cancelCellDrag();
    return;
  } else if (target.ancestorIds.includes(drag.cell.id)) {
    // If hovering over a child of itself, don't propagate further
    actions.cancelCellDrag();
    return;
  }

  last = { hoverId: target.id, dragId: drag.cell.id };

  const allowInlineNeighbours =
    options.plugins.find((p) => p.id === target.pluginId)
      ?.allowInlineNeighbours ?? false;
  computeAndDispatchInsert(
    target,
    drag.cell,
    monitor,
    element,
    actions,
    options,
    `10x10${allowInlineNeighbours ? '' : '-no-inline'}`
  );
};
