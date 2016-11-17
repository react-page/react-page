import React, { PropTypes } from 'react'
import { InlineMath } from 'react-katex'

const Inline = ({ attributes, children, node }) => {
  const { data } = node
  const formula = data.get('formula')

  return (
    <span {...attributes}>
      <InlineMath math={formula} />
      {children}
    </span>
  )
}

Inline.propTypes = {
  attributes: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.element, PropTypes.array]).isRequired,
  node: PropTypes.shape({
    data: PropTypes.any
  })
}

export default Inline
