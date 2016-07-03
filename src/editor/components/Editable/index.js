import React, { PropTypes } from 'react'
import Cell from 'src/editor/components/Cell'
import { editable } from 'src/editor/selector/editable'
import { connect } from 'react-redux'
import cssModules from 'react-css-modules'
import { createStructuredSelector } from 'reselect'
import styles from 'src/editor/styles/grid.scoped.css'

const Editable = ({ id, editable }) => {
  const state = editable(id)
  if (!state) {
    throw new Error(`Content state was not initialized for editable ${id}`)
  }

  return (
    <div styleName="container" className="editor-container">
      <div styleName="row" className="editor-row">
        {state.cells.map((c) => <Cell key={c.id} {...{ ...c, styles: null }} />)}
      </div>
    </div>
  )
}

Editable.propTypes = {
  id: PropTypes.string.isRequired,
  editable: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({ editable })

export default connect(mapStateToProps)(cssModules(Editable, styles))
