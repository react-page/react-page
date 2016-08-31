// @flow
import React from 'react'
import classNames from 'classnames'
import Cell from 'src/editor/components/Cell'
import cssModules from 'react-css-modules'
import grid from 'src/editor/styles/floating-grid.scoped.css'
import styles from './index.scoped.css'
import type { ComponentizedRow, Cell as CellType } from 'types/editable'

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
  containerWidth
}: ComponentizedRow) => (
  <div styleName={classNames('row', 'relative', {
    'is-over-current': hover,
    [`is-over-${hover || ''}`]: hover,
    'force-block': hasInlineChildren
  })} className="editable-row"
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
    <div styleName="clearfix" />
  </div>
)

export default cssModules(Inner, { ...grid, ...styles }, { allowMultiple: true })
