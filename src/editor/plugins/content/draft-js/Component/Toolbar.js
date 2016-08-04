import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { insertInlineEntity } from './actions'

const insertInlineLaTeX = (insertInlineEntity) => () => {
  insertInlineEntity(
    'INLINE_LATEX_EQUATION',
    'IMMUTABLE',
    { src: '' }
  )
}

const Toolbar = ({ insertInlineEntity }) => (
  <div>
    <button onClick={insertInlineLaTeX(insertInlineEntity)}>
      Insert Equation
    </button>
  </div>
)

Toolbar.propTypes = { insertInlineEntity: PropTypes.func }

// FIXME: this behaviour should be done w/o Redux
const mapDispatchToProps = (dispatch) => bindActionCreators({
  insertInlineEntity
}, dispatch)

export default connect(null, mapDispatchToProps)(Toolbar)
