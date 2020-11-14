import { HoverTarget } from '../service/hover/computeHover';
import { Cell } from './editable';

export type Room = {
  height: number;
  width: number;
};

export type Vector = {
  y: number;
  x: number;
};

export type MatrixIndex = {
  row: number;
  cell: number;
};

export type HoverInsertActions = {
  dragCell(id: string): void;
  cancelCellDrag(): void;
  clear(): void;
  above(drag: Cell, hover: HoverTarget, level: number): void;
  below(drag: Cell, hover: HoverTarget, level: number): void;
  leftOf(drag: Cell, hover: HoverTarget, level: number): void;
  rightOf(drag: Cell, hover: HoverTarget, level: number): void;
  inlineLeft(drag: Cell, hover: HoverTarget): void;
  inlineRight(drag: Cell, hover: HoverTarget): void;
};

export type Matrix = Array<Array<number>>;
