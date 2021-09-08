import type { Cell, Node, PartialCell } from '../types';
import { isRow } from '../types';
import { createId } from './createId';
import { mapNode } from './mapNode';

export const cloneWithNewIds = (node: Node) => {
  return mapNode(node, {
    mapCell: (n) => ({
      ...n,
      // clone data as well
      dataI18n: n?.dataI18n ? JSON.parse(JSON.stringify(n.dataI18n)) : {},
      id: createId(),
    }),
    mapRow: (n) => ({
      ...n,
      id: createId(),
    }),
  });
};

export const cloneAsCell = (node: Node): Cell => {
  const cell = isRow(node)
    ? {
        id: createId(),
        rows: [node],
      }
    : node;
  return cloneWithNewIds(cell);
};
