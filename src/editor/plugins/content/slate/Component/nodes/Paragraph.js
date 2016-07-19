import React, { PropTypes } from 'react'

const Paragraph = ({ children }) => <p>{children}</p>

Paragraph.propTypes = {
  children: PropTypes.oneOf([PropTypes.func, PropTypes.element, PropTypes.array]).isRequired
}

export default Paragraph
