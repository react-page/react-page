import type EditorStore from '../EditorStore';
import type { Node } from '../types';
import { mapNode } from './mapNode';

/**
 * get a node with children that only contains certain cells
 * this is usefull to duplicate or clone multiple cells
 * @param editor: the editor store
 * @param cellIds
 */
export const getCommonAncestorTree = (
  editor: EditorStore,
  cellIds: string[]
): Node | null => {
  const nodesWithAncestors = cellIds.map((nodeId) => {
    const { node, ancestors } = editor.getNodeWithAncestors(nodeId) ?? {
      ancestors: [],
    };
    return { node, ancestors: [...ancestors].reverse() };
  });

  // find common ancestors
  let nearestCommonAncestor: Node | null = null;
  let depth = 0;
  let search = true;
  while (search) {
    // check if every node has the same ancestor
    if (
      nodesWithAncestors.every(
        (n) =>
          n.ancestors[depth] &&
          n.ancestors[depth]?.id === nodesWithAncestors[0].ancestors[depth]?.id
      )
    ) {
      nearestCommonAncestor = nodesWithAncestors[0].ancestors[depth];
      depth++;
    } else {
      search = false;
    }
  }

  // remove nodes that we don't want to duplicate unless they have children
  const cleaned = mapNode(nearestCommonAncestor as Node, {
    skipMapCell: (c) => {
      return cellIds.includes(c.id);
    },
    // remove cells without rows
    mapCell: (c) => {
      if (c.rows?.length) {
        return c;
      } else {
        return null;
      }
    },
    // remove empty cells from rows and remove row completly if its empty
    mapRowDown: (r) => {
      if (!r) return null;
      const row = {
        ...r,
        cells: r.cells.filter(Boolean) ?? [],
      };
      if (row.cells.length === 0) {
        return null;
      }
      return row;
    },
    // remove empty rows of cells
    mapCellDown: (c) => {
      if (!c) return null;
      const cell = {
        ...c,
        rows: c?.rows?.filter(Boolean) ?? [],
      };
      if (cell.rows?.length > 0 || cellIds.includes(cell.id)) {
        return cell;
      } else {
        return null;
      }
    },
  });
  return cleaned;
};
