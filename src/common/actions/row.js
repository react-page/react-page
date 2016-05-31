export const INSERT_ROW = 'INSERT_ROW'
export const DELETE_ROW = 'DELETE_ROW'
export const POSITION_ROW = 'POSITION_ROW'

export const insertRow = (row) => ({
    type: INSERT_ROW,
    row
})

export const deleteRow = (id) => ({
    type: DELETE_ROW,
    id
})

export const positionRow = ({insertBefore, insertAfter}) => ({
    type: POSITION_ROW,
    insertBefore, insertAfter
})
