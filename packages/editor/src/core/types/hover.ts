import type { InsertOptions } from '../actions/cell';
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
  above(drag: PartialCell, hover: HoverTarget, options?: InsertOptions): void;
  below(drag: PartialCell, hover: HoverTarget, options?: InsertOptions): void;
  leftOf(drag: PartialCell, hover: HoverTarget, options?: InsertOptions): void;
  rightOf(drag: PartialCell, hover: HoverTarget, options?: InsertOptions): void;
  inlineLeft(drag: PartialCell, hover: HoverTarget): void;
  inlineRight(drag: PartialCell, hover: HoverTarget): void;
};

export type Matrix = Array<Array<number>>;
