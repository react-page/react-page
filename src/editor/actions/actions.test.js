/* eslint-env mocha */
import * as cellActions from './cell'
import unexpected from 'unexpected'

const expect = unexpected.clone()

describe('actions', () => {
  const fired = []
  const creators = []
  const all = [cellActions]


  all.map((actions, x) => Object.keys(actions).forEach((key) => {
    if (typeof actions[key] === 'function') {
      creators.push(actions[key])
    }
  }))

  describe('', () => {
    all.map((actions, x) => Object.keys(actions).forEach((key) => {
      if (typeof actions[key] === 'function') {
        const { type } = actions[key]()
        describe(`action set ${x} -`, () => {
          it(`${key} (${type}) should be unique`, () => {
            expect(fired.indexOf(type) === -1, 'to be truthy')
            fired.push(type)
          })
        })
      }
    }))
  })

  describe('tests', () => {
    it('must have fired at least once', () => {
      expect(fired.length, 'to be', creators.length)
    })
  })
})
