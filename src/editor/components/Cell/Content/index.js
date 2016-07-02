import React, { PropTypes } from 'react'

const Content = ({ plugin: { Component, props = {} } }) => (
  <div>
    <Component {...props} />
  </div>
)

Content.propTypes = {
  plugin: PropTypes.shape({
    Component: PropTypes.element.isRequired,
    props: PropTypes.object.isRequired
  }).isRequired
}

export default Content
