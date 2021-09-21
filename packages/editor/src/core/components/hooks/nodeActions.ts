import { useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { createId } from '../../../core/utils/createId';
import { mapNode } from '../../../core/utils/mapNode';
import { blurAllCells } from '../../actions/cell';
import type { FocusMode } from '../../actions/cell/core';
import {
  blurCell,
  focusCell,
  removeCells,
  resizeCell,
  updateCellData,
  updateCellIsDraft,
} from '../../actions/cell/core';
import {
  duplicateCell,
  insertCellAtTheEnd,
  insertCellNewAsNewRow,
} from '../../actions/cell/insert';
import { setDisplayReferenceNodeId } from '../../actions/display';
import { setLang } from '../../actions/setting';
import { useDispatch } from '../../reduxConnect';
import type { CellDrag, Node, PartialCell } from '../../types/node';
import { isRow } from '../../types/node';
import { useAllCellPluginsForNode } from './node';
import { useEditorStore, useLang } from './options';

/**
 * @param id id of a node
 * @returns function, that sets a cell in draft mode (will be invisible in readonly / preview)
 */
export const useSetDraft = (id: string) => {
  const dispatch = useDispatch();
  return useCallback(
    (isDraft: boolean, lang: string) =>
      dispatch(updateCellIsDraft(id, isDraft, lang)),
    [dispatch, id]
  );
};

/**
 * @returns function to resize a cell
 */
export const useResizeCellById = () => {
  const dispatch = useDispatch();
  return useCallback(
    (nodeId: string, size: number) => dispatch(resizeCell(nodeId)(size)),
    [dispatch]
  );
};

/**
 *
 * @param id a cell id
 * @returns a function to resize the given cell
 */
export const useResizeCell = (id: string) => {
  const resizeById = useResizeCellById();
  return useCallback((size: number) => resizeById(id, size), [resizeById, id]);
};
/**
 *
 * @returns a function to change the current language
 */
export const useSetLang = () => {
  const dispatch = useDispatch();
  return useCallback((lang: string) => dispatch(setLang(lang)), [dispatch]);
};

/**
 *
 * @param id a cell id
 * @returns function to update the data of the given cell. Sets the data in the current language, unless options.lang is set
 */
export const useUpdateCellData = (id: string) => {
  const dispatch = useDispatch();
  const currentLang = useLang();
  return useCallback(
    (
      data: void | { [key: string]: unknown },
      options: {
        lang?: string;
        notUndoable?: boolean;
      } = {}
    ) => {
      dispatch(
        updateCellData(id)(data, {
          notUndoable: false,
          lang: currentLang,
          ...options,
        })
      );
    },
    [dispatch, id, currentLang]
  );
};

/**
 * @returns a function to remove a cell by id
 */
export const useRemoveCellById = () => {
  const dispatch = useDispatch();
  return useCallback((id: string) => dispatch(removeCells([id])), [dispatch]);
};
/**
 * @param id a cell id
 * @returns a function to remove the given cell
 */
export const useRemoveCell = (id: string) => {
  const removeById = useRemoveCellById();
  return useCallback(() => removeById(id), [removeById, id]);
};

/**
 *
 * @returns a function to remove muliple nodeids
 */
export const useRemoveMultipleNodeIds = () => {
  const dispatch = useDispatch();
  return useCallback(
    (nodeIds: string[]) => {
      dispatch(removeCells(nodeIds));
    },
    [dispatch]
  );
};

/**
 * @returns a function that duplicates a cell
 */
export const useDuplicateCellById = () => {
  const dispatch = useDispatch();
  const editor = useEditorStore();

  return useCallback(
    (id: string) => dispatch(duplicateCell(editor.getNode(id))),
    [dispatch]
  );
};

/**
 * @returns a function that duplicates multiple cell
 */
export const useDuplicateMultipleCells = () => {
  const dispatch = useDispatch();
  const editor = useEditorStore();

  return useCallback(
    (nodeIds: string[]) => {
      const nodesWithAncestors = nodeIds.map((nodeId) => {
        const { node, ancestors } = editor.getNodeWithAncestors(nodeId) ?? {};
        return { node, ancestors: [...ancestors].reverse() };
      });

      // find common ancestors
      let nearestCommonAncestor: Node;
      let depth = 0;
      let search = true;
      while (search) {
        // check if every node has the same ancestor
        if (
          nodesWithAncestors.every(
            (n) =>
              n.ancestors[depth] &&
              n.ancestors[depth]?.id ===
                nodesWithAncestors[0].ancestors[depth]?.id
          )
        ) {
          nearestCommonAncestor = nodesWithAncestors[0].ancestors[depth];
          depth++;
        } else {
          search = false;
        }
      }

      // remove nodes that we don't want to duplicate unless they have children
      const cleaned = mapNode(nearestCommonAncestor, {
        skipMapCell: (c) => {
          return nodeIds.includes(c.id);
        },
        // remove cells without rows
        mapCell: (c) => {
          if (c.rows?.length > 0) {
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
            rows: c.rows.filter(Boolean) ?? [],
          };
          if (cell.rows?.length > 0 || nodeIds.includes(cell.id)) {
            return cell;
          } else {
            return null;
          }
        },
      });

      const cleanedCell = isRow(cleaned)
        ? {
            id: createId(),
            rows: [cleaned],
          }
        : cleaned;

      const insertAfterNodeId = isRow(cleaned)
        ? cleaned.id
        : cleaned.rows[cleaned.rows.length - 1].id;

      dispatch(
        duplicateCell(cleanedCell, {
          insertAfterNodeId,
        })
      );
    },
    [dispatch]
  );
};

/**
 * @param a cell id
 * @returns a function that duplicates the given cell
 */
export const useDuplicateCell = (id: string) => {
  const duplicate = useDuplicateCellById();

  return useCallback(() => duplicate(id), [duplicate, id]);
};

/**
 * experimental
 * @returns function to set the reference node id. used internally
 */
export const useSetDisplayReferenceNodeId = () => {
  const dispatch = useDispatch();

  return useCallback(
    (nodeId: string) => {
      dispatch(setDisplayReferenceNodeId(nodeId));
    },
    [dispatch]
  );
};

/**
 * @returns a function to focus a cell by id
 */
export const useFocusCellById = () => {
  const dispatch = useDispatch();
  const editor = useEditorStore();

  return useCallback(
    (id: string, scrollToCell?: boolean, mode?: FocusMode) => {
      const parentCellId = editor
        .getNodeWithAncestors(id)
        ?.ancestors?.find((node) => !isRow(node))?.id;

      dispatch(setDisplayReferenceNodeId(parentCellId));
      dispatch(focusCell(id, scrollToCell, mode));
    },
    [dispatch, editor]
  );
};

/**
 * @returns a function to focus a cell by id
 */
export const useFocusCell = (id: string) => {
  const focusCellById = useFocusCellById();

  return useCallback(
    (scrollToCell?: boolean, mode?: FocusMode) =>
      focusCellById(id, scrollToCell, mode),
    [focusCellById]
  );
};
/**
 * @returns function to blur a cell by id
 */
export const useBlurCell = () => {
  const dispatch = useDispatch();

  return useCallback(
    (id: string) => {
      dispatch(blurCell(id));
    },
    [dispatch]
  );
};

/**
 * @returns function to blur all cells
 */
export const useBlurAllCells = () => {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(blurAllCells());
  }, [dispatch]);
};

/**
 * @returns function to insert a cell at the end of the document or the end of the parent cell
 *
 * if the id already exists, it will move that cell
 */
export const useInsertNew = (parentCellId?: string) => {
  const dispatch = useDispatch();
  const cellPlugins = useAllCellPluginsForNode(parentCellId);
  const editor = useEditorStore();
  const lang = useLang();
  return useCallback(
    (partialCell: PartialCell) => {
      const action = parentCellId ? insertCellNewAsNewRow : insertCellAtTheEnd;

      dispatch(
        action({
          cellPlugins,
          lang,
        })(partialCell, { id: parentCellId }, { focusAfter: true })
      );
    },
    [dispatch, editor, cellPlugins, parentCellId]
  );
};

/**
 * used for the trash target
 */
export const useTrashDrop = () => {
  const removeCell = useRemoveCellById();
  return useDrop<
    CellDrag,
    void,
    {
      isHovering: boolean;
    }
  >({
    accept: 'cell',
    collect: (monitor) => ({
      isHovering: monitor.isOver({ shallow: true }),
    }),
    drop: (item, monitor) => removeCell(item.cell.id),
  });
};
