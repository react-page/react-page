import { Value, Node, NodeWithAncestors, isRow } from '../../types/editable';
import type { RootState } from '../../types/state';

/** */
const findNode = (
  nodes: Node[],
  nodeId: string,
  ancestors: Node[] = []
): NodeWithAncestors => {
  for (const node of nodes) {
    if (node.id === nodeId) {
      return {
        node,
        ancestors,
      };
    }
    // else search children
    if (isRow(node) && node.cells) {
      const found = findNode(node.cells, nodeId, [node, ...ancestors]);
      if (found) {
        return found;
      }
    } else if (!isRow(node) && node.rows) {
      const found = findNode(node.rows, nodeId, [node, ...ancestors]);
      if (found) {
        return found;
      }
    }
  }
  return null;
};

/*
let sum = 0;
let missum = 0;
const end = (start, hit) => {
  const now = performance.now();
  const diff = now - start;
  sum += diff;
  if (!hit) missum++;
  console.log('time', hit ? '!' : '?', missum, diff, sum);
};
*/
export const findNodeInState = (state: RootState, nodeId: string) => {
  // const now = performance.now();
  // POOR mans node cache
  // it gets removed every reduce, so we don't have to clear it manually
  if (!state.reactPage.__nodeCache) {
    state.reactPage.__nodeCache = {};
  }
  if (state.reactPage.__nodeCache[nodeId]) {
    //end(now, true);
    return state.reactPage.__nodeCache[nodeId];
  }
  // FIXME: we will deprecated having multiple editables soon
  const result = findNode(
    state.reactPage.editables?.present?.reduce(
      (acc, editable) => [...acc, ...(editable.rows ?? [])],
      []
    ),
    nodeId
  );
  state.reactPage.__nodeCache[nodeId] = result;
  //end(now, false);
  return result;
};

export const editable = (state: RootState, { id }: { id: string }): Value =>
  state &&
  state.reactPage &&
  state.reactPage.editables &&
  state.reactPage.editables.present.find(
    ({ id: current }: Value = {} as Value) => current === id
  );

export const editables = ({
  reactPage: {
    editables: { present },
  },
}: RootState) => present;

export type NodeProps = { id: string; editable: string };

export const selectNode = (
  state: RootState,
  nodeId: string
): NodeWithAncestors => {
  const found = findNodeInState(state, nodeId);

  return found;
};
