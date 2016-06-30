export const isEmpty = ({ cells = [], rows = [], plugin = null }) => {
  if (cells.length > 0) {
    return !cells.filter((c) => !isEmpty(c)).length
  } else if (rows.length > 0) {
    return !rows.filter((r) => !isEmpty(r)).length
  }
  return !plugin
}
