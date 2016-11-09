/* eslint-disable prefer-reflect */
import Plugin from '../Plugin'
import Paragraph from './node'

export const P = 'paragraph/paragraph'

export default class ParagraphPlugin extends Plugin {
  name = 'paragraph'

  nodes = { [P]: Paragraph }
}
