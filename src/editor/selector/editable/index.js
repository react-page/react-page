export const editable = ({ editables = [] }, { id }) => editables.find(({ id: current }) => current === id)

export const purifiedEditable = (state, props) => {
  const found = editable(state, props)
  return {
    ...found,
    cells: found.cells.map((c) => c.id)
  }
}

export const editableConfig = (state, { editable: id }) => editable(state, { id }).config

const nodeInner = (current, props) => {
  const { id, rows = [], cells = [] } = current
  if (id === props.id) {
    return current
  }

  let found = false;
  [...rows, ...cells].find((n) => {
    const f = nodeInner(n, props)
    if (f) {
      found = f
    }
    return Boolean(f)
  })

  return found
}

export const node = (state, props) => {
  const tree = editable(state, { id: props.editable })
  if (!state) {
    throw new Error(`Could not find editable: ${props.editable}`)
  }

  const found = { ...nodeInner(tree, props) }
  if (!found) {
    throw new Error(`Could not find node=${props.id}, editable=${props.editable}`)
  }

  if (found.cells) {
    found.hasInlineChildren = found.cells.length === 2 && found.cells[0].inline && found.cells[1].hasInlineNeighbour
    found.cells = found.cells.map((c) => c.id)
  }

  if (found.rows) {
    found.rows = found.rows.map((r) => r.id)
  }

  return found
}
