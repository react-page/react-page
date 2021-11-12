import type { Node, Row } from '../../../types';
import { isRow } from '../../../types';

type Direction = 'previous' | 'next';
/**
 *
 * @param nodeId a cell or row
 * @param ancestors the ancestors of the node
 *
 * @returns the previous row if any or null
 */

export const findSiblingRow = (
  nodeId: string,
  ancestors: Node[],
  direction: Direction
): Row | null => {
  const step = direction === 'previous' ? -1 : 1;
  const [parent, ...olderAncestors] = ancestors;

  if (!parent) return null;
  const greatParent = olderAncestors[0];
  if (isRow(parent)) {
    if (greatParent && !isRow(greatParent) && greatParent.rows) {
      const parentIndex = greatParent.rows.findIndex((r) => r.id === parent.id);
      const siblingRow = greatParent.rows[parentIndex + step];
      if (siblingRow) {
        return findInnerRow(siblingRow, direction);
      }
    }
  } else {
    if (!parent.rows) {
      return null;
    }
    // so parent is a cell, so i am a row, previous row is therefor
    const myIndex = parent.rows.findIndex((r) => r.id === nodeId);
    const siblingRow = parent.rows[myIndex + step];
    if (siblingRow) {
      return findInnerRow(siblingRow, direction);
    }
  }
  // nothing found, go one level deeper
  return findSiblingRow(parent.id, olderAncestors, direction);
};

const findInnerRow = (node: Node, direction: Direction): Row | null => {
  let found: Row | null = null;
  if (isRow(node)) {
    const cells =
      direction === 'previous' ? [...node.cells].reverse() : node.cells;
    for (const cell of cells) {
      found = findInnerRow(cell, direction);
      if (found) {
        break;
      }
    }
    if (!found) {
      found = node;
    }
  } else {
    if (node.rows) {
      const rows =
        direction === 'previous' ? [...node.rows].reverse() : node.rows;
      for (const row of rows) {
        found = findInnerRow(row, direction);
        if (found) {
          break;
        }
      }
    }
  }
  return found;
};
