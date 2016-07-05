import React, { PropTypes } from 'react'
import Row from 'src/editor/components/Row'

const Layout = ({ rows = [], layout: { Component, props = {} }, editable, ancestors = [] }) => (
  <Component {...props}>
    {rows.map((r) => <Row editable={editable} ancestors={ancestors} key={r.id} {...r} />)}
  </Component>
)

Layout.propTypes = {
  rows: PropTypes.array.isRequired,
  editable: PropTypes.string.isRequired,
  layout: PropTypes.shape({
    Component: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
    props: PropTypes.object
  }).isRequired
}

export default Layout
