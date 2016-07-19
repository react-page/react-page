import React, { PropTypes } from 'react'

const H3 = ({ attributes = {}, children }) => <h3 {...attributes}>{children}</h3>

H3.propTypes = {
  attributes: PropTypes.object,
  children: PropTypes.oneOf([PropTypes.func, PropTypes.element, PropTypes.array]).isRequired
}

export default H3
