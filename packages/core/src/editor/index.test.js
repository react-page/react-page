/* eslint-env jest */
import unexpected from 'unexpected'

import Editor, { createEmptyState } from './index'

const expect = unexpected.clone()
const editor = new Editor()

describe('Editor', () => {
  it('should instantiate', () => {
    expect(editor, 'to be defined')
  })

  // it('should throw an error when instantiated multiple times', () => {
  //   expect(() => new Editor(), 'to throw')
  // })

  xit('should render', () => {
    const html = editor.renderToHtml(createEmptyState())
    expect(html, 'to equal', '')
  })
})
