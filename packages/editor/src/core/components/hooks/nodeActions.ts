import { useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { getCommonAncestorTree } from '../../utils/ancestorTree';
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
  duplicateNode,
  insertCellAtTheEnd,
  insertCellNewAsNewRow,
} from '../../actions/cell/insert';
import { setDisplayReferenceNodeId } from '../../actions/display';
import { setLang } from '../../actions/setting';
import { useDispatch } from '../../reduxConnect';
import type { CellDrag, PartialCell, Node } from '../../types/node';
import { isRow } from '../../types/node';
import { useAllCellPluginsForNode } from './node';
import { useEditorStore, useLang } from './options';
import { cloneWithNewIds } from '../../../core/utils/cloneWithNewIds';
import { useDisplayModeReferenceNodeId } from './displayMode';
import type { CellPluginOnChangeOptions } from '../../types';

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
      data: null | { [key: string]: unknown },
      options: CellPluginOnChangeOptions = {}
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
  return useCallback(
    (id?: string) => dispatch(removeCells(id ? [id] : [])),
    [dispatch]
  );
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
    (id: string) => {
      const node = editor && editor.getNode(id);
      if (node) dispatch(duplicateCell(node));
    },
    [editor, dispatch]
  );
};

export const useInsertAfter = () => {
  const dispatch = useDispatch();
  const insertNew = useInsertNew();

  return useCallback(
    (node: Node, insertAfterNodeId?: string | null) => {
      if (insertAfterNodeId) {
        dispatch(
          duplicateNode(node, {
            insertAfterNodeId,
          })
        );
      } else {
        // insert at the end
        insertNew(cloneWithNewIds(node));
      }
    },
    [dispatch, insertNew]
  );
};

/**
 * @returns a function that duplicates multiple cell
 */
export const useDuplicateMultipleCells = () => {
  const editor = useEditorStore();
  const insertAfter = useInsertAfter();

  return useCallback(
    (cellIds: string[]) => {
      const node = editor && getCommonAncestorTree(editor, cellIds);
      if (!node) {
        return;
      }
      const insertAfterNodeId = isRow(node)
        ? node.id
        : node?.rows?.[node?.rows?.length ?? 0 - 1]?.id;

      insertAfter(node, insertAfterNodeId);
    },
    [editor, insertAfter]
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
  const referenceId = useDisplayModeReferenceNodeId();

  return useCallback(
    (nodeId?: string | null) => {
      if (nodeId !== referenceId) dispatch(setDisplayReferenceNodeId(nodeId));
    },
    [dispatch, referenceId]
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
      if (!editor) {
        return;
      }
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
export const useFocusCell = (id?: string | null) => {
  const focusCellById = useFocusCellById();

  return useCallback(
    (scrollToCell?: boolean, mode?: FocusMode) => {
      if (id) {
        focusCellById(id, scrollToCell, mode);
      }
    },
    [focusCellById, id]
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
    drop: (item, monitor) => {
      if (item.cell) {
        removeCell(item.cell.id);
      }
    },
  });
};
