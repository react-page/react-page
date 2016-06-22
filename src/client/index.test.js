/* eslint-env mocha */
import unexpected from "unexpected";

const expect = unexpected.clone()

describe('Editor', () => {
  it('`true` is `true`', () => {
    expect(true, 'to be true')
  })
})
