/* eslint-disable @typescript-eslint/ban-types */
import React from 'react';
import { connect as reduxConnect, Provider } from 'react-redux';
export const ReduxContext = React.createContext(null);

export const ReduxProvider = ({ store, ...props }) => (
  <Provider store={store} context={ReduxContext} {...props} />
);

export const connect = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mapStateToProps?: any,
  mapDispatchToProps?: Function | Object,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mergeProps?: any,
  options = {}
) =>
  reduxConnect(mapStateToProps, mapDispatchToProps, mergeProps, {
    ...options,
    context: ReduxContext,
  });
