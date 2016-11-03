// @flow
import equals from 'ramda/src/equals'

export const shouldPureComponentUpdate = function (next: Object) {
  const filterFunctions = (o: Object) => (key: string) => typeof o[key] !== 'function'
  const prevKeys = Object.keys(next).filter(filterFunctions(next))
  // eslint-disable-next-line no-invalid-this
  const nextKeys = Object.keys(this.props).filter(filterFunctions(this.props))

  if (!equals(nextKeys, prevKeys)) {
    return true
  }

  // eslint-disable-next-line no-invalid-this
  const changed = nextKeys.filter((key: string) => !equals(next[key], this.props[key]))
  // this can be used for debugging
  // console.log(changed, changed.map((key: string) => ({ next: next[key], prev: this.props[key] })))

  return changed.length > 0
}
