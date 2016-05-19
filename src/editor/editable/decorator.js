import { CompositeDecorator } from 'draft-js'
import React from 'react'

import { createEntityTypeStrategy } from './strategies'

const decorator = new CompositeDecorator([{
  strategy: createEntityTypeStrategy('INLINE_LATEX_EQUATION'),
  component: () => <span>inline formula</span> // eslint-disable-line
}])

export default decorator
