import React, { PropTypes } from 'react'
import Cell from 'src/editor/components/Cell'
import cssModules from 'react-css-modules'
import grid from 'src/editor/styles/grid.scoped.css'
import styles from './index.scoped.css'
import classNames from 'classnames'

const Row = ({ cells = [], editable, ancestors, id, hover }) => (
  <div styleName={classNames('row', {
    'is-over-current': hover,
    [`is-over-${hover}`]: hover
  })} className="editable-row"
  >
    {cells.map((c) => <Cell ancestors={[...ancestors, id]} editable={editable} key={c.id} {...c} />)}
    <div styleName="clearfix" />
  </div>
)

Row.propTypes = {
  id: PropTypes.string.isRequired,
  hover: PropTypes.string,
  editable: PropTypes.string.isRequired,
  cells: PropTypes.array.isRequired,
  ancestors: PropTypes.array.isRequired
}

export default cssModules(Row, { ...grid, ...styles }, { allowMultiple: true })
