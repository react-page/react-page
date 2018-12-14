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

import {
  DEFAULT_DISPLAY_MODE,
  SET_DISPLAY_MODE,
  SET_PREVIOUS_DISPLAY_MODE
} from '../../actions/display';
import { Display, DisplayAction } from '../../types/display';

export const display = (
  state: Display = {
    previous: DEFAULT_DISPLAY_MODE,
    mode: DEFAULT_DISPLAY_MODE,
  },
  action: DisplayAction
) => {
  switch (action.type) {
    case SET_PREVIOUS_DISPLAY_MODE:
      return {
        ...state,
        mode: state.previous === state.mode ? action.fallback : state.previous,
      };
    case SET_DISPLAY_MODE:
      return {
        previous:
          action.mode === state.mode && action.remember
            ? state.previous
            : action.mode,
        mode: action.mode,
      };
    default:
      return state;
  }
};
