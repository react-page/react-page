import type { CellPluginList, Value } from '../../../types';
import { removeCells } from '../../../actions/cell';
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
describe('remove cell', () => {
  it('removes cell by id', () => {
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
      rows: [],
    };

    const actualState = simulateDispatch(initialState, removeCells(['cell1']));
    expect(actualState).toEqual(expectedState);
  });
});
