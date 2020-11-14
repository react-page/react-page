import { isRow, Node } from '../types/editable';

const getMyPositionInParent = (node: Node, parent: Node): [number, number] => {
  const siblings: Node[] = (isRow(parent) ? parent.cells : parent.rows) ?? [];
  const index = siblings.findIndex((c) => c.id === node.id);
  return [index, siblings.length];
};

const left = (node: Node, ancestors: Node[]) => {
  const [parent, ...greatParents] = ancestors;
  if (!parent) return 0;
  if (isRow(node)) {
    return left(parent, greatParents) + 1;
  } else {
    const [index] = getMyPositionInParent(node, parent);
    if (index === 0) {
      return left(parent, greatParents) + 1;
    } else {
      return 0;
    }
  }
};

const right = (node: Node, ancestors: Node[]) => {
  const [parent, ...greatParents] = ancestors;
  if (!parent) return 0;
  if (isRow(node)) {
    return right(parent, greatParents) + 1;
  } else {
    const [index, numberOfSiblings] = getMyPositionInParent(node, parent);
    if (index === numberOfSiblings - 1) {
      return right(parent, greatParents) + 1;
    } else {
      return 0;
    }
  }
};

const above = (node: Node, ancestors: Node[]) => {
  const [parent, ...greatParents] = ancestors;
  if (!parent) return 0;
  if (!isRow(node)) {
    return above(parent, greatParents) + 1;
  } else {
    const [index] = getMyPositionInParent(node, parent);
    if (index === 0) {
      return above(parent, greatParents) + 1;
    } else {
      return 0;
    }
  }
};

const below = (node: Node, ancestors: Node[]) => {
  const [parent, ...greatParents] = ancestors;
  if (!parent) return 0;
  if (!isRow(node)) {
    return below(parent, greatParents) + 1;
  } else {
    const [index, numberOfSiblings] = getMyPositionInParent(node, parent);
    if (index === numberOfSiblings - 1) {
      return below(parent, greatParents) + 1;
    } else {
      return 0;
    }
  }
};

export const getDropLevels = (node: Node, ancestors: Node[]) => ({
  left: left(node, ancestors),
  right: right(node, ancestors),
  above: above(node, ancestors),
  below: below(node, ancestors),
});
