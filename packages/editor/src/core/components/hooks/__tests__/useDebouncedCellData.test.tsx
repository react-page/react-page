import { render, act } from '@testing-library/react';
import React from 'react';

import { findNodeInState } from '../../../selector/editable';
import { getCellData } from '../../../utils/getCellData';
import type { Cell, CellPluginList } from '../../../types';
import createStore from '../../../store';
import { initialState } from '../../../reducer';
import { ReduxProvider } from '../../../reduxConnect';
import { createValue } from '../../../utils/createValue';
import { useCell, useCellData, useDebouncedCellData } from '../node';
import { updateCellData } from '../../../actions/cell';

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

const theState = initialState(
  createValue(
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
        findNodeInState(store.getState(), 'cell0')?.node as Cell,
        options.lang
      );
      expect(data).toMatchObject({ a: 1, b: 1 });
      done();
    }, 300);
  });

  /*

  this test fails. We had to change the behaviour of useDebouncedCellData to not cancel pending updates
  the problem is that it was hard to get the timing right on normal cases (where no exteranl changes happen)
  
  it('handles outside changes correctly', (done) => {
    const store = createStore(theState);
    const Component: React.FC<unknown> = () => {
      const [, setData] = useDebouncedCellData('cell0');

      // some weird redux bug: we need to call    useCellData('cell0');
      // i have no idea why, but otherwise the component does not rerender, altough
      // useDebouncedCellData already calls    useCellData('cell0');
      // i assume its a redux bug
      const cellData = useCellData('cell0');

      React.useEffect(() => {
        setData({ a: 1 }, {});
        setData({ b: 1 }, {});
        store.dispatch(
          updateCellData('cell0')({ c: 1 }, { lang: options.lang })
        );
      }, []);
      return <div />;
    };
    act(() => {
      render(
        <ReduxProvider store={store}>
          <Component />
        </ReduxProvider>
      );
    });

    setTimeout(() => {
      const data = getCellData(
        findNodeInState(store.getState(), 'cell0')?.node as Cell,
        options.lang
      );
      expect(data).toMatchObject({ c: 1 });
      done();
    }, 300);
  });

  */
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
        findNodeInState(store.getState(), 'cell0')?.node as Cell,
        options.lang
      );
      expect(data).toMatchObject({ a: 1 });
      done();
    }, 300);
  });
});
