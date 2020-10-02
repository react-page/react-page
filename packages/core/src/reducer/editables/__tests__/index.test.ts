import { combineReducers, createStore } from 'redux';
import expect from 'unexpected';
import { updateEditable } from '../../../actions/editables';
import { RootState } from '../../../types/state';
import {
  createCell,
  createContentCell,
  createEditable,
  createRow,
} from '../../editable/__tests__/index.test';
import { editables } from '../index';

const identity = <T>(arg: T) => arg;

const someState = createEditable('editable', [
  createCell('0', [
    createRow('00', [createContentCell('000000', 'foo', null)]),
  ]),
]).editable;

describe('editor/reducer/editables', () => {
  [
    {
      i: {
        past: [],
        present: [],
        future: [],
      },
      a: updateEditable(someState),
      e: { pa: 0, pr: 1 },
    },
    {
      i: {
        past: [[{ id: 'editable' }]],
        present: [],
        future: [],
      },
      a: updateEditable(someState),
      e: { pa: 1, pr: 1 },
    },
    {
      i: {
        past: [[{ id: 'editable' }]],
        present: [{ id: 'editable' }],
        future: [],
      },
      a: updateEditable(someState),
      e: { pa: 1, pr: 1 },
    },
  ].forEach((c, k) => {
    describe(`test case ${k}`, () => {
      it('should update an existing editable', () => {
        const reducer = combineReducers<RootState>({
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          reactPage: combineReducers({ editables }) as any,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const store = createStore<RootState, any, any, any>(
          reducer,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          { reactPage: { editables: c.i as any } as any },
          identity
        );
        store.dispatch(c.a);
        expect(
          store.getState().reactPage.editables.past.length,
          'to equal',
          c.e.pa
        );
        expect(
          store.getState().reactPage.editables.present.length,
          'to equal',
          c.e.pr
        );
      });
    });
  });
});
