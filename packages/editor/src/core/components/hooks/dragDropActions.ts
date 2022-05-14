import { useMemo } from 'react';
import {
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
  insertCellAbove,
  insertCellBelow,
  insertCellLeftInline,
  insertCellLeftOf,
  insertCellRightInline,
  insertCellRightOf,
} from '../../actions/cell/insert';
import { useDispatch } from '../../reduxConnect';
import type { HoverInsertActions } from '../../types/hover';
import { useAllCellPluginsForNode } from './node';
import { useLang } from './options';

/**
 * @returns object of actions for hovering
 */
export const useHoverActions = () => {
  const dispatch = useDispatch();

  return useMemo(
    (): HoverInsertActions => ({
      dragCell: (id: string) => dispatch(dragCell(id)),
      clear: () => dispatch(clearHover()),
      cancelCellDrag: () => dispatch(cancelCellDrag()),

      above: (drag, hover, options) =>
        dispatch(cellHoverAbove(drag, hover, options?.level)),
      below: (drag, hover, options) =>
        dispatch(cellHoverBelow(drag, hover, options?.level)),
      leftOf: (drag, hover, options) =>
        dispatch(cellHoverLeftOf(drag, hover, options?.level)),
      rightOf: (drag, hover, options) =>
        dispatch(cellHoverRightOf(drag, hover, options?.level)),
      inlineLeft: (drag, hover) => dispatch(cellHoverInlineLeft(drag, hover)),
      inlineRight: (drag, hover) => dispatch(cellHoverInlineRight(drag, hover)),
    }),
    [dispatch]
  );
};

/**
 * @param nodeId the parent reference node id
 * @returns object of actions for dropping a cell
 */
export const useDropActions = (parentNodeId?: string | null) => {
  const dispatch = useDispatch();

  const lang = useLang();
  const cellPlugins = useAllCellPluginsForNode(parentNodeId);

  return useMemo(
    (): HoverInsertActions => ({
      above: (drag, hover, level) =>
        dispatch(insertCellAbove({ cellPlugins, lang })(drag, hover, level)),
      below: (drag, hover, level) =>
        dispatch(insertCellBelow({ cellPlugins, lang })(drag, hover, level)),
      leftOf: (drag, hover, level) =>
        dispatch(insertCellLeftOf({ cellPlugins, lang })(drag, hover, level)),
      rightOf: (drag, hover, level) =>
        dispatch(insertCellRightOf({ cellPlugins, lang })(drag, hover, level)),
      inlineLeft: (drag, hover) =>
        dispatch(insertCellLeftInline({ cellPlugins, lang })(drag, hover)),
      inlineRight: (drag, hover) =>
        dispatch(insertCellRightInline({ cellPlugins, lang })(drag, hover)),
      dragCell: (id: string) => dispatch(dragCell(id)),
      clear: () => dispatch(clearHover()),
      cancelCellDrag: () => dispatch(cancelCellDrag()),
    }),
    [dispatch, lang, cellPlugins]
  );
};
