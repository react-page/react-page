import React, { PropTypes } from 'react'

const Code = ({ attributes, children }) => (
  <pre {...attributes} style={{ overflow: 'scroll' }}>
    <code>{children}</code>
  </pre>
)

Code.propTypes = {
  attributes: PropTypes.object,
  children: PropTypes.oneOf([PropTypes.func, PropTypes.element, PropTypes.array]).isRequired
}

export default Code
