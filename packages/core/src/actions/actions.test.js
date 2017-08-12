// @flux
import * as cellActions from './cell'
import unexpected from 'unexpected'

const expect = unexpected.clone()

describe('actions', () => {
  const fired = []
  const creators = []
  const all = [cellActions]
  const faillist = [
    'cellHoverLeftOf',
    'cellHoverRightOf',
    'cellHoverBelow',
    'cellHoverAbove',
    'cellHoverInlineRight',
    'cellHoverInlineLeft'
  ]

  all.map((actions: []) =>
    Object.keys(actions).forEach((key: string) => {
      if (typeof actions[key] === 'function') {
        creators.push(actions[key])
      }
    })
  )

  all.map((actions: []) =>
    Object.keys(actions).forEach((key: string) => {
      if (typeof actions[key] === 'function') {
        // FIXME Ugly hack to circumvent object destructor on undefined which breaks tests completely.
        const { type, ts } =
          typeof actions[key]({}, {}, {}, {}) === 'function'
            ? actions[key]({}, {}, {}, {})({}, {}, {}, {})
            : actions[key]({}, {}, {}, {})
        it(`${key} (${type}) should be unique`, () => {
          expect(
            fired.indexOf(type) === -1,
            'to be',
            faillist.indexOf(key) === -1
          )
          fired.push(type)
        })
        it(`${key} (${type}) should have a timestamp`, () => {
          expect(ts, 'to be defined')
        })
      }
    })
  )

  it('must have fired at least once', () => {
    expect(fired.length, 'to be', creators.length)
  })
})
