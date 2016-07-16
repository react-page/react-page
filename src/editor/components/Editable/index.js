import React, { PropTypes } from 'react'
import Cell from 'src/editor/components/Cell'
import { shouldPureComponentUpdate } from 'src/editor/helper/shouldComponentUpdate'
import { editable } from 'src/editor/selector/editable'
import { connect } from 'react-redux'
import { isLayoutMode } from 'src/editor/selector/display'
import { createStructuredSelector } from 'reselect'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext as dragDropContext } from 'react-dnd'
import cssModules from 'react-css-modules'

import * as commonStyles from 'src/editor/styles'
import styles from './index.scoped.css'

class Editable extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate

  render() {
    const { id, editable, isLayoutMode, ...props } = this.props
    const state = editable(id)
    if (!state) {
      throw new Error(`Content state was not initialized for editable ${id}`)
    }

  if (isLayoutMode) {
    props.styles = {
      ...props.styles,
      ...commonStyles.flexbox,
      ...styles // override defaults
    }
  }

    return (
    <div styles={props.styles} className="editor-container">
      <div styles={props.styles} styleName="row" className="editor-row">
          {state.cells.map((c) => <Cell editable={id} ancestors={[]} key={c.id} {...{ ...c, styles: null }} />)}
        </div>
      </div>
    )
  }
}

Editable.propTypes = {
  id: PropTypes.string.isRequired,
  styles: PropTypes.object.isRequired,
  editable: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({ editable, isLayoutMode })

export default dragDropContext(HTML5Backend)(connect(mapStateToProps)(cssModules(Editable, {
  ...commonStyles.floating,
  ...commonStyles.common,
  ...styles
})))
