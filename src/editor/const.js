/**
 * A list of positions in the layout space.
 */
export const positions = {
  LEFT_OF: 'left-of',
  RIGHT_OF: 'right-of',
  ABOVE: 'above',
  BELOW: 'below',
  INLINE_LEFT: 'inline-left',
  INLINE_RIGHT: 'inline-right'
}

/**
 * Is true if built in production mode.
 */
export const isProduction = process.env.NODE_ENV === 'production'
