/* eslint-env mocha */
import unexpected from 'unexpected'

const expect = unexpected.clone()

describe('Editor', () => {
  it('`true` is `false`', () => {
    expect(true, 'to be false')
  })
})
