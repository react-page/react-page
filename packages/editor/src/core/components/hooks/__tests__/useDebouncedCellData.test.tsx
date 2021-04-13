import { render } from 'enzyme';
import React from 'react';

import { findNodeInState } from '../../../selector/editable';
import { getCellData } from '../../../utils/getCellData';
import { CellPlugin } from '../../../types';
import createStore from '../../../store';
import { initialState } from '../../../reducer';
import { ReduxProvider } from '../../../reduxConnect';
import { createEditable } from '../../../utils/createEditable';
import { useDebouncedCellData } from '../node';
import { updateCellData } from '../../../actions/cell';

const cellPlugins: CellPlugin[] = [
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

const theState = initialState(
  createEditable(
    {
      id: 'editableId',
      rows: [
        {
          id: 'row0',
          cells: [
            {
              id: 'cell0',
              plugin: 'foo',
            },
          ],
        },
      ],
    },
    options
  ),
  options.lang
);

describe('useDebouncedCellData', () => {
  it("updates don't overwrite each other", (done) => {
    const store = createStore(theState);
    const Component: React.FC<unknown> = () => {
      const [, setData] = useDebouncedCellData('cell0');
      React.useEffect(() => {
        setData({ a: 1 }, {});
        setData({ b: 1 }, {});
      }, []);
      return <div />;
    };

    render(
      <ReduxProvider store={store}>
        <Component />
      </ReduxProvider>
    );

    setTimeout(() => {
      const data = getCellData(
        findNodeInState(store.getState(), 'cell0').node,
        options.lang
      );
      expect(data).toMatchObject({ a: 1, b: 1 });
      done();
    }, 300);
  });

  it('handles outside changes correctly', (done) => {
    const store = createStore(theState);
    const Component: React.FC<unknown> = () => {
      const [, setData] = useDebouncedCellData('cell0');
      React.useEffect(() => {
        setData({ a: 1 }, {});
        setData({ b: 1 }, {});
        // overwrite the changes
        store.dispatch(
          updateCellData('cell0')({ c: 1 }, { lang: options.lang })
        );
      }, []);
      return <div />;
    };

    render(
      <ReduxProvider store={store}>
        <Component />
      </ReduxProvider>
    );

    setTimeout(() => {
      const data = getCellData(
        findNodeInState(store.getState(), 'cell0').node,
        options.lang
      );
      expect(data).toMatchObject({ c: 1 });
      done();
    }, 300);
  });

  it('returns a referentially stable callback', (done) => {
    const store = createStore(theState);
    const Component: React.FC<unknown> = () => {
      const [, setData] = useDebouncedCellData('cell0');

      const ref = React.useRef(setData);
      expect(ref.current).toBe(setData);

      React.useEffect(() => {
        setData({ a: 1 }, {});
      }, []);

      return <div />;
    };

    render(
      <ReduxProvider store={store}>
        <Component />
      </ReduxProvider>
    );

    setTimeout(() => {
      const data = getCellData(
        findNodeInState(store.getState(), 'cell0').node,
        options.lang
      );
      expect(data).toMatchObject({ a: 1 });
      done();
    }, 300);
  });
});
