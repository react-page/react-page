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

import { set } from 'redux-undo/lib/debug';
import undoable, { includeAction } from 'redux-undo';

import { editable } from '../editable';
import { UPDATE_EDITABLE } from '../../actions/editables';
import { EditableType, Editables } from '../../types/editable';
import {
  CELL_UPDATE_CONTENT,
  CELL_UPDATE_LAYOUT,
  CELL_REMOVE,
  CELL_RESIZE
} from '../../actions/cell/core';
import { isProduction } from '../../const';
import { AnyAction } from 'redux';
import {
  CELL_INSERT_ABOVE,
  CELL_INSERT_BELOW,
  CELL_INSERT_LEFT_OF,
  CELL_INSERT_RIGHT_OF,
  CELL_INSERT_INLINE_LEFT,
  CELL_INSERT_INLINE_RIGHT
} from '../../actions/cell/insert';

if (!isProduction) {
  set(true);
}

const inner = undoable(
  (
    // tslint:disable-next-line:no-any
    state: any = [],
    action: {
      type: string;
      id: string;
      editable: EditableType;
    }
  ): EditableType[] => {
    switch (action.type) {
      default:
        // tslint:disable-next-line:no-any
        return state.map((e: EditableType) => editable(e, action)) as any;
    }
  },
  {
    filter: includeAction([
      CELL_UPDATE_CONTENT,
      CELL_UPDATE_LAYOUT,
      CELL_REMOVE,
      CELL_RESIZE,
      CELL_INSERT_ABOVE,
      CELL_INSERT_BELOW,
      CELL_INSERT_LEFT_OF,
      CELL_INSERT_RIGHT_OF,
      CELL_INSERT_INLINE_LEFT,
      CELL_INSERT_INLINE_RIGHT,
    ]),
    // initTypes: [UPDATE_EDITABLE],
    neverSkipReducer: true,
  }
);

export const editables = (
  state: Editables = {
    past: [],
    present: [],
    future: [],
  },
  action: AnyAction
) => {
  const { past = [], present = [], future = [] } = state;
  switch (action.type) {
    case UPDATE_EDITABLE:
      return inner(
        {
          past: past.map(e => [
            // tslint:disable-next-line:no-any
            ...(e as any).filter(
              ({ id }: EditableType): boolean => id !== action.editable.id
            ),
            // we need to run the rawreducer once or the history initial state will be inconsistent.
            // resolves https://github.com/ory/editor/pull/117#issuecomment-242942796
            // ...past,
            editable(action.editable, action),
          ]),
          present: inner(
            [
              ...present.filter(
                ({ id }: EditableType): boolean => id !== action.editable.id
              ),
              // we need to run the rawreducer once or the history initial state will be inconsistent.
              // resolves https://github.com/ory/editor/pull/117#issuecomment-242942796
              editable(action.editable, action),
              // tslint:disable-next-line:no-any
            ] as any,
            undefined
          ),
          future,
        },
        undefined
      );
    default:
      return inner(state, action);
  }
};
