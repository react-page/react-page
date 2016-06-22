import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import Cell from 'src/common/components/Cell';
import { DropTarget } from 'react-dnd';
import { ROW } from 'src/common/items';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { rowAncestorHover } from 'src/common/actions/row';
import { isLayoutMode } from 'src/common/selectors/mode';

import './row.css'

const rowTarget = {
  drop(props, monitor, component) {
  }
}

const dnd = {
  connect: (connect, monitor) => ({
    connectDropTarget: connect.dropTarget()
    //isOverCurrent: monitor.isOver({shallow: true})
  })
}

const Row = ({ connectDropTarget, cells = [], level, id, hover }) => connectDropTarget(
  <div className={hover ? `editable-row drag-hover drag-hover-${hover}` : 'editable-row '}>
    <div className="row">
      {
        cells.map((cell) => (
          <Cell {...cell}
            siblings={cells.filter((c) => cell.id !== c.id)}
            key={cell.id}
            level={level}/>
        ))
      }
    </div>
  </div>
)

Row.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  cells: PropTypes.array.isRequired,
  level: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  hover: PropTypes.string
}

const mapStateToProps = createStructuredSelector({
  isLayoutMode
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  rowAncestorHover
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DropTarget(ROW, rowTarget, dnd.connect)(Row))