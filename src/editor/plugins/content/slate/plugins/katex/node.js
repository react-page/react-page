import React, { PropTypes } from 'react'
import { BlockMath } from 'react-katex'

import 'katex/dist/katex.min.css'

const Katex = ({ attributes, children, node }) => {
  const { data } = node
  const src = data.get('src')

  return (
    <div {...attributes} contentEditable={false}>
      <BlockMath math={src} />
      {children}
    </div>
  )
}

Katex.propTypes = {
  attributes: PropTypes.object,
  children: PropTypes.oneOf([PropTypes.func, PropTypes.element, PropTypes.array]).isRequired,
  node: PropTypes.shape({
    data: PropTypes.any
  })
}

export default Katex
