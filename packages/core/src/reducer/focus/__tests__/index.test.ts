import { combineReducers, createStore } from 'redux';
import expect from 'unexpected';
import { blurAllCells, blurCell, focusCell } from '../../../actions/cell/index';
import { RootState } from '../../../types/state';
import { Focus, focus } from '../index';
const identity = <T>(arg: T) => arg;

const makeStore = (initialFocus: Focus) => {
  const reducer = combineReducers<RootState>({
    reactPage: combineReducers<RootState['reactPage']>({
      focus,
      hover: (s) => s || null,
      display: (s) => s || null,
      settings: (s) => s || null,
      editables: (s) => s || null,
    }),
  });

  return createStore<RootState, any, any, any>(
    reducer,
    {
      reactPage: {
        hover: null,
        focus: initialFocus,
        display: {
          mode: 'asdf',
        },
        editables: {
          future: [],
          past: [],
          present: [],
        },
        settings: {
          lang: null,
        },
      },
    },
    identity
  );
};

describe('editor/reducer/focus', () => {
  it('focus a cell', () => {
    const store = makeStore({ nodeId: undefined });
    store.dispatch(focusCell('1234'));
    const expected: Focus = {
      nodeId: '1234',
      scrollToCell: null,
      source: undefined,
    };
    expect(store.getState().reactPage.focus, 'to equal', expected);
  });

  it('can set scrollToCell', () => {
    const store = makeStore({ nodeId: undefined });
    store.dispatch(focusCell('1234', true));

    expect(store.getState().reactPage.focus.nodeId, 'to equal', '1234');
    expect(
      store.getState().reactPage.focus.scrollToCell,
      'to be greater than',
      0
    );
  });
  it('changes the focused cell', () => {
    const store = makeStore({ nodeId: '3432' });
    store.dispatch(focusCell('4444'));
    const expected: Focus = {
      nodeId: '4444',
      scrollToCell: null,
      source: undefined,
    };
    expect(store.getState().reactPage.focus, 'to equal', expected);
  });
  it('can blur a cell', () => {
    const store = makeStore({ nodeId: '4444' });
    store.dispatch(blurCell('4444'));
    const expected: Focus = null;
    expect(store.getState().reactPage.focus, 'to equal', expected);
  });

  it('does not blur a cell when its not targeted', () => {
    const store = makeStore({ nodeId: '3333' });
    store.dispatch(blurCell('4444'));
    const expected: Focus = {
      nodeId: '3333',
    };
    expect(store.getState().reactPage.focus, 'to equal', expected);
  });

  it('can blur all cells', () => {
    const store = makeStore({ nodeId: '3333' });
    store.dispatch(blurAllCells());
    const expected: Focus = null;
    expect(store.getState().reactPage.focus, 'to equal', expected);
  });
});
