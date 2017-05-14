// @flow
import equals from 'ramda/src/equals'

export const shouldPureComponentUpdate = function(next: Object) {
  const filterFunctions = (o: Object) => (key: string) =>
    typeof o[key] !== 'function'
  const prevKeys = Object.keys(next).filter(filterFunctions(next))
  // eslint-disable-next-line no-invalid-this
  const nextKeys = Object.keys(this.props).filter(filterFunctions(this.props))

  if (!equals(nextKeys, prevKeys)) {
    // console.log('Keys are mismatching', nextKeys, prevKeys)
    return true
  }

  // eslint-disable-next-line no-invalid-this
  const changed = nextKeys.filter(
    (key: string) => !equals(next[key], this.props[key])
  )

  // if (changed.length > 0) {
  //   console.log('There have been at least one changed fields: ', changed.map((c) => ({
  //     key: c,
  //     now: this.props[c],
  //     next: next[c]
  //   })))
  // } else {
  //   console.log('No changes deteced, skipping render.')
  // }

  return changed.length > 0
}
