/* eslint no-use-before-define: off */
export type Cell = {
  id: string,
  rows: Array<Row>
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

