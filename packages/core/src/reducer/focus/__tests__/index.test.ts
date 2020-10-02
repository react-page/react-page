import { combineReducers, createStore } from 'redux';
import expect from 'unexpected';
import { blurCell, focusCell } from '../../../actions/cell/index';
import { RootState } from '../../../types/state';
import { focus } from '../index';
const identity = <T>(arg: T) => arg;

describe('editor/reducer/focus', () => {
  [
    {
      s: '',
      a: blurCell('1234'),
      e: '',
    },
    {
      s: '12341',
      a: focusCell('1234'),
      e: '1234',
    },
    {
      s: '',
      a: focusCell('4321'),
      e: '4321',
    },
    {
      s: '4321',
      a: blurCell('1234'),
      e: '4321',
    },
  ].forEach((c, k) => {
    describe(`test case ${k}`, () => {
      it('should dispatch the action and return the expected result', () => {
        const reducer = combineReducers<RootState>({
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          reactPage: combineReducers({ focus }) as any,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const store = createStore<RootState, any, any, any>(
          reducer,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          { reactPage: { focus: c.s } as any },
          identity
        );
        store.dispatch(c.a());
        expect(store.getState().reactPage, 'to equal', { focus: c.e });
      });
    });
  });
});
