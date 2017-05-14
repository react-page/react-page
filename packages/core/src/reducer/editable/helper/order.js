// @flow
const computeOrder = ({
  rows,
  cells,
  content: { plugin: { name = '' } = {} } = {},
  id
}: {
  rows: Array<any>,
  cells: Array<any>,
  id: string,
  content: { plugin: { name: string } }
}) =>
  [
    [
      {
        id,
        isLeaf: Boolean(name)
      }
    ],
    ...(rows || []).map(computeOrder),
    ...(cells || []).map(computeOrder)
  ].reduce((p: Array<any>, n: Array<any>) => [...p, ...n], [])

export const cellOrder = (os: Array<any>) =>
  os
    .map(computeOrder)
    .reduce((p: Array<any>, n: Array<any>) => [...p, ...n], [])
