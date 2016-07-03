import { Entity } from 'draft-js'
import BlockMath, { BlockMathEditor } from './plugins/math/BlockMath'
import createBlockPlugin from './custom/BlockPlugin'

const BlockLatex = createBlockPlugin(BlockMath, BlockMathEditor)

export default (block) => {
  switch (block.getType()) {
    case 'atomic':
      {
        const entityKey = block.getEntityAt(0)
        const entity = Entity.get(entityKey)

        switch (entity.getType()) {
          case 'BLOCK_LATEX_EQUATION':
            return {
              component: BlockLatex,
              props: { entityKey }
            }
          default:
            return null
        }
      }
    default:
      return null
  }
}
