// @flow
import React, { Component, PropTypes } from 'react'

const connect = () => (WrappedComponent: Component) => {
  const Decorator = (props: any = {}, { isServerContext = false }: { isServerContext: bool }) =>
    <WrappedComponent {...{ ...props, isServerContext }} />

  Decorator.contextTypes = {
    isServerContext: PropTypes.bool
  }

  return Decorator
}

export default connect
