import { Node, isRow } from '../../../types/node';

export const isEmpty = (node: Node): boolean => {
  if (!node) {
    return true;
  }
  if (isRow(node)) {
    return node.cells.length === 0;
  }
  if (node.rows?.length > 0) {
    return false;
  }
  return !node.plugin;
};
