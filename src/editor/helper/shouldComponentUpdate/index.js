import deepEqual from 'deep-equal'

export const shouldPureComponentUpdate = function (nextProps) {
  // eslint-disable-next-line no-invalid-this
  const lastKeys = Object.keys(this.props)
  const nextKeys = Object.keys(nextProps)
  if (!deepEqual(lastKeys, nextKeys)) {
    return false
  }

  const next = nextKeys.filter((k) => typeof nextProps[k] !== 'function')
  // eslint-disable-next-line no-invalid-this
  const changed = next.filter((k) => !deepEqual(nextProps[k], this.props[k])).length

  return changed > 0
}
