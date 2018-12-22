/*
 * This file is part of ORY Editor.
 *
 * ORY Editor is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * ORY Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with ORY Editor.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @license LGPL-3.0
 * @copyright 2016-2018 Aeneas Rekkas
 * @author Aeneas Rekkas <aeneas+oss@aeneas.io>
 *
 */

import * as unexpected from 'unexpected';

import {
  sumSizes,
  computeBounds,
  resizeCells,
  computeResizeable
} from '../sizing';
import { Cell } from '../../../../types/editable';

const expect = unexpected.clone();

describe('computeResizeable', () => {
  [
    {
      cells: [{} as Cell],
      e: [{ resizable: false }],
    },
    {
      cells: [{} as Cell, {} as Cell, {} as Cell],
      e: [{ resizable: true }, { resizable: true }, { resizable: false }],
    },
  ].forEach((c, k) => {
    it(`should pass test case ${k}`, () => {
      expect(computeResizeable(c.cells), 'to equal', c.e);
    });
  });
});

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
      e: [{ id: '1', size: 4 }, { id: '2', size: 6 }, { id: '3', size: 2 }],
    },
  ].forEach((c, k) => {
    it(`should pass test case ${k}`, () => {
      expect(resizeCells(c.cells, c.a), 'to equal', c.e);
    });
  });
});

describe('computeBounds', () => {
  [
    {
      cells: [{ size: 6 } as Cell, { size: 6 } as Cell],
      e: [
        { size: 6, bounds: { left: 0, right: 11 } } as Cell,
        { size: 6, bounds: { left: 11, right: 0 } } as Cell,
      ],
    },
    {
      cells: [{ size: 12 } as Cell],
      e: [{ size: 12, bounds: { left: 0, right: 0 } } as Cell],
    },
    {
      cells: [
        { size: 1 } as Cell,
        { size: 3 } as Cell,
        { size: 2 } as Cell,
        { size: 4 } as Cell,
      ],
      e: [
        { size: 1, bounds: { left: 0, right: 3 } } as Cell,
        { size: 3, bounds: { left: 3, right: 4 } } as Cell,
        { size: 2, bounds: { left: 4, right: 5 } } as Cell,
        { size: 4, bounds: { left: 5, right: 0 } } as Cell,
      ],
    },
  ].forEach((c, k) => {
    it(`should pass test case ${k}`, () => {
      expect(computeBounds(c.cells), 'to equal', c.e);
    });
  });
});
