/* eslint-env mocha */
import unexpected from 'unexpected'
import ContentService, { hydrate } from './index'

const expect = unexpected.clone()

describe('hydrate', () => {
  it('should set missing ids recursively', () => {
    const hydrated = hydrate({
      cells: [
        {
          rows: [
            {},
            {
              cells: [
                {},
                {}
              ]
            }
          ]
        },
        {}
      ]
    })

    expect(hydrated.id, 'to be defined')
    expect(hydrated.cells[0].id, 'to be defined')
    expect(hydrated.cells[1].id, 'to be defined')

    expect(hydrated.cells[0].rows[0].id, 'to be defined')
    expect(hydrated.cells[0].rows[1].id, 'to be defined')
    expect(hydrated.cells[0].rows[1].cells[0].id, 'to be defined')
    expect(hydrated.cells[0].rows[1].cells[1].id, 'to be defined')
  })
})
