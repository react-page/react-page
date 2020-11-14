import expect from 'unexpected';
import deepEquals from '../../../../utils/deepEquals';

import { optimizeCell, optimizeRow } from '../optimize';

describe('optimizeRow', () => {
  [
    {
      in: {
        cells: [],
      },
      out: {
        cells: [],
      },
    },
    {
      in: {
        cells: [
          {
            size: 12,
            rows: [{ cells: [{ plugin: 'foo', size: 12 }] }],
          },
        ],
      },
      out: {
        cells: [{ plugin: 'foo', size: 12 }],
      },
    },
    {
      in: {
        size: 12,
        cells: [
          {
            size: 4,
            rows: [{ cells: [{ plugin: 'bar', size: 12 }] }],
          },
          { plugin: 'foo', size: 8 },
        ],
      },
      out: {
        size: 12,
        cells: [
          { plugin: 'bar', size: 4 },
          { plugin: 'foo', size: 8 },
        ],
      },
    },
  ].forEach((c, k) => {
    it(`should pass test case ${k}`, () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(optimizeRow(c.in as any), 'to equal', c.out);
    });
  });
});

describe('optimizeCell', () => {
  [
    {
      in: {
        rows: [],
      },
      out: {
        rows: [],
      },
    },
    {
      in: {
        rows: [
          {
            cells: [{ rows: [{ cells: [{ plugin: 'foo' }] }] }],
          },
        ],
      },
      out: {
        rows: [{ cells: [{ plugin: 'foo' }] }],
      },
    },
  ].forEach((c, k) => {
    it(`should pass test case ${k}`, () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(
        deepEquals(c.out, optimizeCell(c.in as any) as any),
        'to be truthy'
      );
    });
  });
});
