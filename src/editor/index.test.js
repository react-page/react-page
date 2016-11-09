/* eslint-env jest */
import unexpected from 'unexpected'
import Editor from './index'

const expect = unexpected.clone()
const editor = new Editor()

const content = {
  id: '39702c61-b6c2-452e-b381-d61c8aa7eeb0',
  cells: []
}

describe('Editor', () => {
  it('should instantiate', () => {
    expect(editor, 'to be defined')
  })

  it('should throw an error when instantiated multiple times', () => {
    expect(() => new Editor(), 'to throw')
  })

  // it('should render', () => {
  //   const html = editor.renderToHtml(content)
  //   expect(html, 'to equal', '')
  // })
})
