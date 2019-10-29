import React from 'react';
import { Provider, connect as reduxConnect } from 'react-redux';
export const ReduxContext = React.createContext(null);

export const ReduxProvider = ({ store, ...props }) => (
  <Provider store={store} context={ReduxContext} {...props} />
);

export const connect = (
  mapStateToProps?: Function,
  mapDispatchToProps?: Function | Object,
  mergeProps?: Function,
  options: Object = {}
) =>
  reduxConnect(mapStateToProps, mapDispatchToProps, mergeProps, {
    ...options,
    context: ReduxContext,
  });
