import React, { PropTypes, Component } from 'react'
import classNames from 'classnames'
import Cell from 'src/editor/components/Cell'
import cssModules from 'react-css-modules'
import grid from 'src/editor/styles/floating-grid.scoped.css'
import styles from './index.scoped.css'

class Inner extends Component {
  render() {
    const { cells = [], editable, ancestors, id, hover, containerHeight, containerWidth, hasInlineChildren } = this.props
    return (
      <div styleName={classNames('row', 'relative', {
        'is-over-current': hover,
        [`is-over-${hover}`]: hover,
        'force-block': hasInlineChildren
      })} className="editable-row"
      >
        {cells.map((c) => (
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
  }
}

Inner.propTypes = {
  id: PropTypes.string.isRequired,
  hover: PropTypes.string,
  editable: PropTypes.string.isRequired,
  cells: PropTypes.array.isRequired,

  ancestors: PropTypes.array.isRequired,
  hasInlineChildren: PropTypes.bool.isRequired,

  containerHeight: PropTypes.number.isRequired,
  containerWidth: PropTypes.number.isRequired
}

export default cssModules(Inner, { ...grid, ...styles }, { allowMultiple: true })
