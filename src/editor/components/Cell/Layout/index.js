import React, { PropTypes } from 'react'
import { shouldPureComponentUpdate } from 'src/editor/helper/shouldComponentUpdate'
import Row from 'src/editor/components/Row'

class Layout extends React.Component {
  shouldComponentUpdate = shouldPureComponentUpdate

  render() {
    const {
      id, rows = [], layout: { Component, props = {} }, editable, ancestors = []
    } = this.props

    return (
      <Component {...props}>
        {rows.map((r) => <Row editable={editable} ancestors={[...ancestors, id]} key={r.id} {...r} />)}
      </Component>
    )
  }
}

Layout.propTypes = {
  rows: PropTypes.array.isRequired,
  editable: PropTypes.string.isRequired,
  layout: PropTypes.shape({
    Component: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
    props: PropTypes.object
  }).isRequired
}

export default Layout
