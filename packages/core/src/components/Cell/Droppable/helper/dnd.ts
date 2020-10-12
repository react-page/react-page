import throttle from 'lodash.throttle';
import type { DropTargetMonitor } from 'react-dnd';
import { delay } from '../../../../helper/throttle';
import {
  computeAndDispatchHover,
  computeAndDispatchInsert,
} from '../../../../service/hover/input';
import logger from '../../../../service/logger';
import {
  CellDrag,
  CellWithAncestors,
  isRow,
  RowWithAncestors,
} from '../../../../types/editable';
import { Callbacks } from '../../../../types/hover';

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
    target: CellWithAncestors | RowWithAncestors,
    monitor: DropTargetMonitor,
    element: HTMLElement,
    actions: Callbacks
  ) => {
    const drag: CellDrag = monitor.getItem();
    if (!drag) {
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
    } else if (target.ancestors.some((a) => a.id === drag.cell.id)) {
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
      (!isRow(target) && target?.content?.plugin?.allowInlineNeighbours) ??
      false;
    computeAndDispatchHover(
      target,
      drag.cell,
      monitor,
      element,
      actions,
      `10x10${allowInlineNeighbours ? '' : '-no-inline'}`
    );
  },
  delay,
  { leading: false }
);

export const onDrop = (
  targetCell: CellWithAncestors | RowWithAncestors,
  monitor: DropTargetMonitor,
  element: HTMLElement,
  actions: Callbacks
) => {
  const drag: CellDrag = monitor.getItem();
  //  console.log('on drop', targetCell, monitor);

  if (monitor.didDrop() || !monitor.isOver({ shallow: true })) {
    // If the item drop occurred deeper down the tree, don't do anything
    return;
  } else if (drag.cell.id === targetCell.id) {
    // If the item being dropped on itself do nothing
    actions.cancelCellDrag();
    return;
  } else if (targetCell.ancestors.some((a) => a.id === drag.cell.id)) {
    // If hovering over a child of itself, don't propagate further
    actions.cancelCellDrag();
    return;
  }

  last = { hoverId: targetCell.id, dragId: drag.cell.id };

  const allowInlineNeighbours =
    (!isRow(targetCell) &&
      targetCell?.content?.plugin?.allowInlineNeighbours) ??
    false;
  computeAndDispatchInsert(
    targetCell,
    drag.cell,
    monitor,
    element,
    actions,
    `10x10${allowInlineNeighbours ? '' : '-no-inline'}`
  );
};
