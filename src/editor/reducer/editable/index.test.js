/* eslint-env jest */
import { rawEditableReducer } from './index'
import unexpected from 'unexpected'
import { combineReducers, createStore } from 'redux'
import identity from 'ramda/src/identity'
import * as actions from 'src/editor/actions/cell'
import { decorate } from './helper/tree'
import { cellOrder } from './helper/order'

const expect = unexpected.clone()

const walker = ({ cells = [], rows = [], hover = null, ...other }) => {
  if (cells.length) {
    other.cells = cells.map(walker)
  }
  if (rows.length) {
    other.rows = rows.map(walker)
  }
  return {
    ...other,
    hover
  }
}

const cells = (state) => decorate(state).map(walker)

const trees = {
  basic: {
    editable: {
      cells: [{
        id: '0',
        rows: [{
          id: '00',
          cells: [{ id: '000', plugin: 'foo' }]
        }, {
          id: '01',
          cells: [{ id: '010', plugin: 'bar' }]
        }]
      }]
    }
  },
  inline: {
    editable: {
      cells: [{
        id: '0',
        rows: [{
          id: '00',
          cells: [{ id: '000', plugin: 'foo', inline: 'left' }, { id: '001', plugin: 'bar' }]
        }]
      }]
    }
  }
}

const defaultState = trees.basic

const insertCell = {
  id: 'i',
  plugin: 'insert-baz',
  size: 12
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
          rows: [{
            cells: [{
              id: 'layout',
              layout: true,
              rows: [{
                id: '00',
                cells: [{ id: '000', plugin: 'foo' }]
              }]
            }]
          }]
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
          rows: [{
            cells: [{
              id: 'layout',
              layout: true,
              rows: [{
                id: '00',
                cells: [{ id: '000', plugin: 'foo' }]
              }, {
                id: '01',
                cells: [{ id: '010', plugin: 'bar' }]
              }]
            }]
          }]
        }])
      }
    }
  }, {
    d: 'cell update content',
    s: {
      editable: {
        id: '1',
        cells: cells([{ id: '2', plugin: 'foo', content: { state: { foo: 1 } } }])
      }
    },
    a: () => actions.updateCellContent('2')({ bar: 1 }),
    e: {
      editable: {
        id: '1',
        cells: cells([{ id: '2', plugin: 'foo', content: { state: { foo: 1, bar: 1 } } }])
      }
    }
  }, {
    d: 'cell update layout',
    s: {
      editable: {
        id: '1',
        cells: cells([{ id: '2', plugin: 'foo', layout: { state: { foo: 1 } } }])
      }
    },
    a: () => actions.updateCellLayout('2')({ bar: 1 }),
    e: {
      editable: {
        id: '1',
        cells: cells([{ id: '2', plugin: 'foo', layout: { state: { foo: 1, bar: 1 } } }])
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
    a: () => actions.removeCell('2'),
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
    a: () => actions.resizeCell('000')(4),
    e: {
      editable: {
        cells: cells([{
          id: '0',
          rows: [{
            id: '00',
            cells: [{
              id: '000',
              hover: null,
              inline: null,
              plugin: 'foo',
              hasInlineNeighbour: null,
              rows: [],
              resizable: true,
              size: 4,
              bounds: { left: 0, right: 11 }
            }, {
              id: '001',
              hover: null,
              inline: null,
              resizable: false,
              plugin: 'bar',
              hasInlineNeighbour: null,
              rows: [],
              size: 8,
              bounds: { left: 11, right: 0 }
            }]
          }]
        }])
      }
    }
  }, {
    d: 'cell resize inline cell (1)',
    s: trees.inline,
    a: () => actions.resizeCell('000')(4),
    e: {
      editable: {
        cells: cells([{
          id: '0',
          rows: [{
            id: '00',
            cells: [{
              id: '000',
              hover: null,
              inline: 'left',
              plugin: 'foo',
              rows: [],
              resizable: true,
              size: 4,
              bounds: { left: 0, right: 11 }
            }, {
              id: '001',
              hover: null,
              resizable: false,
              hasInlineNeighbour: true,
              plugin: 'bar',
              rows: [],
              size: 12,
              bounds: { left: 0, right: 0 }
            }]
          }]
        }])
      }
    }
  }, {
    d: 'cell hover real row',
    s: defaultState,
    a: () => actions.cellHoverLeftOf({ id: '' }, { id: '00' }, 0),
    e: {
      editable: {
        cells: cells([{
          id: '0',
          rows: [{
            id: '00',
            hover: 'left-of',
            cells: [{ id: '000', plugin: 'foo' }]
          }, {
            id: '01',
            cells: [{ id: '010', plugin: 'bar' }]
          }]
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
          rows: [{
            id: '00',
            hover: 'left-of',
            cells: [{ id: '000', plugin: 'foo' }]
          }, {
            id: '01',
            cells: [{ id: '010', plugin: 'bar' }]
          }]
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
          rows: [{
            id: '00',
            cells: [{ id: '000', plugin: 'foo' }]
          }, {
            id: '01',
            cells: [{ id: '010', plugin: 'bar' }]
          }]
        }])
      }
    }
  }, {
    d: 'insert cell right of, clean up tree afterwards',
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
          rows: [{
            id: '00',
            cells: [{ id: 'i0', plugin: 'foo' }, { ...insertCell, id: 'i00' }]
          }, {
            id: '01',
            cells: [{ id: '010', plugin: 'bar' }]
          }]
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
          rows: [{
            id: '00',
            cells: [{ id: '000', plugin: 'foo' }]
          }, {
            id: '01',
            cells: [{ id: '010', plugin: 'bar' }]
          }, {
            id: 'i0000',
            cells: [{ ...insertCell, id: 'i00000' }]
          }]
        }])
      }
    }
  }, {
    d: 'cell insert right of cell',
    s: defaultState,
    a: () => actions.insertCellRightOf(insertCell, { id: '000' }, 0, ['i0', 'i00', 'i000', 'i0000', 'i00000']),
    e: {
      editable: {
        cells: cells([{
          id: '0',
          rows: [{
            id: '00',
            cells: [{ id: 'i0', plugin: 'foo' }, { ...insertCell, id: 'i00' }]
          }, {
            id: '01',
            cells: [{ id: '010', plugin: 'bar' }]
          }]
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
          rows: [{
            id: 'i0',
            cells: [{ id: '000', plugin: 'foo' }]
          }, {
            id: 'i00',
            cells: [{ ...insertCell, id: 'i000' }]
          }, {
            id: '01',
            cells: [{ id: '010', plugin: 'bar' }]
          }]
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
          rows: [{
            id: '00',
            cells: [{ ...insertCell, id: 'i0' }, { id: '000', plugin: 'foo' }]
          }, {
            id: '01',
            cells: [{ id: '010', plugin: 'bar' }]
          }]
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
          rows: [{
            id: '00',
            cells: [{ ...insertCell, id: 'i0' }, { id: 'i00', plugin: 'foo' }]
          }, {
            id: '01',
            cells: [{ id: '010', plugin: 'bar' }]
          }]
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
          rows: [{
            id: '00',
            cells: [{ ...insertCell, id: 'i0' }, { id: 'i00', plugin: 'foo' }]
          }, {
            id: '01',
            cells: [{ id: '010', plugin: 'bar' }]
          }]
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
          rows: [{
            id: 'i00',
            cells: [{ ...insertCell, id: 'i000' }]
          }, {
            id: 'i0000',
            cells: [{ id: 'i00000', plugin: 'foo' }]
          }, {
            id: '01',
            cells: [{ id: '010', plugin: 'bar' }]
          }]
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
          rows: [{
            id: 'i00',
            cells: [{ id: 'i000', plugin: 'foo' }]
          }, {
            id: 'i0000',
            cells: [{ ...insertCell, id: 'i00000' }]
          }, {
            id: '01',
            cells: [{ id: '010', plugin: 'bar' }]
          }]
        }])
      }
    }
  }, {
    d: 'cell move below another cell',
    s: defaultState,
    a: () => actions.insertCellBelow({
      id: '000',
      plugin: 'foo'
    }, { id: '010' }, 0, ['i0', 'i00', 'i000', 'i0000', 'i00000']),
    e: {
      editable: {
        cells: cells([{
          id: '0',
          rows: [{
            id: 'i00',
            cells: [{ id: 'i000', plugin: 'bar' }]
          }, {
            id: 'i0000',
            cells: [{ id: 'i00000', plugin: 'foo' }]
          }]
        }])
      }
    }
  }, {
    d: 'cell insert inline cell left of',
    s: {
      editable: {
        cells: [{
          id: '0',
          rows: [{
            id: '00',
            cells: [{ id: '000', plugin: 'foo' }, { id: '001', plugin: 'bar' }]
          }]
        }]
      }
    },
    a: () => actions.insertCellLeftInline(insertCell, { id: '000' }, 0, ['i0', 'i00', 'i000', 'i0000', 'i00000']),
    e: {
      editable: {
        cells: cells([{
          id: '0',
          rows: [{
            id: '00',
            cells: [{
              id: 'i0',
              rows: [{
                id: 'i00',
                cells: [{
                  ...insertCell,
                  inline: 'left',
                  id: 'i000',
                  hover: null,
                  size: 6,
                  resizable: true,
                  bounds: { left: 0, right: 11 },
                  rows: []
                }, {
                  id: 'i0000',
                  plugin: 'foo',
                  inline: null,
                  hasInlineNeighbour: true,
                  hover: null,
                  size: 12,
                  resizable: false,
                  bounds: { left: 0, right: 0 },
                  rows: []
                }]
              }]
            }, { id: '001', plugin: 'bar' }]
          }]
        }])
      }
    }
  }, {
    d: 'move inline cell from left to right',
    s: trees.inline,
    a: () => actions.insertCellRightInline({
      id: '000',
      plugin: 'foo',
      inline: 'left'
    }, { id: '001' }, 0, ['i0', 'i00', 'i000', 'i0000', 'i00000']),
    e: {
      editable: {
        cells: cells([{
          id: '0',
          rows: [{
            id: 'i00',
            cells: [{
              id: 'i000', plugin: 'foo', inline: 'right'
            }, {
              id: 'i0000', plugin: 'bar', inline: null
            }]
          }]
        }])
      }
    }
  }, {
    d: 'cell insert cell left of inline row',
    s: trees.inline,
    a: () => actions.insertCellLeftOf(insertCell, { id: '000' }, 2, ['i0', 'i00', 'i000', 'i0000', 'i00000']),
    e: {
      editable: {
        cells: cells([{
          ...insertCell,
          size: 6,
          id: 'i0'
        }, {
          id: 'i00',
          rows: [{
            id: '00',
            cells: [{
              id: '000', plugin: 'foo', inline: 'left'
            }, {
              id: '001', plugin: 'bar'
            }]
          }]
        }])
      }
    }
  }, {
    d: 'cell insert below inline row',
    s: trees.inline,
    a: () => actions.insertCellBelow(insertCell, { id: '000' }, 1, ['i0', 'i00', 'i000', 'i0000', 'i00000']),
    e: {
      editable: {
        cells: cells([{
          id: '0',
          rows: [{
            id: 'i0',
            cells: [{
              id: '000', plugin: 'foo', inline: 'left'
            }, {
              id: '001', plugin: 'bar'
            }]
          }, {
            id: 'i00',
            cells: [{
              ...insertCell,
              size: 6,
              id: 'i000'
            }]
          }]
        }])
      }
    }
  }, {
    d: 'cell insert below inline row - 2 level',
    s: trees.inline,
    a: () => actions.insertCellBelow(insertCell, { id: '000' }, 2, ['i0', 'i00', 'i000', 'i0000', 'i00000']),
    e: {
      editable: {
        cells: cells([{
          id: 'i0',
          rows: [{
            id: '00',
            cells: [{
              id: '000', plugin: 'foo', inline: 'left'
            }, {
              id: '001', plugin: 'bar'
            }]
          }, {
            id: 'i0000',
            cells: [{
              ...insertCell,
              size: 6,
              id: 'i00000'
            }]
          }]
        }])
      }
    }
  }].forEach((c) => {
    describe(`test case ${c.d}`, () => {
      it('should dispatch the action and return the expected result', () => {
        const reducer = combineReducers({ editable: rawEditableReducer })
        const store = createStore(reducer, c.s, identity)
        store.dispatch(c.a())
        expect(store.getState(), 'to equal', {
          editable: {
            ...c.e.editable,
            cells: c.e.editable.cells,
            cellOrder: cellOrder(c.e.editable.cells),
          }
        })
      })
    })
  })
})
