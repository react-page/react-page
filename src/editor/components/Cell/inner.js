import React, { PropTypes } from 'react'
import Rows from './Rows'
import Layout from './Layout'
import Content from './Content'
import Empty from './Empty'

const Inner = (props) => {
  const {
    rows = [],
    layout,
    plugin: { Component } = {}
  } = props
  if (rows.length) {
    return <Rows {...props} />
  } else if (layout) {
    return <Layout {...props} />
  } else if (Component) {
    return <Content {...props} />
  }

  return <Empty {...props} />
}

Inner.propTypes = {
  size: PropTypes.number,
  rows: PropTypes.array,
  layout: PropTypes.object,
  props: PropTypes.object,
  plugin: PropTypes.shape({
    Component: PropTypes.element
  })
}

export default Inner
