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
import equal from 'deep-equal';

import { optimizeCell, optimizeRow } from '../optimize';

const expect = unexpected.clone();

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
            rows: [{ cells: [{ plugin: 'foo' }] }],
          },
        ],
      },
      out: {
        cells: [{ plugin: 'foo' }],
      },
    },
    {
      in: {
        cells: [
          {
            rows: [{ cells: [{ plugin: 'foo' }] }],
          },
          { plugin: 'foo' },
        ],
      },
      out: {
        cells: [{ plugin: 'foo' }, { plugin: 'foo' }],
      },
    },
  ].forEach((c, k) => {
    it(`should pass test case ${k}`, () => {
      // tslint:disable-next-line:no-any
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
      // tslint:disable-next-line:no-any
      expect(equal(c.out, optimizeCell(c.in as any)), 'to be truthy');
    });
  });
});
