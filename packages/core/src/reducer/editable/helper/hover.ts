import { CellHoverAction } from '../../../actions/cell/drag';
import { InsertAction } from '../../../actions/cell/insert';
import { Cell, Row, Node } from '../../../types/editable';

/**
 * Check if this item is currently being hovered.
 */
export const isHoveringThis = (
  node: Node,
  action: CellHoverAction | InsertAction
): boolean => {
  const { level = 0, hoverId = null } = action;
  const children: Node[] = (node as Cell).rows || (node as Row).cells || [];
  if (level > 0) {
    return Boolean(
      children.find((child) =>
        isHoveringThis(child, { ...action, level: level - 1 })
      )
    );
  }

  return hoverId === node.id;
};
