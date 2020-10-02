import { useDispatch } from '../../reduxConnect';
import { undo, redo } from '../../actions/undo';
import { useCallback, useContext, createContext } from 'react';
import { duplicateCell, insertCellAtTheEnd } from '../../actions/cell/insert';

import { isEditMode, isInsertMode, isLayoutMode } from '../../selector/display';
import { useSelector } from '../../reduxConnect';

import { node, parentCellSelector } from '../../selector/editable';
import { RootState, Selectors } from '../../selector';

import Editor, { EditorContext } from '../../Editor';

import {
  updateCellIsDraft,
  focusCell,
  updateCellContent,
  updateCellLayout,
  removeCell,
} from '../../actions/cell/core';
import { setLang } from '../../actions/setting';
import { Cell, Row } from '../../types/editable';

export const EditableContext = createContext<string>(null);

export const useEditableId = () => useContext(EditableContext);

export const useEditor = () => useContext<Editor>(EditorContext);

export const useNode = (id: string) => {
  const editableId = useEditableId();
  return useSelector((state: RootState) =>
    node(state, { id, editable: editableId })
  );
};

const isCell = (node: Cell | Row): node is Cell => {
  return Boolean((node as Cell)?.content || (node as Cell)?.layout);
};
export const useCell = (id: string) => {
  const node = useNode(id);
  if (isCell(node)) {
    return node;
  }
  return null;
};

export const useParentCell = (id: string) => {
  const editableId = useEditableId();
  return useSelector((state: RootState) =>
    parentCellSelector(state, { id, editable: editableId })
  );
};

export const useIsEditMode = () => {
  return useSelector(isEditMode);
};

export const useIsInsertMode = () => {
  return useSelector(isInsertMode);
};

export const useIsLayoutMode = () => {
  return useSelector(isLayoutMode);
};
export const useLang = () => {
  return useSelector(Selectors.Setting.getLang);
};

// actions

export const useUndo = () => {
  const dispatch = useDispatch();
  return useCallback(() => dispatch(undo()), [dispatch]);
};

export const useRedo = () => {
  const dispatch = useDispatch();
  return useCallback(() => dispatch(redo()), [dispatch]);
};

export const useSetDraft = () => {
  const dispatch = useDispatch();
  return useCallback(
    (id: string, isDraft: boolean, lang: string) =>
      dispatch(updateCellIsDraft(id, isDraft, lang)),
    [dispatch]
  );
};

export const useSetLang = () => {
  const dispatch = useDispatch();
  return useCallback((lang: string) => dispatch(setLang(lang)), [dispatch]);
};

export const useUpdateCellContent = () => {
  const dispatch = useDispatch();
  return useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (id: string, state: any, lang?: string) =>
      dispatch(updateCellContent(id)(state, lang)),
    [dispatch]
  );
};

export const useUpdateCellLayout = () => {
  const dispatch = useDispatch();
  return useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (id: string, state: any, lang?: string) =>
      dispatch(updateCellLayout(id)(state, lang)),
    [dispatch]
  );
};

export const useRemoveCell = () => {
  const dispatch = useDispatch();
  return useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (id: string) => dispatch(removeCell(id)),
    [dispatch]
  );
};
export const useDuplicateCell = () => {
  const dispatch = useDispatch();
  const editor = useEditor();
  const editableId = useEditableId();

  return useCallback(
    (nodeId: string) =>
      dispatch(duplicateCell(editor.getNode(editableId, nodeId))),
    [dispatch, editableId]
  );
};

export const useFocusCell = () => {
  const dispatch = useDispatch();

  return useCallback(
    (id: string, scrollToCell?: boolean) => {
      dispatch(focusCell(id, scrollToCell)());
    },
    [dispatch]
  );
};

export const useInsertCellAtTheEnd = () => {
  const dispatch = useDispatch();

  return useCallback(
    (node: Partial<Cell>) => {
      dispatch(insertCellAtTheEnd(node, {}));
    },
    [dispatch]
  );
};
