import React, { PropTypes } from 'react'
import Cell from 'src/editor/components/Cell'
import { shouldPureComponentUpdate } from 'src/editor/helper/shouldComponentUpdate'
import { editable } from 'src/editor/selector/editable'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext as dragDropContext } from 'react-dnd'
import { isLayoutMode } from 'src/editor/selector/display'
import cssModules from 'react-css-modules'

import * as commonStyles from 'src/editor/styles'
import styles from './index.scoped.css'

const inner = (styles) => cssModules(({ cells = [], id }) => (
  <div styleName="container" className="editor-container">
    <div styleName="row" className="editor-row">
      {cells.map((c) => (
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
), styles)

class Editable extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate

  render() {
    const { id, editable } = this.props
    const state = editable(id)
    if (!state) {
      throw new Error(`Content state was not initialized for editable ${id}`)
    }

  const Inner = inner({
    ...(isLayoutMode ? commonStyles.floating : commonStyles.flexbox),
    ...commonStyles.common
    ...styles
  })
  return <Inner cells={state.cells} id={id} />
}

Editable.propTypes = {
  id: PropTypes.string.isRequired,
  editable: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({ editable, isLayoutMode })

export default dragDropContext(HTML5Backend)(connect(mapStateToProps)(Editable))
