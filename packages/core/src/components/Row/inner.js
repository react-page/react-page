// @flow
import React from 'react'
import classNames from 'classnames'

import Cell from '../Cell'
import type { ComponentizedRow, Cell as CellType } from '../../types/editable'

const Inner = ({
  editable,
  ancestors,
  node: {
    id,
    hover,
    cells = [],
    hasInlineChildren
  },
  containerHeight,
  blurAllCells,
  containerWidth
}: ComponentizedRow) => (
  <div className={classNames(
    'ory-row',
    {
      'ory-row-is-hovering-this': Boolean(hover),
      [`ory-row-is-hovering-${hover || ''}`]: Boolean(hover),
      'ory-row-has-floating-children': hasInlineChildren
    }
  )}
       onClick={blurAllCells}
  >
    {cells.map((c: string | CellType) => (
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
