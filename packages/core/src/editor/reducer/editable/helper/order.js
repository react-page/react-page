// @flow
const computeOrder = ({ rows, cells, content: { plugin: { name = '' } = {} } = {}, id }: { rows: Object[], cells: Object[], id: string, content: { plugin: { name: string } } }) => [[{
  id,
  isLeaf: Boolean(name)
}], ...(rows || []).map(computeOrder), ...(cells || []).map(computeOrder)].reduce((p: [], n: []) => [...p, ...n], [])

export const cellOrder = (os: Object[]) => os.map(computeOrder).reduce((p: [], n: []) => [...p, ...n], [])
