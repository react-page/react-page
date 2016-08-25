// @flow
import type { Editable, Cell, Row, Config } from 'types/editable'

type Editables = { editables: Array<Editable> }

const nodeInner = (current: any, props: Editable): any => {
  const { id, rows = [], cells = [] } = current
  if (id === props.id) {
    return current
  }

  let found = false;
  [...rows, ...cells].find((n: any) => {
    const f = nodeInner(n, props)
    if (f) {
      found = f
    }
    return Boolean(f)
  })

  return found
}

export const editable = ({ editables }: Editables, { id }: { id: string }): Editable => editables.find(({ id: current }: Editable): boolean => current === id)

export const purifiedEditable = (state: Editables, props: Editable) => {
  const found = editable(state, props)
  return {
    ...found,
    cells: found.cells.map((c: Cell | string) => typeof c === 'string' ? c : c.id)
  }
}

export const editableConfig = (state: Editables, { editable: id }: { editable: string }): Config => editable(state, { id }).config

export const node = (state: Object, props: Object): Object => {
  const tree = editable(state, { id: props.editable })
  if (!state) {
    throw new Error(`Could not find editable: ${props.editable}`)
  }

  const found = { ...nodeInner(tree, props) }
  if (!found) {
    throw new Error(`Could not find node=${props.id}, editable=${props.editable}`)
  }

  return found
}

export const purifiedNode = (state: Editables, props: Editable): Object => {
  const found = node(state, props)

  if (found.cells) {
    found.hasInlineChildren = found.cells.length === 2 && found.cells[0].inline && found.cells[1].hasInlineNeighbour
    found.cells = found.cells.map((c: Cell): string => c.id)
  }

  if (found.rows) {
    found.rows = found.rows.map((r: Row): string => r.id)
  }

  return found
}
