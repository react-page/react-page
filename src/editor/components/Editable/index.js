import React, { PropTypes, Component } from 'react'
import Cell from 'src/editor/components/Cell'
import { shouldPureComponentUpdate } from 'src/editor/helper/shouldComponentUpdate'
import { purifiedEditable } from 'src/editor/selector/editable'
import { connect } from 'react-redux'
import { isLayoutMode, isResizeMode } from 'src/editor/selector/display'
import { createStructuredSelector } from 'reselect'
import cssModules from 'react-css-modules'

import * as commonStyles from 'src/editor/styles'
import styles from './index.scoped.css'

class Editable extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate

  render() {
    const { id, isLayoutMode, isResizeMode, ...props, editable: { cells = [] } = {} } = this.props

    if (isLayoutMode || isResizeMode) {
      props.styles = {
        ...props.styles,
        ...commonStyles.flexbox,
        ...styles // override defaults
      }
    }

    return (
      <div styles={props.styles} className="editor-container">
        <div styles={props.styles} styleName="row" className="editor-row">
          {cells.map((c) => (
            <Cell
              editable={id}
              ancestors={[]}
              key={c}
              id={c}
            />
          ))}
        </div>
      </div>
    )
  }
}

Editable.propTypes = {
  id: PropTypes.string.isRequired,
  isLayoutMode: PropTypes.bool.isRequired,
  isResizeMode: PropTypes.bool.isRequired,
  cells: PropTypes.array.isRequired,
  editable: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({ editable: purifiedEditable, isLayoutMode, isResizeMode })

export default connect(mapStateToProps)(cssModules(Editable, {
  ...commonStyles.floating,
  ...commonStyles.common,
  ...styles
}))
