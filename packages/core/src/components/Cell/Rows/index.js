// @flow
import React, { Component } from 'react'

import { shouldPureComponentUpdate } from '../../../helper/shouldComponentUpdate'
import Row from '../../../components/Row'

import type { ComponetizedCell } from '../../../types/editable'

class Rows extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate
  props: ComponetizedCell

  render() {
    const { node: { rows = [] }, editable, id, ancestors = [] } = this.props

    return (
      <div className="ory-cell-inner ory-cell-rows">
        {rows.map((r: string) => (
          <Row
            editable={editable}
            ancestors={[...ancestors, id]}
            id={r}
            key={r}
          />
        ))}
      </div>
    )
  }
}

export default Rows
