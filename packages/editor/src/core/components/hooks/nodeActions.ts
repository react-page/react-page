import { useCallback } from 'react';
import { blurAllCells } from '../../actions/cell';
import {
  blurCell,
  focusCell,
  removeCell,
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
import type { CellDrag, PartialCell } from '../../types/node';
import { isRow } from '../../types/node';
import { useEditorStore, useLang } from './options';
import { useDrop } from 'react-dnd';
import { useAllCellPluginsForNode, useParentCellId } from './node';
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
  return useCallback((id: string) => dispatch(removeCell(id)), [dispatch]);
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
 * @param a cell id
 * @returns a function that duplicates the given cell
 */
export const useDuplicateCell = (id: string) => {
  const dispatch = useDispatch();
  const editor = useEditorStore();
  const parentCellId = useParentCellId(id);
  const lang = useLang();
  const cellPlugins = useAllCellPluginsForNode(parentCellId);

  return useCallback(
    () =>
      dispatch(
        duplicateCell({ cellPlugins, lang, focusAfter: true })(
          editor.getNode(id)
        )
      ),
    [dispatch, cellPlugins, lang, id]
  );
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
    (id: string, scrollToCell?: boolean, source?: string) => {
      const parentCellId = editor
        .getNodeWithAncestors(id)
        ?.ancestors?.find((node) => !isRow(node))?.id;

      dispatch(setDisplayReferenceNodeId(parentCellId));
      dispatch(focusCell(id, scrollToCell, source));
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
    (scrollToCell?: boolean, source?: string) =>
      focusCellById(id, scrollToCell, source),
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
        })(partialCell, { id: parentCellId })
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
