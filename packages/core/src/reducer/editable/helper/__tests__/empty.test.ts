import expect from 'unexpected';

import { isEmpty } from '../empty';

describe('isEmpty', () => {
  [
    {
      in: {
        cells: [],
      },
      empty: true,
    },
    {
      in: {
        cells: [
          {
            rows: [
              { cells: [{ rows: [{ cells: [{ rows: [{ cells: [] }] }] }] }] },
            ],
          },
          { rows: [{ cells: [] }] },
          { rows: [{ cells: [{ rows: [{ cells: [] }] }] }] },
        ],
      },
      empty: true,
    },
    {
      in: {
        rows: [
          {
            cells: [
              {
                rows: [
                  {
                    cells: [{ rows: [{ cells: [{ rows: [{ cells: [] }] }] }] }],
                  },
                ],
              },
              { rows: [{ cells: [] }] },
              { rows: [{ cells: [{ rows: [{ cells: [{}, {}, {}] }] }] }] },
            ],
          },
          {
            cells: [],
          },
        ],
      },
      empty: true,
    },
    {
      in: {
        rows: [
          {
            cells: [
              {
                rows: [
                  {
                    cells: [{ rows: [{ cells: [{ rows: [{ cells: [] }] }] }] }],
                  },
                ],
              },
              { rows: [{ cells: [] }] },
              {
                rows: [
                  {
                    cells: [
                      {
                        rows: [
                          {
                            cells: [{ plugin: { id: 'asdf' } }],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            cells: [],
          },
        ],
      },
      empty: false,
    },
    {
      in: {
        rows: [
          {
            cells: [
              {
                rows: [
                  {
                    cells: [{ rows: [{ cells: [{ rows: [{ cells: [] }] }] }] }],
                  },
                ],
              },
              { rows: [{ cells: [] }] },
              { rows: [{ cells: [{ rows: [{ cells: [{}] }] }] }] },
              { plugin: { id: 'asdf' } },
            ],
          },
          {
            cells: [],
          },
        ],
      },
      empty: false,
    },
    {
      in: {
        rows: [
          {
            cells: [
              {
                rows: [
                  {
                    cells: [{ rows: [{ cells: [{ rows: [{ cells: [] }] }] }] }],
                  },
                ],
              },
              { rows: [{ cells: [] }] },
              { rows: [{ cells: [{ rows: [{ cells: [{}] }] }] }] },
              {
                layout: { plugin: { name: 'asdf' } },
                rows: [{ cells: [{ content: { plugin: { name: 'asdf' } } }] }],
              },
            ],
          },
          {
            cells: [],
          },
        ],
      },
      empty: false,
    },
  ].forEach((c, k) => {
    it(`should pass test case ${k}`, () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(isEmpty(c.in as any), 'to equal', c.empty);
      expect(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (c.in.rows || (c.in.cells as any)).filter((n) => !isEmpty(n)).length,
        'to equal',
        c.empty ? 0 : 1
      );
    });
  });
});
