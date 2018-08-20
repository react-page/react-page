/*
 * This file is part of ORY Editor.
 *
 * ORY Editor is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *  
 * ORY Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *  
 * You should have received a copy of the GNU Lesser General Public License
 * along with ORY Editor.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @license LGPL-3.0
 * @copyright 2016-2018 Aeneas Rekkas
 * @author Aeneas Rekkas <aeneas+oss@aeneas.io>
 *
 */

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

export default dimensions()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Inner)
)
