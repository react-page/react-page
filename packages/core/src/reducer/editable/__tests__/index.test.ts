import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import * as actions from '../../../actions/cell/index';
import { Cell } from '../../../types/editable';
import { cellOrder } from '../helper/order';
import { setAllSizesAndOptimize } from '../helper/setAllSizesAndOptimize';
import { editable } from '../index';

const walker = ({ cells = [], rows = [], hoverPosition = null, ...other }) => {
  if (cells.length) {
    other.cells = cells.map(walker);
  }
  if (rows.length) {
    other.rows = rows.map(walker);
  }
  return {
    ...other,
    hoverPosition,
  };
};

const _cells = (state) => setAllSizesAndOptimize(state).map(walker);

const simulateDispatch = (currentState, action) => {
  const reducer = combineReducers({ editable });
  const store = createStore(reducer, currentState, applyMiddleware(thunk));
  store.dispatch(action);

  return store.getState();
};

const runCase = (currentState, action, expectedState) => {
  const actualState = simulateDispatch(currentState, action);

  expect(actualState).toEqual({
    editable: {
      ...expectedState.editable,
      cellOrder: cellOrder(expectedState.editable.cells),
    },
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createEditable = (
  id: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cells?: any[] | { hoverPosition: any }[]
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editable: any = {};

  if (id) {
    editable.id = id;
  }

  if (cells) {
    editable.cells = cells;
  }

  return { editable };
};

export const createCell = (
  id: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows: any[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  additional?: any
): Cell => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cell: any = {};

  if (id) {
    cell.id = id;
  }

  if (rows) {
    cell.rows = rows;
  }

  return {
    ...cell,
    ...additional,
  };
};

export const createLayoutCell = (
  id: string,
  name: string,
  state: { foo?: number; bar?: number },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows: any[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  additional?: any,
  stateI18n?: { [lang: string]: State }
) => {
  const cell = createCell(id, null, additional);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const layout: any = {};

  if (name) {
    layout.plugin = {};
    layout.plugin.name = name;
  }

  if (state) {
    layout.state = state;
  }

  if (stateI18n) {
    layout.stateI18n = stateI18n;
  }

  if (rows) {
    cell.rows = rows;
  }

  return {
    ...cell,
    layout,
  };
};

type State = { foo?: number; bar?: number };
export const createContentCell = (
  id: string,
  name: string,
  state?: State,
  additional?: {
    hoverPosition?: string | boolean;
    size?: number;
    inline?: string;
  },
  stateI18n?: { [lang: string]: State }
): Cell => {
  const cell = createCell(id, null, additional);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const content: any = {};

  if (name) {
    content.plugin = {};
    content.plugin.name = name;
  }

  if (state) {
    content.state = state;
  }
  if (stateI18n) {
    content.stateI18n = stateI18n;
  }

  return {
    ...cell,
    content,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createRow = (id: string, cells: any[], additional: any = {}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const row: any = {};

  if (id) {
    row.id = id;
  }

  if (cells) {
    row.cells = cells;
  }

  return {
    ...row,
    ...additional,
  };
};

test('basic', () => {
  const currentState = createEditable('editable', undefined);
  const action = { type: 'foo' };
  const expectedState = createEditable('editable', []);

  runCase(currentState, action, expectedState);
});

test('cleanup does not remove layout nodes when having one child, nested', () => {
  const currentState = createEditable('editable', [
    createCell('0', [
      createRow('00', [
        createCell('000', [
          createRow('0000', [
            createLayoutCell('layout', 'layout', null, [
              createRow('00000', [createContentCell('000000', 'foo')]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]);

  const action = { type: 'foo' };

  const expectedState = createEditable(
    'editable',
    _cells([
      createCell('0', [
        createRow('00', [
          createLayoutCell('layout', 'layout', null, [
            createRow('00000', [createContentCell('000000', 'foo')]),
          ]),
        ]),
      ]),
    ])
  );

  runCase(currentState, action, expectedState);
});

test('cleanup does not remove layout nodes when having multiple cells in one row, nested', () => {
  const currentState = createEditable('editable', [
    createCell('0', [
      createRow('00', [
        createCell('000', [
          createRow('0000', [
            createLayoutCell('layout', 'layout', null, [
              createRow('00000', [createContentCell('000000', 'foo', null)]),
              createRow('00001', [createContentCell('000010', 'bar', null)]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]);

  const action = { type: 'foo' };

  const expectedState = createEditable(
    'editable',
    _cells([
      createCell('0', [
        createRow('00', [
          createLayoutCell('layout', 'layout', null, [
            createRow('00000', [createContentCell('000000', 'foo', null)]),
            createRow('00001', [createContentCell('000010', 'bar', null)]),
          ]),
        ]),
      ]),
    ])
  );

  runCase(currentState, action, expectedState);
});

test('cell update content', () => {
  const currentState = createEditable('editable', [
    createContentCell('0', 'foo', { foo: 1 }),
  ]);

  const action = actions.updateCellData('0')({ bar: 1 });

  const expectedState = createEditable(
    'editable',
    _cells([createContentCell('0', 'foo', { bar: 1 })])
  );

  runCase(currentState, action, expectedState);
});

test('cell update content with language', () => {
  const currentState = createEditable('editable', [
    createContentCell('0', 'foo', { foo: 1 }),
  ]);

  const action = actions.updateCellData('0')({ bar: 1 }, 'de');

  const expectedState = createEditable(
    'editable',
    _cells([
      createContentCell('0', 'foo', { foo: 1 }, undefined, {
        de: { bar: 1 },
      }),
    ])
  );

  runCase(currentState, action, expectedState);
});

test('cell update content with language when there is already another translation', () => {
  const currentState = createEditable('editable', [
    createContentCell('0', 'foo', { foo: 1 }, undefined, {
      en: {
        bar: 2,
      },
    }),
  ]);

  const action = actions.updateCellData('0')({ bar: 1 }, 'de');

  const expectedState = createEditable(
    'editable',
    _cells([
      createContentCell('0', 'foo', { foo: 1 }, undefined, {
        de: { bar: 1 },
        en: { bar: 2 },
      }),
    ])
  );

  runCase(currentState, action, expectedState);
});
test('cell update layout', () => {
  const currentState = createEditable('editable', [
    createLayoutCell('0', 'foo', { foo: 1 }, [
      createRow('2', [createContentCell('1', 'bar')]),
    ]),
  ]);

  const action = actions.updateCellLayout('0')({ bar: 1 });

  const expectedState = createEditable(
    'editable',
    _cells([
      createLayoutCell('0', 'foo', { bar: 1 }, [
        createRow('2', [createContentCell('1', 'bar')]),
      ]),
    ])
  );

  runCase(currentState, action, expectedState);
});

test('cell remove', () => {
  const currentState = createEditable('editable', [
    createContentCell('0', 'foo'),
    createContentCell('1', 'bar'),
  ]);

  const action = actions.removeCell('0');

  const expectedState = createEditable(
    'editable',
    _cells([createContentCell('1', 'bar')])
  );

  runCase(currentState, action, expectedState);
});

test('last cell remove', () => {
  const currentState = createEditable('editable', [
    createContentCell('0', 'foo'),
  ]);

  const action = actions.removeCell('0');

  const actualState = simulateDispatch(currentState, action);

  expect(actualState.editable.cells.length).toEqual(0);
});

test('cell cancel drag', () => {
  const currentState = createEditable('editable', [
    createContentCell('0', 'foo', null, { hoverPosition: 'left' }),
  ]);

  const action = actions.cancelCellDrag();

  const expectedState = createEditable(
    'editable',
    _cells([createContentCell('0', 'foo')])
  );

  runCase(currentState, action, expectedState);
});

test('cell resize', () => {
  const currentState = createEditable('editable', [
    createCell('0', [
      createRow('00', [
        createContentCell('000', 'foo', null, { size: 6 }),
        createContentCell('001', 'bar', null, { size: 6 }),
      ]),
    ]),
  ]);

  const action = actions.resizeCell('000')(4);

  const expectedState = createEditable(
    'editable',
    _cells([
      createCell('0', [
        createRow('00', [
          createContentCell('000', 'foo', null, { size: 4 }),
          createContentCell('001', 'bar', null, { size: 8 }),
        ]),
      ]),
    ])
  );

  runCase(currentState, action, expectedState);
});

test('cell resize inline cell (1)', () => {
  const currentState = createEditable('editable', [
    createCell('0', [
      createRow('00', [
        createContentCell('000', 'foo', null, { inline: 'left' }),
        createContentCell('001', 'bar', null),
      ]),
    ]),
  ]);

  const action = actions.resizeCell('000')(4);

  const expectedState = createEditable(
    'editable',
    _cells([
      createCell('0', [
        createRow(
          '00',
          [
            createContentCell('000', 'foo', null, { inline: 'left', size: 4 }),
            createContentCell('001', 'bar', null, { size: 12 }),
          ],
          {}
        ),
      ]),
    ])
  );

  runCase(currentState, action, expectedState);
});

test('cell hover real row', () => {
  const currentState = createEditable('editable', [
    createCell('0', [
      createRow('00', [createContentCell('000', 'foo')]),
      createRow('01', [createContentCell('010', 'bar')]),
    ]),
  ]);

  const action = actions.cellHoverLeftOf({ id: 'foo' }, { id: '00' }, 0);

  const expectedState = createEditable(
    'editable',
    _cells([
      createCell('0', [
        createRow('00', [createContentCell('000', 'foo')], {
          hoverPosition: 'left-of',
        }),
        createRow('01', [createContentCell('010', 'bar')]),
      ]),
    ])
  );

  runCase(currentState, action, expectedState);
});

test('cell hover row', () => {
  const currentState = createEditable('editable', [
    createCell('0', [
      createRow('00', [createContentCell('000', 'foo')]),
      createRow('01', [createContentCell('010', 'bar')]),
    ]),
  ]);

  const action = actions.cellHoverLeftOf({ id: 'foo' }, { id: '000' }, 1);

  const expectedState = createEditable(
    'editable',
    _cells([
      createCell('0', [
        createRow('00', [createContentCell('000', 'foo')], {
          hoverPosition: 'left-of',
        }),
        createRow('01', [createContentCell('010', 'bar')]),
      ]),
    ])
  );

  runCase(currentState, action, expectedState);
});

test('cell hover ancestor cell', () => {
  const currentState = createEditable('editable', [
    createCell('0', [
      createRow('00', [createContentCell('000', 'foo')]),
      createRow('01', [createContentCell('010', 'bar')]),
    ]),
  ]);

  const action = actions.cellHoverRightOf({ id: 'foo' }, { id: '000' }, 2);

  const expectedState = createEditable(
    'editable',
    _cells([
      createCell(
        '0',
        [
          createRow('00', [createContentCell('000', 'foo')]),
          createRow('01', [createContentCell('010', 'bar')]),
        ],
        { hoverPosition: 'right-of' }
      ),
    ])
  );

  runCase(currentState, action, expectedState);
});

test('insert cell right of, clean up tree afterwards', () => {
  const currentState = createEditable('editable', [
    createCell('0', [
      createRow('00', [
        createCell('000', [
          createRow('0000', [
            createCell('00000', [
              createRow('000000', [
                createCell('000000', [
                  createRow('0000000', [createContentCell('00000000', 'foo')]),
                  createRow('0000001', [createContentCell('00000010', 'bar')]),
                ]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]);

  const action = actions.insertCellRightOf(
    createContentCell('i', 'myPlugin'),
    { id: '00000000' },
    0,
    {
      cell: 'id-cell',
      item: 'id-item',
      others: ['id-others-1', 'id-others-2', 'id-others-3'],
    }
  );

  const expectedState = createEditable(
    'editable',
    _cells([
      createCell('0', [
        createRow('0000000', [
          createContentCell('id-others-1', 'foo'),
          createContentCell('id-item', 'myPlugin'),
        ]),
        createRow('0000001', [createContentCell('00000010', 'bar')]),
      ]),
    ])
  );

  runCase(currentState, action, expectedState);
});

test('anti-recursion test: cell insert below of two level', () => {
  const currentState = createEditable('editable', [
    createCell('0', [
      createRow('00', [
        createCell('000', [
          createRow('0000', [
            createCell('00000', [
              createRow('000000', [
                createCell('000000', [
                  createRow('0000000', [createContentCell('00000000', 'foo')]),
                  createRow('0000001', [createContentCell('00000010', 'bar')]),
                ]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]);

  const action = actions.insertCellBelow(
    createContentCell('i', 'myPlugin'),
    { id: '00000000' },
    2,
    {
      cell: 'id-cell',
      item: 'id-item',
      others: ['id-others-1', 'id-others-2', 'id-others-3'],
    }
  );

  const expectedState = createEditable(
    'editable',
    _cells([
      createCell(
        'id-cell',
        [
          createRow('0000000', [createContentCell('00000000', 'foo')]),
          createRow('0000001', [createContentCell('00000010', 'bar')]),
          createRow(
            'id-others-3',
            [createContentCell('id-item', 'myPlugin')],
            {}
          ),
        ],
        {}
      ),
    ])
  );

  runCase(currentState, action, expectedState);
});

test('cell insert right of cell', () => {
  const currentState = createEditable('editable', [
    createCell('0', [
      createRow('00', [createContentCell('000', 'foo')]),
      createRow('01', [createContentCell('010', 'bar')]),
    ]),
  ]);

  const action = actions.insertCellRightOf(
    createContentCell('i', 'myPlugin'),
    { id: '000' },
    0,
    {
      cell: 'id-cell',
      item: 'id-item',
      others: ['id-others-1', 'id-others-2', 'id-others-3'],
    }
  );

  const expectedState = createEditable(
    'editable',
    _cells([
      createCell('0', [
        createRow('00', [
          createContentCell('id-others-1', 'foo'),
          createContentCell('id-item', 'myPlugin'),
        ]),
        createRow('01', [createContentCell('010', 'bar')]),
      ]),
    ])
  );

  runCase(currentState, action, expectedState);
});

test('cell insert below of cell - one level deep (row)', () => {
  const currentState = createEditable('editable', [
    createCell('0', [
      createRow('00', [createContentCell('000', 'foo')]),
      createRow('01', [createContentCell('010', 'bar')]),
    ]),
  ]);

  const action = actions.insertCellBelow(
    createContentCell('i', 'myPlugin'),
    { id: '000' },
    1,
    {
      cell: 'id-cell',
      item: 'id-item',
      others: ['id-others-1', 'id-others-2', 'id-others-3'],
    }
  );

  const expectedState = createEditable(
    'editable',
    _cells([
      createCell('0', [
        createRow('id-others-1', [createContentCell('000', 'foo')]),
        createRow(
          'id-others-2',
          [createContentCell('id-item', 'myPlugin')],
          {}
        ),
        createRow('01', [createContentCell('010', 'bar')]),
      ]),
    ])
  );

  runCase(currentState, action, expectedState);
});

test('cell insert left of cell - one level deep (row)', () => {
  const currentState = createEditable('editable', [
    createCell('0', [
      createRow('00', [createContentCell('000', 'foo')]),
      createRow('01', [createContentCell('010', 'bar')]),
    ]),
  ]);

  const action = actions.insertCellLeftOf(
    createContentCell('i', 'myPlugin'),
    { id: '000' },
    1,
    {
      cell: 'id-cell',
      item: 'id-item',
      others: ['id-others-1', 'id-others-2', 'id-others-3'],
    }
  );

  const expectedState = createEditable(
    'editable',
    _cells([
      createCell('0', [
        createRow('00', [
          createContentCell('id-item', 'myPlugin'),
          createContentCell('000', 'foo'),
        ]),
        createRow('01', [createContentCell('010', 'bar')]),
      ]),
    ])
  );

  runCase(currentState, action, expectedState);
});

test('cell insert left of cell', () => {
  const currentState = createEditable('editable', [
    createCell('0', [
      createRow('00', [createContentCell('000', 'foo')]),
      createRow('01', [createContentCell('010', 'bar')]),
    ]),
  ]);

  const action = actions.insertCellLeftOf(
    createContentCell('i', 'myPlugin'),
    { id: '000' },
    0,
    {
      cell: 'id-cell',
      item: 'id-item',
      others: ['id-others-1', 'id-others-2', 'id-others-3'],
    }
  );

  const expectedState = createEditable(
    'editable',
    _cells([
      createCell('0', [
        createRow('00', [
          createContentCell('id-item', 'myPlugin'),
          createContentCell('id-others-1', 'foo'),
        ]),
        createRow('01', [createContentCell('010', 'bar')]),
      ]),
    ])
  );

  runCase(currentState, action, expectedState);
});

test('cell insert above cell', () => {
  const currentState = createEditable('editable', [
    createCell('0', [
      createRow('00', [createContentCell('000', 'foo')]),
      createRow('01', [createContentCell('010', 'bar')]),
    ]),
  ]);

  const action = actions.insertCellAbove(
    createContentCell('i', 'myPlugin'),
    { id: '000' },
    0,
    {
      cell: 'id-cell',
      item: 'id-item',
      others: ['id-others-1', 'id-others-2', 'id-others-3'],
    }
  );

  const expectedState = createEditable(
    'editable',
    _cells([
      createCell('0', [
        createRow(
          'id-others-1',
          [createContentCell('id-item', 'myPlugin')],
          {}
        ),
        createRow('id-others-2', [createContentCell('id-others-3', 'foo')], {}),
        createRow('01', [createContentCell('010', 'bar')]),
      ]),
    ])
  );

  runCase(currentState, action, expectedState);
});

test('cell insert below cell', () => {
  const currentState = createEditable('editable', [
    createCell('0', [
      createRow('00', [createContentCell('000', 'foo')]),
      createRow('01', [createContentCell('010', 'bar')]),
    ]),
  ]);

  const action = actions.insertCellBelow(
    createContentCell('i', 'myPlugin'),
    { id: '000' },
    0,
    {
      cell: 'id-cell',
      item: 'id-item',
      others: ['id-others-1', 'id-others-2', 'id-others-3'],
    }
  );

  const expectedState = createEditable(
    'editable',
    _cells([
      createCell('0', [
        createRow('id-others-1', [createContentCell('id-others-2', 'foo')], {}),
        createRow(
          'id-others-3',
          [createContentCell('id-item', 'myPlugin')],
          {}
        ),
        createRow('01', [createContentCell('010', 'bar')]),
      ]),
    ])
  );

  runCase(currentState, action, expectedState);
});

test('cell move below another cell', () => {
  const currentState = createEditable('editable', [
    createCell('0', [
      createRow('00', [createContentCell('000', 'foo')]),
      createRow('01', [createContentCell('010', 'bar')]),
    ]),
  ]);

  const action = actions.insertCellBelow(
    createContentCell('000', 'foo'),
    { id: '010' },
    0,
    {
      cell: 'id-cell',
      item: 'id-item',
      others: ['id-others-1', 'id-others-2', 'id-others-3'],
    }
  );

  const expectedState = createEditable(
    'editable',
    _cells([
      createCell('0', [
        createRow('id-others-1', [createContentCell('id-others-2', 'bar')], {}),
        createRow('id-others-3', [createContentCell('id-item', 'foo')], {}),
      ]),
    ])
  );

  runCase(currentState, action, expectedState);
});

test('cell insert inline cell left of', () => {
  const currentState = createEditable('editable', [
    createCell('0', [
      createRow('00', [
        createContentCell('000', 'foo'),
        createContentCell('001', 'bar'),
      ]),
    ]),
  ]);

  const action = actions.insertCellLeftInline(
    createContentCell('i', 'myPlugin'),
    { id: '000' },
    0,
    {
      cell: 'id-cell',
      item: 'id-item',
      others: ['id-others-1', 'id-others-2', 'id-others-3'],
    }
  );

  const expectedState = createEditable(
    'editable',
    _cells([
      createCell('0', [
        createRow('00', [
          createCell(
            'id-cell',
            [
              createRow('id-others-1', [
                createContentCell('id-item', 'myPlugin', null, {
                  inline: 'left',
                }),
                createContentCell('id-others-2', 'foo', null, {
                  inline: null,
                }),
                // FIXME: the row with id i00 has inline children!
              ]),
            ],
            {}
          ),
          createContentCell('001', 'bar'),
        ]),
      ]),
    ])
  );

  runCase(currentState, action, expectedState);
});

test('move inline cell from left to right', () => {
  const currentState = createEditable('editable', [
    createCell('0', [
      createRow('00', [
        createContentCell('000', 'foo', null, { inline: 'left' }),
        createContentCell('001', 'bar', null),
      ]),
    ]),
  ]);

  const action = actions.insertCellRightInline(
    createContentCell('000', 'foo', null, { inline: 'left' }),
    { id: '001' },
    0,
    {
      cell: 'id-cell',
      item: 'id-item',
      others: ['id-others-1', 'id-others-2', 'id-others-3'],
    }
  );

  const expectedState = createEditable(
    'editable',
    _cells([
      createCell('0', [
        createRow('id-others-1', [
          createContentCell('id-item', 'foo', null, { inline: 'right' }),
          createContentCell('id-others-2', 'bar', null, { inline: null }),
        ]),
      ]),
    ])
  );

  runCase(currentState, action, expectedState);
});

test('cell insert cell left of inline row', () => {
  const currentState = createEditable('editable', [
    createCell('0', [
      createRow('00', [
        createContentCell('000', 'foo', null, { inline: 'left' }),
        createContentCell('001', 'bar', null),
      ]),
    ]),
  ]);

  const action = actions.insertCellLeftOf(
    createContentCell('i', 'myPlugin'),
    { id: '000' },
    2,
    {
      cell: 'id-cell',
      item: 'id-item',
      others: ['id-others-1', 'id-others-2', 'id-others-3'],
    }
  );

  const expectedState = createEditable(
    'editable',
    _cells([
      createContentCell('id-item', 'myPlugin', null, { size: 6 }),
      createCell('id-others-1', [
        createRow('00', [
          createContentCell('000', 'foo', null, { inline: 'left' }),
          createContentCell('001', 'bar', null),
        ]),
      ]),
    ])
  );

  runCase(currentState, action, expectedState);
});

test('cell insert below inline row', () => {
  const currentState = createEditable('editable', [
    createCell('0', [
      createRow('00', [
        createContentCell('000', 'foo', null, { inline: 'left' }),
        createContentCell('001', 'bar', null),
      ]),
    ]),
  ]);

  const action = actions.insertCellBelow(
    createContentCell('i', 'myPlugin'),
    { id: '000' },
    1,
    {
      cell: 'id-cell',
      item: 'id-item',
      others: ['id-others-1', 'id-others-2', 'id-others-3'],
    }
  );

  const expectedState = createEditable(
    'editable',
    _cells([
      createCell('0', [
        createRow('id-others-1', [
          createContentCell('000', 'foo', null, { inline: 'left' }),
          createContentCell('001', 'bar', null),
        ]),
        createRow('id-others-2', [
          createContentCell('id-item', 'myPlugin', null, { size: 6 }),
        ]),
      ]),
    ])
  );

  runCase(currentState, action, expectedState);
});

test('cell insert below inline row - 2 level', () => {
  const currentState = createEditable('editable', [
    createCell('0', [
      createRow('00', [
        createContentCell('000', 'foo', null, { inline: 'left' }),
        createContentCell('001', 'bar', null),
      ]),
    ]),
  ]);

  const action = actions.insertCellBelow(
    createContentCell('i', 'myPlugin'),
    { id: '000' },
    2,
    {
      cell: 'id-cell',
      item: 'id-item',
      others: ['id-others-1', 'id-others-2', 'id-others-3'],
    }
  );

  const expectedState = createEditable(
    'editable',
    _cells([
      createCell(
        'id-cell',
        [
          createRow('00', [
            createContentCell('000', 'foo', null, { inline: 'left' }),
            createContentCell('001', 'bar', null),
          ]),
          createRow('id-others-3', [
            createContentCell('id-item', 'myPlugin', null, { size: 6 }),
          ]),
        ],
        {}
      ),
    ])
  );

  runCase(currentState, action, expectedState);
});
