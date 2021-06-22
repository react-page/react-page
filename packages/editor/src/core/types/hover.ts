import type { HoverTarget } from '../service/hover/computeHover';
import type { PartialCell } from './node';

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
  above(drag: PartialCell, hover: HoverTarget, level: number): void;
  below(drag: PartialCell, hover: HoverTarget, level: number): void;
  leftOf(drag: PartialCell, hover: HoverTarget, level: number): void;
  rightOf(drag: PartialCell, hover: HoverTarget, level: number): void;
  inlineLeft(drag: PartialCell, hover: HoverTarget): void;
  inlineRight(drag: PartialCell, hover: HoverTarget): void;
};

export type Matrix = Array<Array<number>>;
