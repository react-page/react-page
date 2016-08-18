// @flow
import React, { Component, PropTypes } from 'react'
import { shouldPureComponentUpdate } from 'src/editor/helper/shouldComponentUpdate'
import Row from 'src/editor/components/Row'
import { Row as RowType } from 'types/editable'

class Rows extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate

  render() {
    const { node: { rows = [] }, editable, id, ancestors = [] } = this.props

    return (
      <div>
        {rows.map((r: RowType) => <Row editable={editable} ancestors={[...ancestors, id]} id={r} key={r} />)}
      </div>
    )
  }
}

Rows.propTypes = {
  node: PropTypes.shape({
    rows: PropTypes.array.isRequired
  }),
  ancestors: PropTypes.array.isRequired,
  editable: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
}

export default Rows
