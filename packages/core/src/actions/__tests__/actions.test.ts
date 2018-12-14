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
import * as cellActions from '../cell/index';
import * as unexpected from 'unexpected';

const expect = unexpected.clone();

describe('actions', () => {
  const fired = [];
  const creators = [];
  const all = [cellActions];
  const faillist = [
    'cellHoverLeftOf',
    'cellHoverRightOf',
    'cellHoverBelow',
    'cellHoverAbove',
    'cellHoverInlineRight',
    'cellHoverInlineLeft',
  ];

  all.map(actions =>
    Object.keys(actions).forEach((key: string) => {
      if (typeof actions[key] === 'function') {
        creators.push(actions[key]);
      }
    })
  );

  all.map(actions =>
    Object.keys(actions).forEach((key: string) => {
      if (typeof actions[key] === 'function') {
        // FIXME Ugly hack to circumvent object destructor on undefined which breaks tests completely.
        const { type, ts } =
          typeof actions[key]({}, {}, {}, {}) === 'function'
            ? actions[key]({}, {}, {}, {})({}, {}, {}, {})
            : actions[key]({}, {}, {}, {});
        it(`${key} (${type}) should be unique`, () => {
          expect(
            fired.indexOf(type) === -1,
            'to be',
            faillist.indexOf(key) === -1
          );
          fired.push(type);
        });
        it(`${key} (${type}) should have a timestamp`, () => {
          expect(ts, 'to be defined');
        });
      }
    })
  );

  it('must have fired at least once', () => {
    expect(fired.length, 'to be', creators.length);
  });
});
