import expect from 'unexpected';

import { sumSizes, resizeCells } from '../sizing';
import { Cell } from '../../../../types/editable';

describe('sumSizes', () => {
  [
    {
      cells: [{ size: 6 } as Cell, { size: 6 } as Cell],
      e: 12,
    },
    {
      cells: [{ size: 6 } as Cell, { size: 2 } as Cell],
      e: 8,
    },
    {
      cells: [{ size: 6 } as Cell, { size: 6 } as Cell, { size: 3 } as Cell],
      e: 15,
    },
  ].forEach((c, k) => {
    it(`should pass test case ${k}`, () => {
      expect(sumSizes(c.cells), 'to equal', c.e);
    });
  });
});

describe('resizeCells', () => {
  [
    {
      a: { id: '2', size: 6 } as Cell,
      cells: [
        { id: '1', size: 4 } as Cell,
        { id: '2', size: 4 } as Cell,
        { id: '3', size: 4 } as Cell,
      ],
      e: [
        { id: '1', size: 4 },
        { id: '2', size: 6 },
        { id: '3', size: 2 },
      ],
    },
  ].forEach((c, k) => {
    it(`should pass test case ${k}`, () => {
      expect(resizeCells(c.cells, c.a), 'to equal', c.e);
    });
  });
});
