import React, { PropTypes } from 'react'
import { BlockMath } from 'react-katex'

import 'katex/dist/katex.min.css'

const Block = ({ attributes, children, node }) => {
  const { data } = node
  const formula = data.get('formula')

  return (
    <div {...attributes} contentEditable={false}>
      <BlockMath math={formula} />
      {children}
    </div>
  )
}

Block.propTypes = {
  attributes: PropTypes.object,
  children: PropTypes.oneOf([PropTypes.func, PropTypes.element, PropTypes.array]).isRequired,
  node: PropTypes.shape({
    data: PropTypes.any
  })
}

export default Block
