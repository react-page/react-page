import { renderHook } from '@testing-library/react-hooks';

import { useNodeDropLevels } from '..';
import Provider from '../../../Provider';
import React from 'react';
import { EditableType } from '../../..';

const SAMPLE_STATE: EditableType = {
  version: 1,
  id: 'editableId',
  rows: [
    {
      id: 'row0',
      cells: [
        {
          id: 'outer1',
          rows: [
            {
              id: 'row1',
              cells: [
                {
                  id: 'inner1',
                  plugin: {
                    id: 'someplugin',
                    version: 1,
                  },
                },
                {
                  id: 'inner2',
                  plugin: {
                    id: 'someplugin',
                    version: 1,
                  },
                },
                {
                  id: 'inner3',
                  plugin: {
                    id: 'someplugin',
                    version: 1,
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
describe('useNodeDropLevels', () => {
  it('tells that cells that have siblings on the right have drop level 0 there', () => {
    const Wrapper = ({ children }) => (
      <Provider plugins={[]} lang="en" value={[SAMPLE_STATE]}>
        {children}
      </Provider>
    );

    const { result } = renderHook(
      () => {
        return useNodeDropLevels('inner1');
      },
      {
        wrapper: Wrapper,
      }
    );
    expect(result.current).toEqual({
      left: 3,
      right: 0,
      above: 3,
      below: 3,
    });
  });
  it('center nodes have drop level 0 on left and right', () => {
    const Wrapper = ({ children }) => (
      <Provider plugins={[]} lang="en" value={[SAMPLE_STATE]}>
        {children}
      </Provider>
    );

    const { result } = renderHook(
      () => {
        return useNodeDropLevels('inner2');
      },
      {
        wrapper: Wrapper,
      }
    );
    expect(result.current).toEqual({
      left: 0,
      right: 0,
      above: 3,
      below: 3,
    });
  });
  it('last node in a row have drop level >0 on the right', () => {
    const Wrapper = ({ children }) => (
      <Provider plugins={[]} lang="en" value={[SAMPLE_STATE]}>
        {children}
      </Provider>
    );

    const { result } = renderHook(
      () => {
        return useNodeDropLevels('inner3');
      },
      {
        wrapper: Wrapper,
      }
    );
    expect(result.current).toEqual({
      left: 0,
      right: 3,
      above: 3,
      below: 3,
    });
  });
});
