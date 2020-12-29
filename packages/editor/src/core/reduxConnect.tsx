/* eslint-disable @typescript-eslint/ban-types */
import React, { Dispatch } from 'react';
import {
  connect as reduxConnect,
  Provider,
  createStoreHook,
  createDispatchHook,
  createSelectorHook,
} from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from './types';
export const ReduxContext = React.createContext(null);

export const ReduxProvider = ({ store, ...props }) => (
  <Provider store={store} context={ReduxContext} {...props} />
);

export const useStore = createStoreHook<RootState>(ReduxContext);
export const useDispatch = createDispatchHook(
  ReduxContext
) as () => Dispatch<any>;
export const useSelector = createSelectorHook<RootState>(ReduxContext);

/**
 * @deprecated use `useSelector` hook
 */
export const connect = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mapStateToProps?: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mapDispatchToProps?: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mergeProps?: any,
  options = {}
) =>
  reduxConnect(mapStateToProps, mapDispatchToProps, mergeProps, {
    ...options,
    context: ReduxContext,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }) as (C: any) => any;
