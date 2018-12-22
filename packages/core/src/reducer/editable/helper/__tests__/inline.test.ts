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

import { computeRow } from '../inline';

const expect = unexpected.clone();

describe('computeRow', () => {
  [
    {
      cells: [{ size: 6 }, { size: 6 }],
      e: false,
    },
    {
      cells: [{ size: 6 }, { size: 6, inline: 'left' }],
      e: false,
    },
    {
      cells: [{ size: 6, inline: 'left' }, { size: 6 }],
      e: true,
    },
    {
      cells: [{ size: 6, inline: 'left' }, { size: 6 }, {}],
      e: false,
    },
  ].forEach((c, k) => {
    it(`should pass test case ${k}`, () => {
      // tslint:disable-next-line:no-any
      expect(computeRow(c as any).hasInlineChildren, 'to equal', c.e);
    });
  });
});
