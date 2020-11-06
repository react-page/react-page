import { CellPlugin, EditableType } from '../../..';
import { resizeCell, updateCellData } from '../../../actions/cell';
import { createEditable } from '../../../utils/createEditable';
import { simulateDispatch } from '../testUtils';

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

describe('resizeCell', () => {
  it('resizes siblings', () => {
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
                size: 6,
              },
              {
                id: 'cell2',
                plugin: 'foo',
                size: 6,
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
              size: 3,
              plugin: {
                id: 'foo',
                version: 1,
              },
              inline: null,
              dataI18n: {
                en: null,
              },
              rows: [],
            },
            {
              id: 'cell2',
              size: 9,
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

    const actualState = simulateDispatch(initialState, resizeCell('cell1')(3));
    expect(actualState).toEqual(expectedState);
  });

  it('resizes inline cells', () => {
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
                inline: 'left',
                size: 8,
              },
              {
                id: 'cell2',
                plugin: 'foo',
                size: 12,
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
              size: 3,
              inline: 'left',
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
              id: 'cell2',
              size: 12,
              plugin: {
                id: 'foo',
                version: 1,
              },
              dataI18n: {
                en: null,
              },
              hasInlineNeighbour: 'cell1',
              rows: [],
            },
          ],
        },
      ],
    };

    const actualState = simulateDispatch(initialState, resizeCell('cell1')(3));
    expect(actualState).toEqual(expectedState);
  });
});
