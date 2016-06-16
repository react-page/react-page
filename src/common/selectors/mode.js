export const isLayoutMode = ({ mode: { type } }) => type === 'layout'
export const isEditMode = ({ mode: {type} }) => type === 'edit'
export const isDisplayMode = ({ mode: {type} }) => type === 'display'
export const mode = ({mode: {type}}) => type