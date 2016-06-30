export const cell = (state = {
  id: null,
  rows: []
}, action) => {
  switch (action.type) {
    default:
      return {
        ...state,
        rows: state.rows.map((r) => rows(r, action))
      }
  }
}

export const cells = (state = [], action) => {
  switch (action.type) {
    default:
      return state.map((c) => cell(c, action))
  }
}

export const row = (state = {
  id: null,
  cells: []
}, action) => {
  switch (action.type) {
    default:
      return {
        ...state,
        cells: state.cells.map((c) => cells(c, action))
      }
  }
}

export const rows = (state = [], action) => {
  switch (action.type) {
    default:
      return state.map((r) => row(r, action))
  }
}
