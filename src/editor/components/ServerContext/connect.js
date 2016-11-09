// @flow
import React, { PropTypes } from 'react'

const connect = () => (WrappedComponent: any) => {
  const Decorator = (props: any = {}, { isServerContext = false }: { isServerContext: bool }) =>
    <WrappedComponent {...{ ...props, isServerContext }} />

  Decorator.contextTypes = {
    isServerContext: PropTypes.bool
  }

  return Decorator
}

export default connect
