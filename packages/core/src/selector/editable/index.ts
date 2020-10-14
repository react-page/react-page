import flatten from 'lodash.flatten';
import {
  AbstractEditable,
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
      const found = findNode(node.cells, nodeId, [...ancestors, node]);
      if (found) {
        return {
          node: found.node,
          ancestors,
        };
      }
    } else if (!isRow(node) && node.rows) {
      const found = findNode(node.rows, nodeId, [...ancestors, node]);
      if (found) {
        return {
          node: found.node,
          ancestors,
        };
      }
    }
  }
  return null;
};

export const findNodeInState = (
  state: RootState,
  editableId: string,
  nodeId: string
) => {
  const tree = editable(state, { id: editableId });
  if (!tree) {
    throw new Error(`Could not find editable: ${editableId}`);
  }
  return findNode(tree.cells, nodeId);
};

export const editable = (
  state: RootState,
  { id }: { id: string }
): AbstractEditable<Cell> =>
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
  props: {
    editable: string;
    id: string;
  }
): NodeWithAncestors => {
  const found = findNodeInState(state, props.editable, props.id);

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

export const parentCellSelector = (
  state: RootState,
  props: { id: string; editable: string }
  // FIXME: make this more efficient
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Cell => {
  const tree = editable(state, { id: props.editable });
  return findNearestAnsestorCell(tree.cells, props.id);
};
