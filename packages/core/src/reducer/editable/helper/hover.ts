import { CellHoverAction } from './../../../actions/cell/drag';
import { EditorState } from '../../../types/editor';
import { InsertAction } from '../../../actions/cell';

/**
 * Check if this item is currently being hovered.
 */
export const isHoveringThis = (
  state: EditorState = {},
  action: CellHoverAction | InsertAction
): boolean => {
  const { level = 0, hoverId = null } = action;
  const children = state.rows || state.cells || [];
  if (level > 0) {
    return Boolean(
      children.find((child) =>
        isHoveringThis(child, { ...action, level: level - 1 })
      )
    );
  }

  return hoverId === state.id;
};
