/* eslint-env mocha */
import { editable } from './index'
import unexpected from 'unexpected'
import { combineReducers, createStore } from 'redux'
import { identity } from 'ramda'
import * as actions from 'src/editor/actions/cell'
import { computeSizes, computeResponsive, computeBounds, computeResizeable, computeInlines } from './helper/sizing'

const expect = unexpected.clone()

const cells = (state) => computeInlines(computeResizeable(computeBounds(computeResponsive(computeSizes(state)))).map(({ rows = [], hover = null, ...c }) => ({
  ...c,
  rows,
  hover
})))

const rows = (state) => state.map(({ ...r, hover = null }) => ({ ...r, hover }))

const defaultState = {
  editable: {
    cells: [
      {
        id: '0',
        rows: [
          {
            id: '00',
            cells: [
              { id: '000', plugin: 'foo' }
            ]
          },
          {
            id: '01',
            cells: [
              { id: '010', plugin: 'bar' }
            ]
          }
        ]
      }
    ]
  }
}

const insertCell = {
  id: 'i',
  plugin: 'insert-baz'
}


describe('editor/reducer/editable', () => {
  [{
    d: 'basic',
    s: { editable: {} },
    a: () => ({ type: 'foo' }),
    e: { editable: { cells: [] } }
  }, {
    d: 'cleanup does not remove layout nodes when having one child, nested',
    s: {
      editable: {
        cells: [{
          id: '0',
          rows: [{
            cells: [{
              rows: [{
                cells: [{
                  id: 'layout',
                  layout: true,
                  rows: [{
                    id: '00',
                    cells: [{
                      rows: [{
                        cells: [{ id: '000', plugin: 'foo' }]
                      }]
                    }]
                  }]
                }]
              }]
            }]
          }]
        }]
      }
    },
    a: () => ({ type: 'foo' }),
    e: {
      editable: {
        cells: cells([{
          id: '0',
          rows: rows([{
            cells: cells([{
              id: 'layout',
              layout: true,
              rows: rows([{
                id: '00',
                cells: cells([{ id: '000', plugin: 'foo' }])
              }])
            }])
          }])
        }])
      }
    }
  }, {
    d: 'cleanup does not remove layout nodes when having multiple cells in one row, nested',
    s: {
      editable: {
        cells: [{
          id: '0',
          rows: [{
            cells: [{
              rows: [{
                cells: [{
                  id: 'layout',
                  layout: true,
                  rows: [{
                    cells: [{
                      rows: [{
                        id: '00',
                        cells: [{ id: '000', plugin: 'foo' }]
                      }, {
                        id: '01',
                        cells: [{ id: '010', plugin: 'bar' }]
                      }]
                    }]
                  }]
                }]
              }]
            }]
          }]
        }]
      }
    },
    a: () => ({ type: 'foo' }),
    e: {
      editable: {
        cells: cells([{
          id: '0',
          rows: rows([{
            cells: cells([{
              id: 'layout',
              layout: true,
              rows: rows([{
                id: '00',
                cells: cells([{ id: '000', plugin: 'foo' }])
              }, {
                id: '01',
                cells: cells([{ id: '010', plugin: 'bar' }])
              }])
            }])
          }])
        }])
      }
    }
  }, {
    d: 'cell update',
    s: {
      editable: {
        id: '1',
        cells: cells([{ id: '2', plugin: 'foo' }])
      }
    },
    a: () => actions.updateCell({ id: '2' }, 'foo'),
    e: {
      editable: {
        id: '1',
        cells: cells([{ id: '2', plugin: 'foo', props: 'foo' }])
      }
    }
  }, {
    d: 'cell remove',
    s: {
      editable: {
        id: '1',
        cells: cells([{ id: '2', plugin: 'foo', hover: true }])
      }
    },
    a: () => actions.removeCell({ id: '2' }),
    e: { editable: { id: '1', cells: [] } }
  }, {
    d: 'cell cancel drag',
    s: {
      editable: {
        id: '1',
        cells: cells([{ id: '2', plugin: 'foo', hover: true }])
      }
    },
    a: () => actions.cancelCellDrag({ id: '2' }),
    e: {
      editable: {
        id: '1',
        cells: cells([{ id: '2', plugin: 'foo' }])
      }
    }
  }, {
    d: 'cell resize',
    s: {
      editable: {
        cells: [{
          id: '0',
          rows: [
            {
              id: '00',
              cells: [
                { id: '000', plugin: 'foo', size: 6 },
                { id: '001', plugin: 'bar', size: 6 }
              ]
            }
          ]
        }]
      }
    },
    a: () => actions.resizeCell({ id: '000' }, 4),
    e: {
      editable: {
        cells: cells([{
          id: '0',
          rows: rows([{
            id: '00',
            cells: [{
              id: '000',
              hover: null,
              inline: null,
              plugin: 'foo',
              rows: [],
              resizable: true,
              size: 4,
              bounds: { left: 0, right: 11 },
              responsive: [12, 12]
            }, {
              id: '001',
              hover: null,
              inline: null,
              resizable: false,
              plugin: 'bar',
              rows: [],
              size: 8,
              bounds: { left: 11, right: 0 },
              responsive: [12, 12]
            }]
          }])
        }])
      }
    }
  }, {
    d: 'cell hover row',
    s: defaultState,
    a: () => actions.cellHoverLeftOf({ id: '' }, { id: '000' }, 1),
    e: {
      editable: {
        cells: cells([{
          id: '0',
          rows: rows([{
            id: '00',
            hover: 'left-of',
            cells: cells([{ id: '000', plugin: 'foo' }])
          }, {
            id: '01',
            cells: cells([{ id: '010', plugin: 'bar' }])
          }])
        }])
      }
    }
  }, {
    d: 'cell hover ancestor cell',
    s: defaultState,
    a: () => actions.cellHoverRightOf({ id: '' }, { id: '000' }, 2),
    e: {
      editable: {
        cells: cells([{
          id: '0',
          hover: 'right-of',
          rows: rows([{
            id: '00',
            cells: cells([{ id: '000', plugin: 'foo' }])
          }, {
            id: '01',
            cells: cells([{ id: '010', plugin: 'bar' }])
          }])
        }])
      }
    }
  }, {
    d: 'cell insert right of, deeply nested, proper cleanup',
    s: {
      editable: {
        cells: [{
          id: '0',
          rows: [{
            cells: [{
              rows: [{
                cells: [{
                  rows: [{
                    cells: [{
                      rows: [{
                        id: '00',
                        cells: [{ id: '000', plugin: 'foo' }]
                      }, {
                        id: '01',
                        cells: [{ id: '010', plugin: 'bar' }]
                      }]
                    }]
                  }]
                }]
              }]
            }]
          }]
        }]
      }
    },
    a: () => actions.insertCellRightOf(insertCell, { id: '000' }, 0, ['i0', 'i00', 'i000', 'i0000', 'i00000']),
    e: {
      editable: {
        cells: cells([{
          id: '0',
          rows: rows([{
            id: '00',
            cells: cells([{ id: 'i0', plugin: 'foo' }, { ...insertCell, id: 'i00' }])
          }, {
            id: '01',
            cells: cells([{ id: '010', plugin: 'bar' }])
          }])
        }])
      }
    }
  }, {
    d: 'anti-recursion test: cell insert below of two level',
    s: {
      editable: {
        cells: [{
          id: '0',
          rows: [{
            cells: [{
              rows: [{
                cells: [{
                  rows: [{
                    cells: [{
                      rows: [{
                        id: '00',
                        cells: [{ id: '000', plugin: 'foo' }]
                      }, {
                        id: '01',
                        cells: [{ id: '010', plugin: 'bar' }]
                      }]
                    }]
                  }]
                }]
              }]
            }]
          }]
        }]
      }
    },
    a: () => actions.insertCellBelow(insertCell, { id: '000' }, 2, ['i0', 'i00', 'i000', 'i0000', 'i00000']),
    e: {
      editable: {
        cells: cells([{
          id: 'i0',
          rows: rows([{
            id: '00',
            cells: cells([{ id: '000', plugin: 'foo' }])
          }, {
            id: '01',
            cells: cells([{ id: '010', plugin: 'bar' }])
          }, {
            id: 'i0000',
            cells: cells([{ ...insertCell, id: 'i00000' }])
          }])
        }])
      }
    }
  }, {
    d: 'cell insert right of cell 2',
    s: defaultState,
    a: () => actions.insertCellRightOf(insertCell, { id: '000' }, 0, ['i0', 'i00', 'i000', 'i0000', 'i00000']),
    e: {
      editable: {
        cells: cells([{
          id: '0',
          rows: rows([{
            id: '00',
            cells: cells([{ id: 'i0', plugin: 'foo' }, { ...insertCell, id: 'i00' }])
          }, {
            id: '01',
            cells: cells([{ id: '010', plugin: 'bar' }])
          }])
        }])
      }
    }
  }, {
    d: 'cell insert below of cell - one level deep (row)',
    s: defaultState,
    a: () => actions.insertCellBelow(insertCell, { id: '000' }, 1, ['i0', 'i00', 'i000', 'i0000', 'i00000']),
    e: {
      editable: {
        cells: cells([{
          id: '0',
          rows: rows([{
            id: 'i0',
            cells: cells([{ id: '000', plugin: 'foo' }])
          }, {
            id: 'i00',
            cells: cells([{ ...insertCell, id: 'i000' }])
          }, {
            id: '01',
            cells: cells([{ id: '010', plugin: 'bar' }])
          }])
        }])
      }
    }
  }, {
    d: 'cell insert left of cell - one level deep (row)',
    s: defaultState,
    a: () => actions.insertCellLeftOf(insertCell, { id: '000' }, 1, ['i0', 'i00', 'i000', 'i0000', 'i00000']),
    e: {
      editable: {
        cells: cells([{
          id: '0',
          rows: rows([{
            id: '00',
            cells: cells([{ ...insertCell, id: 'i0' }, { id: '000', plugin: 'foo' }])
          }, {
            id: '01',
            cells: cells([{ id: '010', plugin: 'bar' }])
          }])
        }])
      }
    }
  }, {
    d: 'cell insert left of cell',
    s: defaultState,
    a: () => actions.insertCellLeftOf(insertCell, { id: '000' }, 0, ['i0', 'i00', 'i000', 'i0000', 'i00000']),
    e: {
      editable: {
        cells: cells([{
          id: '0',
          rows: rows([{
            id: '00',
            cells: cells([{ ...insertCell, id: 'i0' }, { id: 'i00', plugin: 'foo' }])
          }, {
            id: '01',
            cells: cells([{ id: '010', plugin: 'bar' }])
          }])
        }])
      }
    }
  }, {
    d: 'cell insert above cell',
    s: defaultState,
    a: () => actions.insertCellAbove(insertCell, { id: '000' }, 0, ['i0', 'i00', 'i000', 'i0000', 'i00000']),
    e: {
      editable: {
        cells: cells([{
          id: '0',
          rows: rows([{
            id: 'i00',
            cells: cells([{ ...insertCell, id: 'i000' }])
          }, {
            id: 'i0000',
            cells: cells([{ id: 'i00000', plugin: 'foo' }])
          }, {
            id: '01',
            cells: cells([{ id: '010', plugin: 'bar' }])
          }])
        }])
      }
    }
  }, {
    d: 'cell insert below cell',
    s: defaultState,
    a: () => actions.insertCellBelow(insertCell, { id: '000' }, 0, ['i0', 'i00', 'i000', 'i0000', 'i00000']),
    e: {
      editable: {
        cells: cells([{
          id: '0',
          rows: rows([{
            id: 'i00',
            cells: cells([{ id: 'i000', plugin: 'foo' }])
          }, {
            id: 'i0000',
            cells: cells([{ ...insertCell, id: 'i00000' }])
          }, {
            id: '01',
            cells: cells([{ id: '010', plugin: 'bar' }])
          }])
        }])
      }
    }
  }].forEach((c) => {
    describe(`test case ${c.d}`, () => {
      it('should dispatch the action and return the expected result', () => {
        const reducer = combineReducers({ editable })
        const store = createStore(reducer, c.s, identity)
        store.dispatch(c.a())
        expect(store.getState(), 'to equal', c.e)
      })
    })
  })
})
