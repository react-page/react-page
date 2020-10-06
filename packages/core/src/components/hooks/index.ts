import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import {
  blurAllCells,
  cancelCellDrag,
  cellHoverAbove,
  cellHoverBelow,
  cellHoverInlineLeft,
  cellHoverInlineRight,
  cellHoverLeftOf,
  cellHoverRightOf,
  clearHover,
  dragCell,
} from '../../actions/cell';
import {
  blurCell,
  focusCell,
  removeCell,
  resizeCell,
  updateCellContent,
  updateCellIsDraft,
  updateCellLayout,
} from '../../actions/cell/core';
import {
  duplicateCell,
  insertCellAbove,
  insertCellAtTheEnd,
  insertCellBelow,
  insertCellLeftInline,
  insertCellLeftOf,
  insertCellRightInline,
  insertCellRightOf,
} from '../../actions/cell/insert';
import {
  DisplayModes,
  DISPLAY_MODE_EDIT,
  DISPLAY_MODE_INSERT,
  DISPLAY_MODE_LAYOUT,
  DISPLAY_MODE_PREVIEW,
  DISPLAY_MODE_RESIZING,
  setMode,
} from '../../actions/display';
import { setLang } from '../../actions/setting';
import { redo, undo } from '../../actions/undo';
import Editor, { EditorContext } from '../../Editor';
import { useDispatch, useSelector } from '../../reduxConnect';
import { RootState, Selectors } from '../../selector';
import {
  isEditMode,
  isInsertMode,
  isLayoutMode,
  isPreviewMode,
  isResizeMode,
} from '../../selector/display';
import { editable, selectNode } from '../../selector/editable';
import { focus } from '../../selector/focus';
import { Cell, isRow, SimplifiedModesProps } from '../../types/editable';
import { Callbacks } from '../../types/hover';
import deepEquals from '../../utils/deepEquals';
import { getI18nState } from '../Cell/Content';

export const EditableContext = createContext<string>(null);
export const OptionsContext = createContext<SimplifiedModesProps>({
  allowMoveInEditMode: true,
  allowResizeInEditMode: true,
});

export const useFocusedNodeId = () => {
  return useSelector((state: RootState) => focus(state)?.nodeId);
};
export const useIsFocused = (id: string) => {
  return useSelector((state: RootState) => focus(state)?.nodeId === id);
};

export const useScrollToViewEffect = (
  id: string,
  effect: React.EffectCallback,
  deps: React.DependencyList
) => {
  const scrollToCell = useSelector((state: RootState) => {
    const f = focus(state);
    if (!f || f.nodeId !== id) {
      return null;
    }
    return f.scrollToCell;
  });
  useEffect(() => {
    if (scrollToCell) {
      return effect();
    }
  }, [scrollToCell, ...deps]);
};

export const useEditableId = () => useContext(EditableContext);

export const useEditableNode = () => {
  const editableId = useEditableId();
  return useSelector((state: RootState) =>
    editable(state, {
      id: editableId,
    })
  );
};
export const useNode = (nodeId: string) => {
  const editableId = useEditableId();

  const node = useSelector(
    (state: RootState) =>
      selectNode(state, { editable: editableId, id: nodeId }),
    deepEquals
  );

  return node;
};

export const useCell = (nodeId: string) => {
  const node = useNode(nodeId);
  if (!isRow(node)) {
    return node;
  }
  return null;
};

export const useRow = (nodeId: string) => {
  const node = useNode(nodeId);
  if (isRow(node)) {
    return node;
  }
  return null;
};
export const useEditor = () => useContext<Editor>(EditorContext);

export const useOptions = () => useContext(OptionsContext);

export const useCellData = (cell: Cell, lang?: string) => {
  const currentLang = useLang();
  const contentOrLayout = cell.layout ?? cell.content;
  if (!contentOrLayout) {
    return null;
  }
  const { state, stateI18n } = contentOrLayout;
  return getI18nState({
    state,
    stateI18n,
    lang: lang ?? currentLang,
  });
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

export const useIsPreviewMode = () => {
  return useSelector(isPreviewMode);
};

export const useIsResizeMode = () => {
  return useSelector(isResizeMode);
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

export const useSetDraft = (id: string) => {
  const dispatch = useDispatch();
  return useCallback(
    (isDraft: boolean, lang: string) =>
      dispatch(updateCellIsDraft(id, isDraft, lang)),
    [dispatch, id]
  );
};

export const useResizeCell = (id: string) => {
  const dispatch = useDispatch();
  return useCallback((size: number) => dispatch(resizeCell(id)(size)), [
    dispatch,
    id,
  ]);
};

export const useSetLang = () => {
  const dispatch = useDispatch();
  return useCallback((lang: string) => dispatch(setLang(lang)), [dispatch]);
};

export const useUpdateCellContent = (id: string) => {
  const dispatch = useDispatch();
  const currentLang = useLang();
  return useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state: any, lang?: string) =>
      dispatch(updateCellContent(id)(state, lang ?? currentLang)),
    [dispatch, id, currentLang]
  );
};

export const useUpdateCellLayout = (id: string) => {
  const dispatch = useDispatch();
  const currentLang = useLang();
  return useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state: any, lang?: string) =>
      dispatch(updateCellLayout(id)(state, lang ?? currentLang)),
    [dispatch, id, currentLang]
  );
};

export const useRemoveCellById = () => {
  const dispatch = useDispatch();
  return useCallback((id: string) => dispatch(removeCell(id)), [dispatch]);
};

export const useRemoveCell = (id: string) => {
  const removeById = useRemoveCellById();
  return useCallback(() => removeById(id), [removeById, id]);
};

export const useDuplicateCellById = () => {
  const dispatch = useDispatch();
  const editor = useEditor();
  const editableId = useEditableId();

  return useCallback(
    (id: string) => dispatch(duplicateCell(editor.getNode(editableId, id))),
    [dispatch, editableId]
  );
};

export const useDuplicateCell = (id: string) => {
  const duplicateCellById = useDuplicateCellById();
  return useCallback(() => duplicateCellById(id), [duplicateCellById]);
};

export const useFocusCellById = () => {
  const dispatch = useDispatch();

  return useCallback(
    (id: string, scrollToCell?: boolean, source?: string) => {
      dispatch(focusCell(id, scrollToCell, source));
    },
    [dispatch]
  );
};

export const useFocusCell = (id: string) => {
  const focusCellById = useFocusCellById();

  return useCallback(
    (scrollToCell?: boolean, source?: string) =>
      focusCellById(id, scrollToCell, source),
    [focusCellById]
  );
};
export const useBlurCell = () => {
  const dispatch = useDispatch();

  return useCallback(
    (id: string) => {
      dispatch(blurCell(id));
    },
    [dispatch]
  );
};

export const useBlurAllCells = () => {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(blurAllCells());
  }, [dispatch]);
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

export const useSetMode = () => {
  const dispatch = useDispatch();

  return useCallback(
    (mode: DisplayModes) => {
      dispatch(setMode(mode));
    },
    [dispatch]
  );
};
export const useSetResizeMode = () => {
  const setMode = useSetMode();
  return useCallback(() => setMode(DISPLAY_MODE_RESIZING), [setMode]);
};

export const useSetEditMode = () => {
  const setMode = useSetMode();
  return useCallback(() => setMode(DISPLAY_MODE_EDIT), [setMode]);
};

export const useSetLayoutMode = () => {
  const setMode = useSetMode();
  return useCallback(() => setMode(DISPLAY_MODE_LAYOUT), [setMode]);
};

export const useSetInsertMode = () => {
  const setMode = useSetMode();
  return useCallback(() => setMode(DISPLAY_MODE_INSERT), [setMode]);
};

export const useSetPreviewMode = () => {
  const setMode = useSetMode();
  return useCallback(() => setMode(DISPLAY_MODE_PREVIEW), [setMode]);
};

export const useHoverActions = () => {
  const dispatch = useDispatch();

  return useMemo(
    (): Callbacks => ({
      dragCell: (id: string) => dispatch(dragCell(id)),
      clear: () => dispatch(clearHover()),
      cancelCellDrag: () => dispatch(cancelCellDrag()),
      above: (drag, hover, level) =>
        dispatch(cellHoverAbove(drag, hover, level)),
      below: (drag, hover, level) =>
        dispatch(cellHoverBelow(drag, hover, level)),
      leftOf: (drag, hover, level) =>
        dispatch(cellHoverLeftOf(drag, hover, level)),
      rightOf: (drag, hover, level) =>
        dispatch(cellHoverRightOf(drag, hover, level)),
      inlineLeft: (drag, hover) => dispatch(cellHoverInlineLeft(drag, hover)),
      inlineRight: (drag, hover) => dispatch(cellHoverInlineRight(drag, hover)),
    }),
    [dispatch]
  );
};

export const useDropActions = () => {
  const dispatch = useDispatch();

  return useMemo(
    (): Callbacks => ({
      dragCell: (id: string) => dispatch(dragCell(id)),
      clear: () => dispatch(clearHover()),
      cancelCellDrag: () => dispatch(cancelCellDrag()),
      above: (drag, hover, level) =>
        dispatch(insertCellAbove(drag, hover, level)),
      below: (drag, hover, level) =>
        dispatch(insertCellBelow(drag, hover, level)),
      leftOf: (drag, hover, level) =>
        dispatch(insertCellLeftOf(drag, hover, level)),
      rightOf: (drag, hover, level) =>
        dispatch(insertCellRightOf(drag, hover, level)),
      inlineLeft: (drag, hover) => dispatch(insertCellLeftInline(drag, hover)),
      inlineRight: (drag, hover) =>
        dispatch(insertCellRightInline(drag, hover)),
    }),
    [dispatch]
  );
};
