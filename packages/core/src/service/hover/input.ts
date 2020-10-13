import type { DropTargetMonitor } from 'react-dnd';

import { Node } from '../../types/editable';
import { HoverInsertActions, Room, Vector } from '../../types/hover';
import HoverService from '../hover';

const hoverService = new HoverService();

const computeCurrentDropPosition = (
  actions: HoverInsertActions,
  hover: Node,
  drag: Node,
  monitor: DropTargetMonitor,
  element: HTMLElement,
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

  hoverService.hover(drag, hover, actions, { room, mouse, matrix: matrixName });
};

export const computeAndDispatchInsert = (
  hover: Node,
  drag: Node,
  monitor: DropTargetMonitor,
  element: HTMLElement,
  actions: HoverInsertActions,
  matrixName = '10x10'
) => {
  return computeCurrentDropPosition(
    actions,
    hover,
    drag,
    monitor,
    element,
    matrixName
  );
};

export const computeAndDispatchHover = (
  hover: Node,
  drag: Node,
  monitor: DropTargetMonitor,
  element: HTMLElement,
  actions: HoverInsertActions,
  matrixName = '10x10'
) =>
  computeCurrentDropPosition(
    actions,
    hover,
    drag,
    monitor,
    element,
    matrixName
  );
