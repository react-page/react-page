import React, { PropTypes, Component } from 'react'
import classNames from 'classnames'
import Cell from 'src/editor/components/Cell'
import cssModules from 'react-css-modules'
import grid from 'src/editor/styles/floating-grid.scoped.css'
import styles from './index.scoped.css'

class Inner extends Component {
  render() {
    const { cells = [], editable, ancestors, id, hover, hasInlineChildren, containerHeight, containerWidth } = this.props
    return (
      <div styleName={classNames('row', {
        'is-over-current': hover,
        [`is-over-${hover}`]: hover,
        'force-block': cells.length === 2 && cells[0].inline && cells[1].hasInlineNeighbour,
      })} className="editable-row"
      >
        {cells.map((c) => (
          <Cell
            rowWidth={containerWidth}
            rowHeight={containerHeight}
            ancestors={[...ancestors, id]}
            editable={editable}
            key={c.id} {...c}
          />
        ))}
        <div styleName="clearfix"/>
      </div>
    )
  }
}
Inner.propTypes = {
  id: PropTypes.string.isRequired,
  hover: PropTypes.string,
  editable: PropTypes.string.isRequired,
  cells: PropTypes.array.isRequired,
  ancestors: PropTypes.array.isRequired,
  hasInlineChildren: PropTypes.bool.isRequired,
  containerHeight: PropTypes.bool.isRequired,
  containerWidth: PropTypes.bool.isRequired
}

export default (cssModules(Inner, { ...grid, ...styles }, { allowMultiple: true }))
