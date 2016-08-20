// @flow
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

export type Matrix = Array<Array<Function>>
