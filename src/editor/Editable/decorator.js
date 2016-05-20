import { CompositeDecorator } from 'draft-js'

import InlineMath, { InlineMathEditor } from 'src/plugins/math/InlineMath'
import createModalPlugin from './custom/ModalPlugin'
import { createEntityTypeStrategy } from './strategies'

const decorator = new CompositeDecorator([{
  strategy: createEntityTypeStrategy('INLINE_LATEX_EQUATION'),
  component: createModalPlugin(
    InlineMath,
    InlineMathEditor
  )
}])

export default decorator
