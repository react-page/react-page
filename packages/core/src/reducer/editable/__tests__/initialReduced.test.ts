import { CellPlugin, EditableType } from '../../..';
import { removeCell, updateCellData } from '../../../actions/cell';
import { createEditable } from '../../../utils/createEditable';
import { simulateDispatch } from '../testUtils';
//type State = { foo?: number; bar?: number };

const plugins: CellPlugin[] = [
  {
    id: 'foo',
    version: 1,
  },
];

const options = {
  plugins,
  lang: 'en',
};

describe('initial reduce (without actions)', () => {
  it('remove cells that have no rows and no plugin', () => {
    const initialState = createEditable(
      {
        id: 'editableId',
        rows: [
          {
            id: 'row0',
            cells: [
              {
                id: 'cell1',
              },
              {
                id: 'cell2',
                plugin: 'foo',
              },
            ],
          },
        ],
      },
      options
    );
    const expectedState: EditableType = {
      id: 'editableId',
      version: 1,
      rows: [
        {
          id: 'row0',
          cells: [
            {
              id: 'cell2',
              size: 12,
              inline: null,
              plugin: {
                id: 'foo',
                version: 1,
              },
              dataI18n: {
                en: null,
              },
              rows: [],
            },
          ],
        },
      ],
    };

    const actualState = simulateDispatch(initialState);
    expect(actualState).toEqual(expectedState);
  });
  it('remove cells that have rows, but they are mepty and simplifies rows', () => {
    const initialState = createEditable(
      {
        id: 'editableId',
        rows: [
          {
            id: 'row0',
            cells: [
              {
                id: 'cell1',
                plugin: 'foo',
              },
              {
                id: 'cell2',
                rows: [],
              },
              {
                id: 'cell3',
                rows: [
                  {
                    id: 'row1',
                    cells: [],
                  },
                ],
              },
              {
                id: 'cell4',
                rows: [
                  {
                    id: 'row2',
                    cells: [
                      {
                        id: 'cell5',
                      },
                    ],
                  },
                ],
              },
              {
                id: 'cell6',
                rows: [
                  {
                    id: 'row3',
                    cells: [
                      {
                        id: 'cell7',
                        plugin: 'foo',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      options
    );
    const expectedState: EditableType = {
      id: 'editableId',
      version: 1,
      rows: [
        {
          id: 'row0',
          cells: [
            {
              id: 'cell1',
              size: 6,
              inline: null,
              plugin: {
                id: 'foo',
                version: 1,
              },
              dataI18n: {
                en: null,
              },
              rows: [],
            },

            {
              id: 'cell7',
              dataI18n: {
                en: null,
              },
              inline: null,
              plugin: {
                id: 'foo',
                version: 1,
              },
              size: 6,
              rows: [],
            },
          ],
        },
      ],
    };

    const actualState = simulateDispatch(initialState);

    expect(actualState).toEqual(expectedState);
  });
});

/*

TODO: readd this tests

test('insert cell right of, clean up tree afterwards', () => {
  const initialState = createEditable('editable', [
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

  runCase(initialState, action, expectedState);
});

test('anti-recursion test: cell insert below of two level', () => {
  const initialState = createEditable('editable', [
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

  runCase(initialState, action, expectedState);
});

test('cell insert right of cell', () => {
  const initialState = createEditable('editable', [
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

  runCase(initialState, action, expectedState);
});

test('cell insert below of cell - one level deep (row)', () => {
  const initialState = createEditable('editable', [
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

  runCase(initialState, action, expectedState);
});

test('cell insert left of cell - one level deep (row)', () => {
  const initialState = createEditable('editable', [
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

  runCase(initialState, action, expectedState);
});

test('cell insert left of cell', () => {
  const initialState = createEditable('editable', [
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

  runCase(initialState, action, expectedState);
});

test('cell insert above cell', () => {
  const initialState = createEditable('editable', [
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

  runCase(initialState, action, expectedState);
});

test('cell insert below cell', () => {
  const initialState = createEditable('editable', [
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

  runCase(initialState, action, expectedState);
});

test('cell move below another cell', () => {
  const initialState = createEditable('editable', [
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

  runCase(initialState, action, expectedState);
});

test('cell insert inline cell left of', () => {
  const initialState = createEditable('editable', [
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

  runCase(initialState, action, expectedState);
});

test('move inline cell from left to right', () => {
  const initialState = createEditable('editable', [
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

  runCase(initialState, action, expectedState);
});

test('cell insert cell left of inline row', () => {
  const initialState = createEditable('editable', [
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

  runCase(initialState, action, expectedState);
});

test('cell insert below inline row', () => {
  const initialState = createEditable('editable', [
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

  runCase(initialState, action, expectedState);
});

test('cell insert below inline row - 2 level', () => {
  const initialState = createEditable('editable', [
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

  runCase(initialState, action, expectedState);
});
*/
