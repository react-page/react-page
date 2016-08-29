// @flow
import React, { PropTypes, Component } from 'react'
import Cell from 'src/editor/components/Cell'
import { shouldPureComponentUpdate } from 'src/editor/helper/shouldComponentUpdate'
import { purifiedEditable } from 'src/editor/selector/editable'
import { connect } from 'react-redux'
import { isLayoutMode, isResizeMode } from 'src/editor/selector/display'
import { createStructuredSelector } from 'reselect'
import cssModules from 'react-css-modules'
import dimensions from 'react-dimensions'
import Notifier from 'src/editor/components/Notifier'

import type { EditableComponentState, Cell as CellType } from 'types/editable'

import * as commonStyles from 'src/editor/styles'
import styles from './index.scoped.css'

class Editable extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate

  render() {
    const { id, containerWidth, containerHeight, isLayoutMode, isResizeMode, node: { cells = [] }, ...props }: EditableComponentState = this.props

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
          {cells.map((c: string | CellType) => (
            <Cell
              rowWidth={containerWidth}
              rowHeight={containerHeight}
              editable={id}
              ancestors={[]}
              key={c}
              id={c}
            />
          ))}
        </div>
        <Notifier />
      </div>
    )
  }
}

Editable.propTypes = {
  id: PropTypes.string.isRequired,
  isLayoutMode: PropTypes.bool.isRequired,
  isResizeMode: PropTypes.bool.isRequired,
  node: PropTypes.object.isRequired,
  containerWidth: PropTypes.number.isRequired,
  containerHeight: PropTypes.number.isRequired
}

const mapStateToProps = createStructuredSelector({ node: purifiedEditable, isLayoutMode, isResizeMode })

export default dimensions()(connect(mapStateToProps)(cssModules(Editable, {
  ...commonStyles.floating,
  ...commonStyles.common,
  ...styles
})))
