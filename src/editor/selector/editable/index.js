export const editable = ({ editables = [] }) => (id) => editables.find(({ id: current }) => current === id)
