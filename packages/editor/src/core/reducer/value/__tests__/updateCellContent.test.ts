import type { CellPluginList, Value } from '../../../types';
import { updateCellData } from '../../../actions/cell';
import { createValue } from '../../../utils/createValue';
import { simulateDispatch } from '../testUtils';

const cellPlugins: CellPluginList = [
  {
    id: 'foo',
    version: 1,
    Renderer: () => null,
  },
];

const options = {
  cellPlugins,
  lang: 'en',
};

describe('updateCellData', () => {
  it('updates cell data in the given language', () => {
    const initialState = createValue(
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
            ],
          },
        ],
      },
      options
    );
    const expectedState: Value = {
      id: 'editableId',
      version: 1,
      rows: [
        {
          id: 'row0',
          cells: [
            {
              id: 'cell1',
              size: 12,
              inline: null,
              plugin: {
                id: 'foo',
                version: 1,
              },
              dataI18n: {
                en: {
                  foo: 'new',
                  bar: 'something',
                },
              },
              rows: [],
            },
          ],
        },
      ],
    };

    const actualState = simulateDispatch(
      initialState,
      updateCellData('cell1')(
        {
          foo: 'new',
          bar: 'something',
        },
        {
          lang: 'en',
        }
      )
    );
    expect(actualState).toEqual(expectedState);
  });

  it('adds a new language field', () => {
    const initialState = createValue(
      {
        id: 'editableId',
        rows: [
          {
            id: 'row0',
            cells: [
              {
                id: 'cell1',

                plugin: 'foo',
                dataI18n: {
                  en: {
                    foo: 'english',
                    bar: 'something',
                  },
                },
              },
            ],
          },
        ],
      },
      options
    );
    const expectedState: Value = {
      id: 'editableId',
      version: 1,
      rows: [
        {
          id: 'row0',
          cells: [
            {
              id: 'cell1',
              size: 12,
              plugin: {
                id: 'foo',
                version: 1,
              },
              inline: null,
              dataI18n: {
                en: {
                  foo: 'english',
                  bar: 'something',
                },
                de: {
                  foo: 'deutsch',
                  bar: 'etwas',
                },
              },
              rows: [],
            },
          ],
        },
      ],
    };

    const actualState = simulateDispatch(
      initialState,
      updateCellData('cell1')(
        {
          foo: 'deutsch',
          bar: 'etwas',
        },
        {
          lang: 'de',
        }
      )
    );
    expect(actualState).toEqual(expectedState);
  });
});
