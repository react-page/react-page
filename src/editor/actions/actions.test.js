/* eslint-env mocha */
import * as cellActions from './cell'
import unexpected from 'unexpected'

const expect = unexpected.clone()

describe('actions', () => {
  const fired = []
  const creators = []
  const all = [cellActions]

  all.map((actions) => Object.keys(actions).forEach((key) => {
    if (typeof actions[key] === 'function') {
      creators.push(actions[key])
    }
  }))

  all.map((actions) => Object.keys(actions).forEach((key) => {
    if (typeof actions[key] === 'function') {
      const { type } = actions[key]()
      it(`${key} (${type}) should be unique`, () => {
        expect(fired.indexOf(type) === -1, 'to be truthy')
        fired.push(type)
      })
    }
  }))

  it('must have fired at least once', () => {
    expect(fired.length, 'to be', creators.length)
  })
})
