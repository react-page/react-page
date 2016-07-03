import React, { PropTypes } from 'react'
import Row from 'src/editor/components/Row'

const Layout = ({ rows = [], layout: { Component, props = {} } }) => (
  <Component {...props}>
    {rows.map((r) => <Row key={r.id} {...r} />)}
  </Component>
)

Layout.propTypes = {
  rows: PropTypes.array.isRequired,
  layout: PropTypes.shape({
    Component: PropTypes.element.isRequired,
    props: PropTypes.object.isRequired
  }).isRequired
}

export default Layout
