import { CellPlugin, EditableType } from '../../../types';
import { removeCell } from '../../../actions/cell';
import { createEditable } from '../../../utils/createEditable';
import { simulateDispatch } from '../testUtils';

const plugins: CellPlugin[] = [
  {
    id: 'foo',
    version: 1,
    Renderer: () => null,
  },
];

const options = {
  plugins,
  lang: 'en',
};
describe('remove cell', () => {
  it('removes cell by id', () => {
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
    const expectedState: EditableType = {
      id: 'editableId',
      version: 1,
      rows: [],
    };

    const actualState = simulateDispatch(initialState, removeCell('cell1'));
    expect(actualState).toEqual(expectedState);
  });
});
