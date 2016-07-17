import deepEqual from 'deep-equal'

export const shouldPureComponentUpdate = function (nextProps) {
  // eslint-disable-next-line no-invalid-this
  return !deepEqual(this.props, nextProps)
}
