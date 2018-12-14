/*
 * This file is part of ORY Editor.
 *
 * ORY Editor is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * ORY Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with ORY Editor.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @license LGPL-3.0
 * @copyright 2016-2018 Aeneas Rekkas
 * @author Aeneas Rekkas <aeneas+oss@aeneas.io>
 *
 */

import { findDOMNode } from 'react-dom';

import HoverService from '../hover';

import { ComponetizedCell } from '../../types/editable';
import { Vector, Room, Callbacks } from '../../types/hover';
import { DragSourceMonitor } from 'react-dnd';

const hoverService = new HoverService();

export const computeCurrentDropPosition = (
  actions: Callbacks,
  hover: ComponetizedCell,
  drag: ComponetizedCell,
  monitor: DragSourceMonitor,
  component: React.ReactInstance,
  matrixName: string
) => {
  const mousePosition = monitor.getClientOffset();
  /* eslint-disable react/no-find-dom-node */
  const componentPosition = (findDOMNode(component) as HTMLElement).getBoundingClientRect();
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
  monitor: DragSourceMonitor,
  component: React.ReactInstance,
  matrixName: string = '10x10'
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
      // tslint:disable-next-line:no-any
    } as any,
    // tslint:disable-next-line:no-any
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
  monitor: DragSourceMonitor,
  component: React.ReactInstance,
  matrixName: string = '10x10'
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
    // tslint:disable-next-line:no-any
    hover as any,
    drag,
    monitor,
    component,
    matrixName
  );
