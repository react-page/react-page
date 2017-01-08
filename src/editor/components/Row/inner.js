// @flow
import React from 'react'
import classNames from 'classnames'
import Cell from 'src/editor/components/Cell'
import type { ComponentizedRow, Cell as CellType } from 'types/editable'

// order matters, include overrides after grid import
import 'src/editor/styles/grid.css'
import './index.css'

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
      'ory-row-is-over-this': Boolean(hover),
      [`ory-row-is-over-${hover || ''}`]: Boolean(hover),
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
