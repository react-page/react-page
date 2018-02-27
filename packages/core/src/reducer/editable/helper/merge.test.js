/*
 * This file is part of ORY Editor.
 *
 * ORY Editor is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * ORY Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with ORY Editor.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @license LGPL-3.0
 * @copyright 2016-2018 Aeneas Rekkas
 * @author Aeneas Rekkas <aeneas+oss@aeneas.io>
 *
 */

import unexpected from 'unexpected'

import { mergeRows, splitRows } from './merge'

const expect = unexpected.clone()

describe('merge', () => {
  const mockPluginWithoutHooks = {
    name: 'mock-plugin-without-hooks',
    version: '0.0.1'
  }

  const mockPlugin = {
    ...mockPluginWithoutHooks,
    name: 'mock-plugin',
    merge(states) {
      return states.join('')
    },
    split(state) {
      return state.split('')
    }
  }

  describe('splitRows', () => {
    it('splits a single row', () => {
      const rows = [
        {
          id: '76fa4e06-68e0-4b4e-8a70-e0ca32174ee5',
          cells: [
            {
              id: 'd5ce3343-9a20-4a1b-a0ff-b5afe53f3f32',
              content: { plugin: mockPlugin, state: 'AB' }
            }
          ]
        }
      ]

      const expectedRows = [
        {
          id: '76fa4e06-68e0-4b4e-8a70-e0ca32174ee5#0',
          cells: [
            {
              id: 'd5ce3343-9a20-4a1b-a0ff-b5afe53f3f32#0',
              content: { plugin: mockPlugin, state: 'A' }
            }
          ]
        },
        {
          id: '76fa4e06-68e0-4b4e-8a70-e0ca32174ee5#1',
          cells: [
            {
              id: 'd5ce3343-9a20-4a1b-a0ff-b5afe53f3f32#1',
              content: { plugin: mockPlugin, state: 'B' }
            }
          ]
        }
      ]

      expect(splitRows(rows), 'to equal', expectedRows)
    })

    it('splits two rows', () => {
      const rows = [
        {
          id: '76fa4e06-68e0-4b4e-8a70-e0ca32174ee5',
          cells: [
            {
              id: 'd5ce3343-9a20-4a1b-a0ff-b5afe53f3f32',
              content: { plugin: mockPlugin, state: 'AB' }
            }
          ]
        },
        {
          id: '4ef7cd71-b392-4519-a59a-eff93f3fcb62',
          cells: [
            {
              id: '7c61097a-60cb-48e4-9a5e-745e11c632a0',
              content: { plugin: mockPluginWithoutHooks, state: 'CD' }
            }
          ]
        },
        {
          id: 'd556819d-55ec-4468-82c8-65709185bdc9',
          cells: [
            {
              id: '5425220b-0f9b-48e1-a86e-2b14be071fdc',
              content: { plugin: mockPlugin, state: 'EF' }
            }
          ]
        }
      ]

      const expectedRows = [
        {
          id: '76fa4e06-68e0-4b4e-8a70-e0ca32174ee5#0',
          cells: [
            {
              id: 'd5ce3343-9a20-4a1b-a0ff-b5afe53f3f32#0',
              content: { plugin: mockPlugin, state: 'A' }
            }
          ]
        },
        {
          id: '76fa4e06-68e0-4b4e-8a70-e0ca32174ee5#1',
          cells: [
            {
              id: 'd5ce3343-9a20-4a1b-a0ff-b5afe53f3f32#1',
              content: { plugin: mockPlugin, state: 'B' }
            }
          ]
        },
        {
          id: '4ef7cd71-b392-4519-a59a-eff93f3fcb62',
          cells: [
            {
              id: '7c61097a-60cb-48e4-9a5e-745e11c632a0',
              content: { plugin: mockPluginWithoutHooks, state: 'CD' }
            }
          ]
        },
        {
          id: 'd556819d-55ec-4468-82c8-65709185bdc9#0',
          cells: [
            {
              id: '5425220b-0f9b-48e1-a86e-2b14be071fdc#0',
              content: { plugin: mockPlugin, state: 'E' }
            }
          ]
        },
        {
          id: 'd556819d-55ec-4468-82c8-65709185bdc9#1',
          cells: [
            {
              id: '5425220b-0f9b-48e1-a86e-2b14be071fdc#1',
              content: { plugin: mockPlugin, state: 'F' }
            }
          ]
        }
      ]

      expect(splitRows(rows), 'to equal', expectedRows)
    })
  })

  describe('mergeRows', () => {
    it('merges two rows that each contain the same mergable plugin', () => {
      const rows = [
        {
          id: '76fa4e06-68e0-4b4e-8a70-e0ca32174ee5#0',
          cells: [
            {
              id: '7c61097a-60cb-48e4-9a5e-745e11c632a0#0',
              content: { plugin: mockPlugin, state: 'A' }
            }
          ]
        },
        {
          id: '76fa4e06-68e0-4b4e-8a70-e0ca32174ee5#1',
          cells: [
            {
              id: '7c61097a-60cb-48e4-9a5e-745e11c632a0#1',
              content: { plugin: mockPlugin, state: 'B' }
            }
          ]
        }
      ]

      expect(mergeRows(rows), 'to equal', [
        {
          id: '76fa4e06-68e0-4b4e-8a70-e0ca32174ee5',
          cells: [
            {
              id: '7c61097a-60cb-48e4-9a5e-745e11c632a0',
              content: { plugin: mockPlugin, state: 'AB' }
            }
          ]
        }
      ])
    })

    it('merges all consecutive rows that contain the same mergable plugin', () => {
      const rows = [
        {
          id: '76fa4e06-68e0-4b4e-8a70-e0ca32174ee5#0',
          cells: [
            {
              id: '53e7fd5f-b135-4850-a0d8-3823557060b3#0',
              content: { plugin: mockPlugin, state: 'A' }
            }
          ]
        },
        {
          id: '76fa4e06-68e0-4b4e-8a70-e0ca32174ee5#1',
          cells: [
            {
              id: '53e7fd5f-b135-4850-a0d8-3823557060b3#1',
              content: { plugin: mockPlugin, state: 'B' }
            }
          ]
        },
        {
          id: 'd5ce3343-9a20-4a1b-a0ff-b5afe53f3f32#3',
          cells: [
            {
              id: '0a783734-3c15-417c-b463-513b14bf3971',
              content: { plugin: mockPluginWithoutHooks, state: 'C' }
            }
          ]
        },
        {
          id: '10fb956a-af49-4131-b409-50e2aff4a1a1#0',
          cells: [
            {
              id: 'd556819d-55ec-4468-82c8-65709185bdc9',
              content: { plugin: mockPlugin, state: 'D' }
            }
          ]
        },
        {
          id: '0a783734-3c15-417c-b463-513b14bf3971',
          cells: [
            {
              id: '0577b5d6-5a4f-4868-b499-1b55357cec5f',
              content: { plugin: mockPlugin, state: 'E' }
            }
          ]
        }
      ]

      expect(mergeRows(rows), 'to equal', [
        {
          id: '76fa4e06-68e0-4b4e-8a70-e0ca32174ee5',
          cells: [
            {
              id: '53e7fd5f-b135-4850-a0d8-3823557060b3',
              content: { plugin: mockPlugin, state: 'AB' }
            }
          ]
        },
        {
          id: 'd5ce3343-9a20-4a1b-a0ff-b5afe53f3f32',
          cells: [
            {
              id: '0a783734-3c15-417c-b463-513b14bf3971',
              content: { plugin: mockPluginWithoutHooks, state: 'C' }
            }
          ]
        },
        {
          id: '10fb956a-af49-4131-b409-50e2aff4a1a1',
          cells: [
            {
              id: 'd556819d-55ec-4468-82c8-65709185bdc9',
              content: { plugin: mockPlugin, state: 'DE' }
            }
          ]
        }
      ])
    })

    it('does not merge rows that contain the same mergable plugin with different version', () => {
      const mockPluginwithDifferentVersion = {
        ...mockPlugin,
        version: '0.0.2'
      }

      const rows = [
        {
          id: '76fa4e06-68e0-4b4e-8a70-e0ca32174ee5',
          cells: [{ content: { plugin: mockPlugin, state: 'A' } }]
        },
        {
          id: 'd5ce3343-9a20-4a1b-a0ff-b5afe53f3f32',
          cells: [
            { content: { plugin: mockPluginwithDifferentVersion, state: 'B' } }
          ]
        }
      ]

      expect(mergeRows(rows), 'to equal', rows)
    })

    it('does not merge rows that contain the same non-mergable plugins', () => {
      const rows = [
        {
          id: '76fa4e06-68e0-4b4e-8a70-e0ca32174ee5',
          cells: [
            {
              id: 'd556819d-55ec-4468-82c8-65709185bdc9',
              content: { plugin: mockPluginWithoutHooks, state: 'A' }
            }
          ]
        },
        {
          id: 'd5ce3343-9a20-4a1b-a0ff-b5afe53f3f32',
          cells: [
            {
              id: '0577b5d6-5a4f-4868-b499-1b55357cec5f',
              content: { plugin: mockPluginWithoutHooks, state: 'B' }
            }
          ]
        }
      ]

      expect(mergeRows(rows), 'to equal', rows)
    })

    it('does not merge rows that contain multiple cells', () => {
      const rows = [
        {
          id: '76fa4e06-68e0-4b4e-8a70-e0ca32174ee5',
          cells: [
            {
              id: 'd556819d-55ec-4468-82c8-65709185bdc9',
              content: { plugin: mockPlugin, state: 'A' }
            },
            {
              id: '0577b5d6-5a4f-4868-b499-1b55357cec5f',
              content: { plugin: mockPlugin, state: 'B' }
            }
          ]
        },
        {
          id: 'd5ce3343-9a20-4a1b-a0ff-b5afe53f3f32',
          cells: [
            {
              id: 'd5ce3343-9a20-4a1b-a0ff-b5afe53f3f32',
              content: { plugin: mockPlugin, state: 'C' }
            }
          ]
        }
      ]

      expect(mergeRows(rows), 'to equal', rows)
    })
  })
})
