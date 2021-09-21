import type { Node } from '../types';
import { mapNode } from './mapNode';

describe('mapNode', () => {
  it('transforms every child row and cell of a node recursivly', () => {
    const node: Node = {
      id: 'cell-1',
      rows: [
        {
          id: 'row-1',
          cells: [
            {
              id: 'cell-1-1',
            },
            {
              id: 'cell-1-2',
              rows: [
                {
                  id: 'rows-1-2-1',
                  cells: [
                    {
                      id: 'cell-2-1-1',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 'row-2',
          cells: [
            {
              id: 'cell-2-1',
            },
          ],
        },
      ],
    };
    const mapped = mapNode(node, {
      mapCell: (c) => ({
        ...c,
        size: 6,
      }),
      mapRow: (r) => ({
        ...r,
        id: 'mapped-' + r.id,
      }),
    });

    expect(mapped).toEqual<Node>({
      id: 'cell-1',
      size: 6,
      rows: [
        {
          id: 'mapped-row-1',
          cells: [
            {
              id: 'cell-1-1',
              size: 6,
            },
            {
              id: 'cell-1-2',
              size: 6,
              rows: [
                {
                  id: 'mapped-rows-1-2-1',
                  cells: [
                    {
                      id: 'cell-2-1-1',
                      size: 6,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 'mapped-row-2',
          cells: [
            {
              id: 'cell-2-1',
              size: 6,
            },
          ],
        },
      ],
    });
  });
});
