export const isEmpty = ({ cells = [], rows = [], plugin = false }) => !cells.filter((c) => !isEmpty(c)).length && !rows.filter((r) => !isEmpty(r)).length && !plugin

export const emptyFilter = (state) => !isEmpty(state)
