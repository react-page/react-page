// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { ContentPlugin } from '../../../service/plugin/classes'
import Cell from '../../Cell'
import { shouldPureComponentUpdate } from '../../../helper/shouldComponentUpdate'
import { purifiedEditable } from '../../../selector/editable'
import dimensions from '../../Dimensions'
import { blurAllCells, createFallbackCell } from '../../../actions/cell'
import { enableGlobalBlurring, disableGlobalBlurring } from './blur'

import type { EditableComponentState } from '../../../types/editable'

class Inner extends Component {
  componentDidMount() {
    enableGlobalBlurring(this.props.blurAllCells)
    this.createFallbackCell()
  }

  shouldComponentUpdate = shouldPureComponentUpdate

  componentDidUpdate() {
    this.createFallbackCell()
  }

  componentWillUnmount() {
    disableGlobalBlurring(this.props.blurAllCells)
  }

  createFallbackCell = () => {
    const { node, createFallbackCell, defaultPlugin, id } = this.props
    if (!node) {
      return
    }

    const { cells = [] } = node
    if (cells.length === 0) {
      createFallbackCell(new ContentPlugin(defaultPlugin), id)
    }
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
        {cells.map((c: string) => (
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

const mapDispatchToProps = { blurAllCells, createFallbackCell }

export default dimensions()(connect(mapStateToProps, mapDispatchToProps)(Inner))
