import type { DropTargetMonitor } from 'react-dnd';

import { Node, Options } from '../../types/editable';
import { HoverInsertActions, Room, Vector } from '../../types/hover';
import { computeHover, HoverTarget } from './computeHover';

const computeCurrentDropPosition = (
  actions: HoverInsertActions,
  hover: HoverTarget,
  drag: Node,
  monitor: DropTargetMonitor,
  element: HTMLElement,
  options: Options,
  matrixName: string
) => {
  const mousePosition = monitor.getClientOffset();

  const componentPosition = element.getBoundingClientRect();
  const room: Room = {
    height: componentPosition.bottom - componentPosition.top,
    width: componentPosition.right - componentPosition.left,
  };

  const mouse: Vector = {
    y: mousePosition.y - componentPosition.top,
    x: mousePosition.x - componentPosition.left,
  };

  computeHover(drag, hover, actions, {
    room,
    mouse,
    matrixName,
    options,
  });
};

export const computeAndDispatchInsert = (
  hover: HoverTarget,
  drag: Node,
  monitor: DropTargetMonitor,
  element: HTMLElement,
  actions: HoverInsertActions,
  options: Options,
  matrixName = '10x10'
) => {
  return computeCurrentDropPosition(
    actions,
    hover,
    drag,
    monitor,
    element,
    options,
    matrixName
  );
};

export const computeAndDispatchHover = (
  hover: HoverTarget,
  drag: Node,
  monitor: DropTargetMonitor,
  element: HTMLElement,
  actions: HoverInsertActions,
  options: Options,
  matrixName = '10x10'
) =>
  computeCurrentDropPosition(
    actions,
    hover,
    drag,
    monitor,
    element,
    options,
    matrixName
  );
