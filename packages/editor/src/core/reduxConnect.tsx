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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ReduxContext = React.createContext<any>(null);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ReduxProvider = ({ store, ...props }: any) => (
  <Provider store={store} context={ReduxContext} {...props} />
);

export const useStore = createStoreHook<RootState>(ReduxContext);
export const useDispatch = createDispatchHook(
  ReduxContext
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) as () => Dispatch<any>;
export const useSelector = createSelectorHook<RootState>(ReduxContext);
