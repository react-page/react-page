import React, { PropTypes, Component } from 'react'
import classNames from 'classnames'
import Cell from 'src/editor/components/Cell'

const Inner = ({ cells = [], editable, ancestors, id, hover, updateDimensions, containerHeight, containerWidth }) => (
  <div styleName={classNames('row', {
        'is-over-current': hover,
        [`is-over-${hover}`]: hover
      })} className="editable-row"
  >
    {cells.map((c) => (
      <Cell
        rowWidth={containerWidth}
        updateDimensions={updateDimensions}
        rowHeight={containerHeight}
        ancestors={[...ancestors, id]}
        editable={editable}
        key={c.id}
        {...c}
      />
    ))}
    <div styleName="clearfix"/>
  </div>
)


Inner.propTypes = {
  containerHeight: PropTypes.number,
  containerWidth: PropTypes.number,
  updateDimensions: PropTypes.func,
  id: PropTypes.string.isRequired,
  hover: PropTypes.string,
  editable: PropTypes.string.isRequired,
  cells: PropTypes.array.isRequired,
  ancestors: PropTypes.array.isRequired
}

export default Inner
