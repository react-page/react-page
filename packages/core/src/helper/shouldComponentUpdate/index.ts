import equals from 'fast-deep-equal';

/* TODO: this is only used in one place anymore, we should remove it */
export const shouldPureComponentUpdate = function(next: Object) {
  const filterFunctions = (o: Object) => (key: string) =>
    typeof o[key] !== 'function';
  const prevKeys = Object.keys(next).filter(filterFunctions(next));
  // eslint-disable-next-line no-invalid-this
  const nextKeys = Object.keys(this.props).filter(filterFunctions(this.props));

  if (!equals(nextKeys, prevKeys)) {
    // console.log('Keys are mismatching', nextKeys, prevKeys)
    return true;
  }

  // eslint-disable-next-line no-invalid-this
  const changed = nextKeys.filter(
    (key: string) => !equals(next[key], this.props[key])
  );

  return changed.length > 0;
};
