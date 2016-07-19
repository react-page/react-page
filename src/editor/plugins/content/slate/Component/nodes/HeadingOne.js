import React, { PropTypes } from 'react'

const HeadingOne = ({ children }) => <h1>{children}</h1>

HeadingOne.propTypes = {
  children: PropTypes.oneOf([PropTypes.func, PropTypes.element, PropTypes.array]).isRequired
}

export default HeadingOne
