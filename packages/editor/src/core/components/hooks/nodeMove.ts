import { useMemo } from 'react';
import type { Cell, HoverInsertActions, Node, Row } from '../../../core/types';
import { isRow } from '../../../core/types';
import { useIsEditMode } from './displayMode';
import { useDropActions } from './dragDropActions';
import { useNodeAsHoverTarget, useNodeProps } from './node';

import { findSiblingRow } from './utils/findSiblingRow';

type ActionDef = {
  node: Node | null;
  action: keyof Pick<
    HoverInsertActions,
    'above' | 'below' | 'leftOf' | 'rightOf'
  >;
  targetNodeId?: string | null;
};

type Selector = (node: Node | null, ancestors: Node[]) => ActionDef;

export const getTargetIndexForUpAndDownMove = (
  currentRowLength: number,
  targetRowLength: number,
  myIndex = 0
): {
  index: number;
  action: 'leftOf' | 'rightOf';
} => {
  const factor = (targetRowLength + 1) / currentRowLength;
  const target = myIndex * factor;
  const wasLast = myIndex === currentRowLength - 1;
  const index = wasLast
    ? targetRowLength - 1
    : Math.min(Math.floor(target), targetRowLength - 1);

  return {
    action: wasLast || target - index > 0.5 ? 'rightOf' : 'leftOf',
    index,
  };
};
const useMoveCellAction = (nodeId: string, selector: Selector) => {
  const actions = useDropActions(nodeId);
  const {
    node,
    targetNodeId = null,
    action,
  } = useNodeProps<ActionDef>(nodeId, selector);

  const isEditMode = useIsEditMode();

  const hoverTarget = useNodeAsHoverTarget(targetNodeId);

  return useMemo(() => {
    // skip if no target
    if (!hoverTarget || !node) {
      return null;
    }
    return () => {
      actions[action](node, hoverTarget, { focusAfter: isEditMode });
    };
  }, [isEditMode, actions, hoverTarget, node]);
};

export const useMoveNodeUp = (nodeId: string) => {
  return useMoveCellAction(nodeId, (node, ancestors) => {
    // if node is not the only sibling in the row, put it above the row to stretch it
    const rowWithMoreThanOneCell = searchAncestorRows(
      ancestors,
      (row) => {
        if (row?.cells.length > 1) {
          return row;
        }
        return null;
      },
      // breakIf
      // break if a parent row is not the first row of a cell, because then we would "jump" a parent
      (row, parentOfRow) => {
        return (
          (row &&
            parentOfRow &&
            parentOfRow?.rows?.findIndex((r) => r.id === row.id) !== 0) ??
          false
        );
      }
    );

    if (rowWithMoreThanOneCell) {
      return {
        action: 'above',
        node,
        targetNodeId: rowWithMoreThanOneCell?.id,
      };
    }
    const parent = isRow(ancestors?.[0]) ? ancestors?.[0] : null;

    // else move it into previous row as sibling
    const myIndexInParent = parent?.cells.findIndex((c) => c.id === nodeId);
    const previousRow = findSiblingRow(nodeId, ancestors, 'previous');
    const previousRowCells = previousRow?.cells;
    const { index, action } = getTargetIndexForUpAndDownMove(
      parent?.cells?.length ?? 0,
      previousRowCells?.length ?? 0,
      myIndexInParent
    );
    return {
      action,
      node,
      targetNodeId: previousRowCells?.[index]?.id,
    };
  });
};

export const useMoveNodeDown = (nodeId: string) => {
  return useMoveCellAction(nodeId, (node, ancestors) => {
    // if node is not the only sibling in the row, put it below the row to stretch it
    const rowWithMoreThanOneCell = searchAncestorRows(
      ancestors,
      (row) => {
        if (row?.cells.length > 1) {
          return row;
        }
        return null;
      },
      // breakIf
      // break if a parent row is not the last row of a cell, because then we would "jump" a parent
      (row, parentOfRow) => {
        return (
          (row &&
            parentOfRow &&
            parentOfRow?.rows?.findIndex((r) => r.id === row.id) !==
              (parentOfRow.rows?.length ?? 0) - 1) ??
          false
        );
      }
    );

    if (rowWithMoreThanOneCell) {
      return {
        action: 'below',
        node,
        targetNodeId: rowWithMoreThanOneCell?.id,
      };
    }
    // else move it into next row as sibling
    const parent = isRow(ancestors?.[0]) ? ancestors?.[0] : null;
    const nextRow = findSiblingRow(nodeId, ancestors, 'next');
    const myIndexInParent =
      parent?.cells.findIndex((c) => c.id === nodeId) ?? 0;
    const nextRowCells = nextRow?.cells;

    const { index, action } = getTargetIndexForUpAndDownMove(
      parent?.cells?.length ?? 0,
      nextRowCells?.length ?? 0,
      myIndexInParent
    );
    return {
      action,
      node,
      targetNodeId: nextRowCells?.[index]?.id,
    };
  });
};

const searchAncestorRows = (
  ancestors: Node[],
  find: (row: Row, parentOfRow: Cell | null) => Node | null,
  breakIf?: (row: Row | null, parentOfRow: Cell | null) => boolean
): Node | null => {
  for (let i = 0; i < ancestors.length; i++) {
    const parent = ancestors[i];
    const greatParent = ancestors[i + 1];
    const parentRow = isRow(parent) ? parent : null;
    const greatParentCell =
      greatParent && isRow(greatParent) ? null : greatParent;

    if (parentRow) {
      const found = find(parentRow, greatParentCell);
      if (found) return found;
    }
    if (breakIf && breakIf(parentRow, greatParentCell)) {
      return null;
    }
  }
  return null;
};

export const useMoveNodeLeft = (nodeId: string) => {
  return useMoveCellAction(nodeId, (node, ancestors) => {
    const previousSibling = searchAncestorRows(ancestors, (row) => {
      const myIndexInParent = row?.cells.findIndex((c) => c.id === nodeId);
      return row?.cells[myIndexInParent - 1];
    });

    return {
      action: 'leftOf',
      node,
      targetNodeId: previousSibling?.id,
    };
  });
};

export const useMoveNodeRight = (nodeId: string) => {
  return useMoveCellAction(nodeId, (node, ancestors) => {
    const nextSibling = searchAncestorRows(ancestors, (row) => {
      const myIndexInParent = row?.cells.findIndex((c) => c.id === nodeId);
      return row?.cells[myIndexInParent + 1];
    });
    return {
      action: 'rightOf',
      node,
      targetNodeId: nextSibling?.id,
    };
  });
};
