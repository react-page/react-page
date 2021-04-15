/* eslint-disable @typescript-eslint/ban-types */
import type { Dispatch } from 'react';
import React from 'react';
import {
  createDispatchHook,
  createSelectorHook,
  createStoreHook,
  Provider,
} from 'react-redux';
import type { RootState } from './types';
export const ReduxContext = React.createContext(null);

export const ReduxProvider = ({ store, ...props }) => (
  <Provider store={store} context={ReduxContext} {...props} />
);

export const useStore = createStoreHook<RootState>(ReduxContext);
export const useDispatch = createDispatchHook(
  ReduxContext
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) as () => Dispatch<any>;
export const useSelector = createSelectorHook<RootState>(ReduxContext);
