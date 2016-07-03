import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { insertInlineEntity, insertBlockEntity } from './actions'

const insertInlineLaTeX = (insertInlineEntity) => () => {
  insertInlineEntity(
    'INLINE_LATEX_EQUATION',
    'IMMUTABLE',
    { src: '' }
  )
}

const insertBlockLaTeX = (insertBlockEntity) => () => {
  insertBlockEntity(
    'BLOCK_LATEX_EQUATION',
    'IMMUTABLE',
    { src: '' }
  )
}

const Toolbar = ({ insertInlineEntity, insertBlockEntity }) => (
  <div>
    <button onClick={insertInlineLaTeX(insertInlineEntity)}>
      Insert Equation
    </button>
    <button onClick={insertBlockLaTeX(insertBlockEntity)}>
      Insert Block Equation
    </button>
  </div>
)

Toolbar.propTypes = {
  insertInlineEntity: PropTypes.func,
  insertBlockEntity: PropTypes.func
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  insertInlineEntity,
  insertBlockEntity
}, dispatch)

export default connect(null, mapDispatchToProps)(Toolbar)
