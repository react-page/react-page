import React from 'react';
import { connect as reduxConnect, Provider } from 'react-redux';
export const ReduxContext = React.createContext(null);

export const ReduxProvider = ({ store, ...props }) => (
  <Provider store={store} context={ReduxContext} {...props} />
);

// tslint:disable-next-line:no-any
export const connect: any = (
  // tslint:disable-next-line:no-any
  mapStateToProps?: any,
  mapDispatchToProps?: Function | Object,
  // tslint:disable-next-line:no-any
  mergeProps?: any,
  options: Object = {}
) =>
  reduxConnect(mapStateToProps, mapDispatchToProps, mergeProps, {
    ...options,
    context: ReduxContext,
  });
