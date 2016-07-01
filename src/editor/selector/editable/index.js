export const editable = (id) => ({ editables = [] }) => editables.filter(({ id: current }) => current === id)
