import React, { PropTypes } from 'react'
import Row from 'src/editor/components/Row'

const Layout = ({ rows = [], layout: { Component, props = {} } }) => (
  <Component {...props}>
    {rows.map(({ id, ...c }) => <Row key={id} {...c} />)}
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
