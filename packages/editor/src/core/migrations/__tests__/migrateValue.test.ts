import type { Value } from '../../types';
import { createId } from '../../utils/createId';
import { CURRENT_EDITABLE_VERSION } from '../EDITABLE_MIGRATIONS';
import type { Value_v0 } from '../EDITABLE_MIGRATIONS/from0to1';
import { migrateValue } from '../migrate';

jest.mock('../../utils/createId', () => {
  let index = 1;
  return {
    createId: () => 'nodeId_' + index++,
  };
});

describe('migrateValue', () => {
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
    const newEditable = migrateValue(oldEditable, {
      lang: 'en',
      cellPlugins: [],
    });

    const expected: Value = {
      id: 'editableId',
      version: CURRENT_EDITABLE_VERSION,
      rows: [
        {
          id: 'nodeId_1',
          cells: [
            {
              id: 'nodeId_2',
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
