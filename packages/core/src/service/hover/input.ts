import { DropTargetMonitor } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import { ComponetizedCell } from '../../types/editable';
import { Callbacks, Room, Vector } from '../../types/hover';
import HoverService from '../hover';

const hoverService = new HoverService();

export const computeCurrentDropPosition = (
  actions: Callbacks,
  hover: ComponetizedCell,
  drag: ComponetizedCell,
  monitor: DropTargetMonitor,
  component: React.ReactInstance,
  matrixName: string
) => {
  const mousePosition = monitor.getClientOffset();
  /* eslint-disable react/no-find-dom-node */
  const componentPosition = (findDOMNode(
    component
  ) as HTMLElement).getBoundingClientRect();
  const room: Room = {
    height: componentPosition.bottom - componentPosition.top,
    width: componentPosition.right - componentPosition.left,
  };

  const mouse: Vector = {
    y: mousePosition.y - componentPosition.top,
    x: mousePosition.x - componentPosition.left,
  };

  hoverService.hover(drag, hover, actions, { room, mouse, matrix: matrixName });
};

export const computeAndDispatchInsert = (
  {
    insertCellAbove: above,
    insertCellBelow: below,
    insertCellLeftOf: leftOf,
    insertCellRightOf: rightOf,
    insertCellLeftInline: inlineLeft,
    insertCellRightInline: inlineRight,
    clearHover: clear,
    ...hover
  }: ComponetizedCell,
  drag: ComponetizedCell,
  monitor: DropTargetMonitor,
  component: React.ReactInstance,
  matrixName = '10x10'
) =>
  computeCurrentDropPosition(
    {
      clear,
      above,
      below,
      leftOf,
      rightOf,
      inlineLeft,
      inlineRight,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    hover as any,
    drag,
    monitor,
    component,
    matrixName
  );

export const computeAndDispatchHover = (
  {
    cellHoverAbove: above,
    cellHoverBelow: below,
    cellHoverLeftOf: leftOf,
    cellHoverRightOf: rightOf,
    cellHoverInlineLeft: inlineLeft,
    cellHoverInlineRight: inlineRight,
    clearHover: clear,
    ...hover
  }: ComponetizedCell,
  drag: ComponetizedCell,
  monitor: DropTargetMonitor,
  component: React.ReactInstance,
  matrixName = '10x10'
) =>
  computeCurrentDropPosition(
    {
      clear,
      above,
      below,
      leftOf,
      rightOf,
      inlineLeft,
      inlineRight,
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    hover as any,
    drag,
    monitor,
    component,
    matrixName
  );
