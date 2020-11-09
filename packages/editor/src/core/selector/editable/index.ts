import flatten from 'lodash.flatten';
import {
  Cell,
  EditableType,
  Node,
  isRow,
  NodeWithAncestors,
} from '../../types/editable';
import { RootState } from '../../types/state';

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

export const findNodeInState = (
  state: RootState,

  nodeId: string
) => {
  // FIXME: we will deprecated having multiple editables soon
  return findNode(
    state.reactPage.editables?.present?.reduce(
      (acc, editable) => [...acc, ...(editable.rows ?? [])],
      []
    ),
    nodeId
  );
};

export const editable = (
  state: RootState,
  { id }: { id: string }
): EditableType =>
  state &&
  state.reactPage &&
  state.reactPage.editables &&
  state.reactPage.editables.present.find(
    ({ id: current }: EditableType = {} as EditableType) => current === id
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

const findNearestAnsestorCell = (cells: Cell[], childId: string): Cell => {
  const found = cells.find((c) =>
    c.rows.some(
      (row) =>
        row.id === childId || row.cells.some((cell) => cell.id === childId)
    )
  );
  if (found) {
    return found;
  } else {
    // none of cells was an ancestor, go one level down
    return findNearestAnsestorCell(
      flatten(cells.map((c) => flatten(c.rows.map((c) => c.cells)))),
      childId
    );
  }
};
