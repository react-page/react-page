/* eslint no-use-before-define: off */
import { clearHover, cancelCellDrag, dragCell } from 'src/editor/actions/cell/drag'

export type Cell = {
  id: string,
  rows: Array<Row>,
  ancestors: Array<string>,
  cancelCellDrag: cancelCellDrag,
  dragCell: dragCell,
  clearHover: clearHover
}

export type Row = {
  id: string,
  cells: Array<Cell>
}

export type Editable = {
  id: string,
  cells: Array<Cell>,
  config: {
    whitelist: Array,
  }
}

