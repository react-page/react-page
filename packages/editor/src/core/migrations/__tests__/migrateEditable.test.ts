import { Value } from '../../types';
import { CURRENT_EDITABLE_VERSION } from '../EDITABLE_MIGRATIONS';
import { Value_v0 } from '../EDITABLE_MIGRATIONS/from0to1';
import { migrateEditable } from '../migrate';

describe('migrateEditable', () => {
  it('migrates unversioned state to latest state (1)', () => {
    const oldEditable: Value_v0 = {
      id: 'editableId',
      cells: [
        {
          id: 'cell1',
          rows: [
            {
              id: 'row1',
              cells: [
                {
                  id: 'cell2',
                  content: {
                    plugin: {
                      name: 'fooplugin',
                      version: '0.0.1',
                    },
                    state: {
                      fooState: 'something',
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
    };
    const newEditable = migrateEditable(oldEditable, {
      lang: 'en',
      cellPlugins: [],
    });

    const expected: Value = {
      id: 'editableId',
      version: CURRENT_EDITABLE_VERSION,
      rows: [
        {
          id: 'row1',
          cells: [
            {
              id: 'cell2',
              plugin: {
                id: 'fooplugin',
                version: 0.0001,
              },
              dataI18n: {
                en: {
                  fooState: 'something',
                },
              },
            },
          ],
        },
      ],
    };

    expect(newEditable).toEqual(expected);
  });
});
