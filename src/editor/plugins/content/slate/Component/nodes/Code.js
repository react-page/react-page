import React, { PropTypes } from 'react'

const CodeNode = (props) => <pre {...props.attributes}><code>{props.children}</code></pre>

CodeNode.propTypes = {
  attributes: PropTypes.object,
  children: PropTypes.oneOf([PropTypes.func, PropTypes.element, PropTypes.array]).isRequired
}

export default CodeNode
