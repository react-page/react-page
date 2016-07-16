import React, { Component, PropTypes } from 'react'
import { shouldPureComponentUpdate } from 'src/editor/helper/shouldComponentUpdate'
import Row from 'src/editor/components/Row'

class Rows extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate

  render() {
    const { rows = [], editable, id, ancestors = [] } = this.props

    return (
      <div>
        {rows.map((r) => <Row editable={editable} ancestors={[...ancestors, id]} key={r.id} {...r} />)}
      </div>
    )
  }
}

Rows.propTypes = {
  rows: PropTypes.array.isRequired,
  ancestors: PropTypes.array.isRequired,
  editable: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
}

export default Rows
