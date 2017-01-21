import unexpected from 'unexpected'

import Editor from './index'

const expect = unexpected.clone()
const editor = new Editor()

describe('Editor', () => {
  it('should instantiate', () => {
    expect(editor, 'to be defined')
  })
})
