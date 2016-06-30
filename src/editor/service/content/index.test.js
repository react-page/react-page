/* eslint-env mocha */
import unexpected from 'unexpected'
import equal from 'deep-equal'
import ContentService, { hydrate } from './index'
import { content } from 'src/editor/service/content/adapter/debug'

const expect = unexpected.clone()
const contentService = new ContentService()

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

describe('ContentService', () => {
  it('serialize and unserialize should work', () => {
    const cleanup = ({ plugin, layout, rows = [], cells = [], ...other }) => {
      if (layout) {
        other.layout = { name: layout.name }
      }

      if (plugin) {
        other.plugin = { name: plugin.name }
      }

      if (rows.length) {
        other.rows = rows.map(cleanup)
      }

      if (cells.length) {
        other.cells = cells.map(cleanup)
      }

      return { ...other }
    }

    const c = hydrate(content['2'])
    const unserialized = contentService.unserialize(c)
    const serialized = cleanup(contentService.serialize(unserialized))
    expect(equal(serialized, c), 'to be', true)
  })
})
