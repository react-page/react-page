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
import { HoverInsertActions } from '../../types/hover';
import { useOptionsWithLang } from './options';

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

/**
 * @returns object of actions for dropping a cell
 */
export const useDropActions = () => {
  const dispatch = useDispatch();

  const options = useOptionsWithLang();

  return useMemo(
    (): HoverInsertActions => ({
      above: (drag, hover, level) =>
        dispatch(insertCellAbove(options)(drag, hover, level)),
      below: (drag, hover, level) =>
        dispatch(insertCellBelow(options)(drag, hover, level)),
      leftOf: (drag, hover, level) =>
        dispatch(insertCellLeftOf(options)(drag, hover, level)),
      rightOf: (drag, hover, level) =>
        dispatch(insertCellRightOf(options)(drag, hover, level)),
      inlineLeft: (drag, hover) =>
        dispatch(insertCellLeftInline(options)(drag, hover)),
      inlineRight: (drag, hover) =>
        dispatch(insertCellRightInline(options)(drag, hover)),
      dragCell: (id: string) => dispatch(dragCell(id)),
      clear: () => dispatch(clearHover()),
      cancelCellDrag: () => dispatch(cancelCellDrag()),
    }),
    [dispatch]
  );
};
