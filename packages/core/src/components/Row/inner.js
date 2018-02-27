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

// @flow
import React from 'react'
import classNames from 'classnames'

import Cell from '../Cell'
import type { ComponetizedRow } from '../../types/editable'

const Inner = ({
  editable,
  ancestors,
  node: { id, hover, cells = [], hasInlineChildren },
  containerHeight,
  blurAllCells,
  containerWidth
}: ComponetizedRow) => (
  <div
    className={classNames('ory-row', {
      'ory-row-is-hovering-this': Boolean(hover),
      [`ory-row-is-hovering-${hover || ''}`]: Boolean(hover),
      'ory-row-has-floating-children': hasInlineChildren
    })}
    onClick={blurAllCells}
  >
    {cells.map((c: string) => (
      <Cell
        rowWidth={containerWidth}
        rowHeight={containerHeight}
        ancestors={[...ancestors, id]}
        editable={editable}
        key={c}
        id={c}
      />
    ))}
  </div>
)

export default Inner
