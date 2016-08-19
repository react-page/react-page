/* eslint no-use-before-define: "off" */
export const isEmpty = ({ cells = [], rows = [], layout = false, content = false }) => (
  !cells.filter(emptyFilter).length
  && !rows.filter(emptyFilter).length
  && !content
  && !(layout && rows.filter(emptyFilter).length)
)

export const emptyFilter = (state) => !isEmpty(state)
