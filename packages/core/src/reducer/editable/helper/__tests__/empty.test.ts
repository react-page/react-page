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

import { isEmpty, emptyFilter } from '../empty';

const expect = unexpected.clone();

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
                          { cells: [{ content: { plugin: { name: 'asdf' } } }] },
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
              { content: { plugin: { name: 'asdf' } } },
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
      // tslint:disable-next-line:no-any
      expect(isEmpty(c.in as any), 'to equal', c.empty);
      expect(
        // tslint:disable-next-line:no-any
        (c.in.rows || (c.in.cells as any)).filter(emptyFilter).length,
        'to equal',
        c.empty ? 0 : 1
      );
    });
  });
});
