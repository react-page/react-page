// @flow
import type { Cell } from './editable'

export type Room = {
  height: number,
  width: number
}

export type Vector = {
  y: number,
  x: number
}

export type MatrixIndex = {
  row: number,
  cell: number
}

export type Callbacks = {
  clear(id: string): void,
  above(drag: Cell, hover: Cell, level: number): void,
  below(drag: Cell, hover: Cell, level: number): void,
  leftOf(drag: Cell, hover: Cell, level: number): void,
  rightOf(drag: Cell, hover: Cell, level: number): void,
  inlineLeft(drag: Cell, hover: Cell): void,
  inlineRight(drag: Cell, hover: Cell): void
}

export type Matrix = Array<Array<number>>
