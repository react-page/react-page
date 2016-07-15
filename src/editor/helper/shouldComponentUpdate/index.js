export const shouldPureComponentUpdate = function (nextProps) {
  // eslint-disable-next-line no-invalid-this
  return nextProps !== this.props
}
