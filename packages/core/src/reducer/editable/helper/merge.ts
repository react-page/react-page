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

import flatten from 'ramda/src/flatten';
import head from 'ramda/src/head';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import map from 'ramda/src/map';
import reduce from 'ramda/src/reduce';
import tail from 'ramda/src/tail';
import takeWhile from 'ramda/src/takeWhile';

import {
  SET_DISPLAY_MODE,
  SetDisplayModeAction
} from '../../../actions/display';
import { Row } from '../../../types/editable';

const notSharp = (c: string) => c !== '#';

export const mergeRows = (state: Row[]) => {
  if (state.length < 2) {
    return state;
  }

  const [newCellsAcc, lastRow] = reduce(
    ([rowsAcc, rowA]: [Row[], Row], rowB: Row) => {
      const numberOfCells = path(['cells', 'length']);

      if (numberOfCells(rowA) !== 1 || numberOfCells(rowB) !== 1) {
        return [
          [...rowsAcc, { ...rowA, id: takeWhile(notSharp, rowA.id).join('') }],
          rowB,
        ];
      }

      const cellA = rowA.cells[0];
      const cellB = rowB.cells[0];

      const pluginName = path(['content', 'plugin', 'name']);
      const pluginVersion = path(['content', 'plugin', 'version']);
      const pluginMerge = path(['content', 'plugin', 'merge']);

      if (
        !pluginName(cellA) ||
        !pluginName(cellB) ||
        !pluginVersion(cellA) ||
        !pluginVersion(cellB) ||
        pluginName(cellA) !== pluginName(cellB) ||
        pluginVersion(cellA) !== pluginVersion(cellB) ||
        !pluginMerge(cellA)
      ) {
        return [
          [...rowsAcc, { ...rowA, id: takeWhile(notSharp, rowA.id).join('') }],
          rowB,
        ];
      }

      return [
        rowsAcc,
        {
          ...rowA,
          id: takeWhile(notSharp, rowA.id).join(''),
          cells: [
            {
              ...cellA,
              id: takeWhile(notSharp, cellA.id).join(''),
              content: {
                ...cellA.content,
                state: pluginMerge(cellA)([
                  pathOr({}, ['content', 'state'], cellA),
                  pathOr({}, ['content', 'state'], cellB),
                ]),
              },
            },
          ],
        },
      ];
    },
    [[], head(state)],
    tail(state)
  );

  return [...newCellsAcc, lastRow];
};

export const splitRows = (state: Row[]) =>
  flatten(
    map((row: Row) => {
      if (!row.cells) {
        return [row];
      }

      if (row.cells.length !== 1) {
        return [row];
      }

      // tslint:disable-next-line:no-shadowed-variable
      const state = path(['cells', 0, 'content', 'state'], row);
      const split = path(['cells', 0, 'content', 'plugin', 'split'], row);

      if (!split) {
        return [row];
      }

      // tslint:disable-next-line:no-shadowed-variable
      return split(state).map((state: Object, i: number) => ({
        ...row,
        id: `${row.id}#${i}`,
        cells: [
          {
            ...row.cells[0],
            id: `${row.cells[0].id}#${i}`,
            content: {
              ...row.cells[0].content,
              state,
            },
          },
        ],
      }));
    }, state)
  );

export const mergeDecorator = (action: SetDisplayModeAction) => (
  state: Row[]
) => {
  if (action.type !== SET_DISPLAY_MODE) {
    return state;
  }

  switch (action.mode) {
    case 'edit':
      return mergeRows(state);
    case 'insert':
    case 'layout': {
      return splitRows(state);
    }
    default:
      return state;
  }
};
