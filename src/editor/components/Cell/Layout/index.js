// @flow
import React, { PropTypes } from 'react'
import { shouldPureComponentUpdate } from 'src/editor/helper/shouldComponentUpdate'
import Row from 'src/editor/components/Row'
import type { Row as RowType, ComponetizedCell } from 'types/editable'

class Layout extends React.Component {
  shouldComponentUpdate = shouldPureComponentUpdate

  render() {
    const {
      id,
      node: {
        rows = [],
        layout: {
          plugin: {
            Component
          },
          state = {}
        }
      },
      editable, ancestors = []
    }: ComponetizedCell = this.props

    return (
      <Component state={state}>
        {rows.map((r: RowType) => <Row editable={editable} ancestors={[...ancestors, id]} key={r} id={r} />)}
      </Component>
    )
  }
}

Layout.propTypes = {
  id: PropTypes.string.isRequired,
  ancestors: PropTypes.array.isRequired,
  node: PropTypes.shape({
    rows: PropTypes.array.isRequired,
    layout: PropTypes.shape({
      Component: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
      props: PropTypes.object
    }).isRequired
  }).isRequired,
  editable: PropTypes.string.isRequired,
}

export default Layout
