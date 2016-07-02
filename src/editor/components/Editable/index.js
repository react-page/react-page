import React, { PropTypes } from 'react'
import Cell from 'src/editor/components/Cell'
import { editable } from 'src/editor/selector/editable'
import { connect } from 'react-redux'

const Editable = ({ id, editable }) => {
  const state = editable(id)
  if (!state) {
    throw new Error(`Content state was not initialized for editable ${id}`)
  }

  return <div>{state.cells.map(({ id, ...c }) => <Cell key={id} {...c} />)}</div>
}

Editable.propTypes = {
  cells: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  editable: editable(state)
})

export default connect(mapStateToProps)(Editable)
