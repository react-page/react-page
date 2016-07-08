export const getRoomScale = ({ room, matrix }) => {
  const rows = matrix.length
  const cells = matrix[0].length

  const scalingX = room.width / cells
  const scalingY = room.height / rows

  return {
    x: scalingX,
    y: scalingY
  }
}

export const getMouseHoverCell = ({ mouse, scale }) => ({
  cell: Math.floor(mouse.x / scale.x),
  row: Math.floor(mouse.y / scale.y)
})

export const computeHover = (item, hover, actions, { room, mouse, matrix, callbacks }) => {
  const scale = getRoomScale({ room, matrix })
  const hoverCell = getMouseHoverCell({ mouse, scale })
  const rows = matrix.length
  const cells = matrix[0].length

  if (hoverCell.row >= rows) {
    hoverCell.row = rows - 1
  }
  if (hoverCell.cell >= cells) {
    hoverCell.cell = cells - 1
  }

  const cell = matrix[hoverCell.row][hoverCell.cell]
  return callbacks[cell](item, hover, actions, {
    room,
    mouse,
    position: hoverCell,
    size: { rows, cells },
    scale
  })
}

/**
 *
 * NO (None): No drop zone.
 *
 * Corners are counted clockwise, beginning top left
 * C1 (Corner top left): Position decided by top left corner function
 * C2 (Corner top right): Position decided by top right corner function
 * C3 (Corner bottom right): Position decided by bottom right corner function
 * C4 (Corner bottom left): Position decided by bottom left corner function
 *
 * Above:
 * AH (Above here): above, same level
 * AA (Above of self or some ancestor): Above, compute active level using classification functions, e.g. log, sin, mx + t
 *
 * Below:
 * BH (Below here)
 * BA (Below of self or some ancestor)
 *
 * Left of:
 * LH (Left of here)
 * LA (Left of self or some ancestor)
 *
 * Right of:
 * RH (Right of here)
 * RA (Right of self or some ancestor)
 *
 * Inside / inline
 * IL (Inline left)
 * IR (Inline right)
 *
 * @type {{C1: number, C2: number, C3: number, C4: number, AH: number, AA: number, BH: number, BA: number, LH: number, LA: number, RH: number, RA: number, IL: number, IR: number}}
 */
export const classes = {
  NO: 0,

  C1: 10,
  C2: 11,
  C3: 12,
  C4: 13,

  AH: 200,
  AA: 201,

  BH: 210,
  BA: 211,

  LH: 220,
  LA: 221,

  RH: 230,
  RA: 231,

  IL: 300,
  IR: 301
}

const c = classes
export const matrices = {
  '6x6': [
    [c.C1, c.AA, c.AA, c.AA, c.AA, c.C2],
    [c.LA, c.IL, c.AH, c.AH, c.IR, c.RA],
    [c.LA, c.LH, c.NO, c.NO, c.RH, c.RA],
    [c.LA, c.LH, c.NO, c.NO, c.RH, c.RA],
    [c.LA, c.C4, c.BH, c.BH, c.C3, c.RA],
    [c.C4, c.BA, c.BA, c.BA, c.BA, c.C3]
  ],
  '10x10': [
    [c.C1, c.AA, c.AA, c.AA, c.AA, c.AA, c.AA, c.AA, c.AA, c.C2],
    [c.LA, c.IL, c.IL, c.IL, c.AH, c.AH, c.IR, c.IR, c.IR, c.RA],
    [c.LA, c.IL, c.IL, c.IL, c.AH, c.AH, c.IR, c.IR, c.IR, c.RA],
    [c.LA, c.IL, c.IL, c.IL, c.AH, c.AH, c.IR, c.IR, c.IR, c.RA],
    [c.LA, c.LH, c.LH, c.LH, c.C1, c.C2, c.RH, c.RH, c.RH, c.RA],
    [c.LA, c.LH, c.LH, c.LH, c.C4, c.C3, c.RH, c.RH, c.RH, c.RA],
    [c.LA, c.LH, c.LH, c.C4, c.BH, c.BH, c.C3, c.IR, c.RH, c.RA],
    [c.LA, c.LH, c.C4, c.BH, c.BH, c.BH, c.BH, c.C3, c.RH, c.RA],
    [c.LA, c.C4, c.BH, c.BH, c.BH, c.BH, c.BH, c.BH, c.C3, c.RA],
    [c.C4, c.BA, c.BA, c.BA, c.BA, c.BA, c.BA, c.BA, c.BA, c.C3]
  ]
}


const relativeMousePosition = ({ mouse, position, scale }) => ({
  x: Math.round(mouse.x - (position.cell * scale.x)),
  y: Math.round(mouse.y - (position.row * scale.y))
})

const computeHorizontal = ({ mouse, position, hover, scale, level }, inv = false) => {
  const { inline, hasInlineNeighbour } = hover
  const at = relativeMousePosition({ mouse, position, scale }).x % (level + 1)
  if ((inline || hasInlineNeighbour) && at < 2) {
    return 2
  }
  return inv ? level - at : at
}

const computeVertical = ({ level, mouse, position, scale }, inv = false) => inv
  ? level - (relativeMousePosition({ mouse, position, scale }).y % (level + 1))
  : relativeMousePosition({ mouse, position, scale }).y % (level + 1)

export const callbacks = {
  [c.NO]: (item, hover, { cancel }) => (cancel(item.id)),

  /* corners */
  [c.C1]: (item, hover, { leftOf, above }, ctx) => {
    const mouse = relativeMousePosition(ctx)
    if (mouse.x < mouse.y) {
      return leftOf(item, hover, computeHorizontal({ ...ctx, hover, level: hover.levels.left }, true))
    }
    above(item, hover, computeVertical({ ...ctx, hover, level: hover.levels.above }, true))
  },

  [c.C2]: (item, hover, { rightOf, above }, ctx) => {
    const mouse = relativeMousePosition(ctx)
    if (mouse.x > mouse.y) {
      return rightOf(item, hover, computeHorizontal({ ...ctx, hover, level: hover.levels.right }))
    }
    above(item, hover, computeVertical({ ...ctx, hover, level: hover.levels.above }, true))
  },

  [c.C3]: (item, hover, { rightOf, below }, ctx) => {
    const mouse = relativeMousePosition(ctx)

    if (mouse.x > mouse.y) {
      return rightOf(item, hover, computeHorizontal({ ...ctx, hover, level: hover.levels.right }))
    }
    below(item, hover, computeVertical({ ...ctx, hover, level: hover.levels.below }))
  },

  [c.C4]: (item, hover, { leftOf, below }, ctx) => {
    const mouse = relativeMousePosition(ctx)

    if (mouse.x < mouse.y) {
      return leftOf(item, hover, computeHorizontal({ ...ctx, hover, level: hover.levels.left }, true))
    }
    below(item, hover, computeVertical({ ...ctx, hover, level: hover.levels.below }))
  },

  /* heres */
  [c.AH]: (item, hover, { above }) => above(item, hover, 0),
  [c.BH]: (item, hover, { below }) => below(item, hover, 0),

  [c.LH]: ({ inline, hasInlineNeighbour, ...item }, hover, { leftOf }) => leftOf(item, hover, inline || hasInlineNeighbour ? 2 : 0),
  [c.RH]: ({ inline, hasInlineNeighbour, ...item }, hover, { rightOf }) => rightOf(item, hover, inline || hasInlineNeighbour ? 2 : 0),

  /* ancestors */
  [c.AA]: (item, hover, { above }, ctx) => above(item, hover, computeVertical({
    ...ctx,
    hover,
    level: hover.levels.above
  }, true)),
  [c.BA]: (item, hover, { below }, ctx) => below(item, hover, computeVertical({
    ...ctx,
    hover,
    level: hover.levels.below
  })),

  [c.LA]: (item, hover, { leftOf }, ctx) => leftOf(item, hover, computeHorizontal({
    ...ctx,
    hover,
    level: hover.levels.left
  }, true)),
  [c.RA]: (item, hover, { rightOf }, ctx) => rightOf(item, hover, computeHorizontal({
    ...ctx,
    hover,
    level: hover.levels.right
  })),

  /* inline */
  [c.IL]: (item, hover, { inlineLeft, leftOf }) => {
    const { inline, hasInlineNeighbour } = hover
    if (inline || hasInlineNeighbour) {
      return leftOf(item, hover, 2)
    }

    inlineLeft(item, hover)
  },

  [c.IR]: (item, hover, { inlineRight, rightOf }) => {
    const { inline, hasInlineNeighbour } = hover
    if (inline || hasInlineNeighbour) {
      return rightOf(item, hover, 2)
    }

    inlineRight(item, hover)
  }
}

export default class HoverService {
  constructor({ matrix: m = matrices['10x10'], callbacks: cbs = callbacks } = {}) {
    this.matrix = m
    this.callbacks = cbs
  }

  hover(item, hover, actions, { room, mouse }) {
    return computeHover(item, hover, actions, {
      room,
      mouse,
      matrix: this.matrix,
      callbacks: this.callbacks
    })
  }
}
