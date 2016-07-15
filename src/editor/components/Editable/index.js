import React, { PropTypes } from 'react'
import Cell from 'src/editor/components/Cell'
import { shouldPureComponentUpdate } from 'src/editor/helper/shouldComponentUpdate'
import { editable } from 'src/editor/selector/editable'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext as dragDropContext } from 'react-dnd'
import grid from 'src/editor/styles/grid.scoped.css'
import flexbox from 'flexboxgrid/css/flexboxgrid.css'
import { isLayoutMode } from 'src/editor/selector/display'


class Editable extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate

  render() {
    const { id, editable } = this.props
    const state = editable(id)
    if (!state) {
      throw new Error(`Content state was not initialized for editable ${id}`)
    }

  //const Inner = inner(isLayoutMode ? grid : flexbox)

  return (
    <div styleName="container" className="editor-container">
      <div styleName="row" className="editor-row">
        {state.cells.map((c) => (
          <Cell
            editable={id}
            ancestors={[]}
            key={c.id}
            {...{ ...c, styles: null }}
          />
        ))}
        <div styleName="clearfix"/>
      </div>
    </div>
  )
}

Editable.propTypes = {
  id: PropTypes.string.isRequired,
  editable: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({ editable, isLayoutMode })

export default dragDropContext(HTML5Backend)(connect(mapStateToProps)(cssModules(Editable, grid)))
