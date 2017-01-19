// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import Cell from '../../Cell'
import { shouldPureComponentUpdate } from '../../../helper/shouldComponentUpdate'
import { purifiedEditable } from '../../../selector/editable'
import dimensions from '../../Dimensions'
import { blurAllCells } from '../../../actions/cell'
import { enableGlobalBlurring, disableGlobalBlurring } from './blur'
import serverContext from '../../ServerContext/connect'

import type { EditableComponentState, Cell as CellType } from '../../../types/editable'

class Inner extends Component {
  componentDidMount() {
    enableGlobalBlurring(this.props.blurAllCells)
  }

  shouldComponentUpdate = shouldPureComponentUpdate

  componentWillUnmount() {
    disableGlobalBlurring(this.props.blurAllCells)
  }

  props: EditableComponentState

  render() {
    const { id, containerWidth, containerHeight, node } = this.props
    if (!node) {
      return null
    }

    const { cells = [] } = node
    return (
      <div className="ory-editable ory-prevent-blur">
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
    )
  }
}

const mapStateToProps = createStructuredSelector({ node: purifiedEditable })

const mapDispatchToProps = { blurAllCells }

export default serverContext()(dimensions()(connect(mapStateToProps, mapDispatchToProps)(Inner)))
