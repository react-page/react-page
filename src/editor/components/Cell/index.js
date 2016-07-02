import React, { PropTypes } from 'react'
import Rows from './Rows'
import Layout from './Layout'
import Content from './Content'
import Empty from './Empty'

const Cell = (props) => {
  const { rows = [], layout, plugin } = props
  if (rows.length) {
    return <Rows {...props} />
  } else if (layout) {
    return <Layout {...props} />
  } else if (plugin) {
    return <Content {...props} />
  }

  return <Empty />
}

Cell.propTypes = {
  rows: PropTypes.array.isRequired,
  layout: PropTypes.object,
  plugin: PropTypes.object
}

export default Cell
