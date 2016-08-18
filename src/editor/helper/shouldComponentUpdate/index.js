// @flow
import deepEqual from 'deep-equal'

export const shouldPureComponentUpdate = function (nextProps: Object) {
  // eslint-disable-next-line no-invalid-this
  return !deepEqual(this.props, nextProps)
}
