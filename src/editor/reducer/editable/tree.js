export const row = (state = {
  id: null,
  cells: []
}, action) => {
  
}

export const rows = (state = [], action) => {
  switch (action.type) {
    default:
      return state.map((r) => row(r, action))
  }
}
