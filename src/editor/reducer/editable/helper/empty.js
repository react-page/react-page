export const isEmpty = ({ cells = [], rows = [], layout = false, plugin = false }) => !cells.filter(emptyFilter).length && !rows.filter(emptyFilter).length && !plugin && !(layout && rows.filter(emptyFilter).length)

export const emptyFilter = (state) => !isEmpty(state)
