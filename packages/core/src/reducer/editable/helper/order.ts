const computeOrder = ({
  rows,
  cells,
  content: { plugin: { name = '' } = {} } = {},
  id,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows: Array<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cells: Array<any>;
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content?: { plugin?: any };
}) =>
  [
    [
      {
        id,
        isLeaf: Boolean(name),
      },
    ],
    ...(rows || []).map(computeOrder),
    ...(cells || []).map(computeOrder),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ].reduce((p: Array<any>, n: Array<any>) => [...p, ...n], []);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const cellOrder = (os: Array<any>) =>
  os
    .map(computeOrder)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .reduce((p: Array<any>, n: Array<any>) => [...p, ...n], []);
