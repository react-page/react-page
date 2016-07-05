export const editable = ({ editables = [] }) => (id) => editables.find(({ id: current }) => current === id)

export const editableConfig = (state) => (id) => editable(state)(id).config
