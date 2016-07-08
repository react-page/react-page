export const computeDropLevels = ({ rows = [], cells = [], ...props }, { left = 0, right = 0, above = 0, below = 0 } = {}) => {
  if (rows.length) {
    props.rows = rows.map((r, k) => computeDropLevels(r, {
      left: left + 1,
      right: right + 1,
      above: k === 0 ? above + 1 : 0,
      below: k === rows.length - 1 ? below + 1 : 0
    }))
  }

  if (cells.length) {
    props.cells = cells.map((c, k) => computeDropLevels(c, {
      left: k === 0 ? left + 1 : 0,
      right: k === cells.length - 1 ? right + 1 : 0,
      above: above === 0 ? 0 : above + 1,
      below: below === 0 ? 0 : below + 1
    }))
  }

  delete props.levels
  return { levels: { left, right, above, below }, ...props }
}
