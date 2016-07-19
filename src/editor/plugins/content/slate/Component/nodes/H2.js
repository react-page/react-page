import React, { PropTypes } from 'react'

const H2 = ({ attributes = {}, children }) => <h2 {...attributes}>{children}</h2>

H2.propTypes = {
  attributes: PropTypes.object,
  children: PropTypes.oneOf([PropTypes.func, PropTypes.element, PropTypes.array]).isRequired
}

export default H2
