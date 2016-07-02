export const flatten = (c, n) => ([...c, ...n])

export const optimizeCells = (cells = []) => cells.filter(({ plugin = false, rows = [], layout = false }) => plugin || layout || rows.length)

export const optimizeRows = (rows = []) => rows.filter(({ cells = [] }) => cells.length)

export const optimizeCell = ({ rows = [], ...other }) => ({
  ...other,
  rows: rows.map((r) => {
    const { cells = [] } = r
    if (cells.length !== 1) {
      return [r]
    }
    const { rows: cellRows = [], layout } = cells[0]
    if (cellRows.length > 0 && !layout) {
      return cellRows
    }
    return [r]
  }).reduce(flatten, [])
})

export const optimizeRow = ({ cells = [], ...other }) => ({
  ...other,
  cells: cells.map((c) => {
    const { rows = [] } = c
    if (rows.length !== 1) {
      return [c]
    }

    const { cells: rowCells = [] } = rows[0]
    if (rowCells.length === 1) {
      return rowCells
    }

    return [c]
  }).reduce(flatten, [])
})
