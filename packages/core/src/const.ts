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

/**
 * A list of positions in the layout space.
 */
export enum PositionEnum {
  LEFT_OF = 'left-of',
  RIGHT_OF = 'right-of',
  ABOVE = 'above',
  BELOW = 'below',
  INLINE_LEFT = 'inline-left',
  INLINE_RIGHT = 'inline-right',
}

/**
 * Is true if built in production mode.
 */
export const isProduction = process.env.NODE_ENV === 'production';
