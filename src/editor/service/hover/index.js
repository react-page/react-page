export const getRoomScale = ({ room, matrix }) => {
  const rows = matrix.length
  const cells = matrix[0].length

  const scalingX = room.x / cells
  const scalingY = room.y / rows

  return {
    x: scalingX,
    y: scalingY
  }
}

export const getMouseHoverCell = ({ mouse, scale }) => ({
  cell: Math.round(mouse.x / scale.x),
  row: Math.round(mouse.y / scale.y)
})

export const computeHover = (hover, item, actions, { room, mouse, ancestors, matrix, callbacks }) => {
  const scale = getRoomScale({ room, matrix })
  const hoverCell = getMouseHoverCell({ mouse, scale })
  const cell = matrix[hoverCell.row][hoverCell.cell]

  return callbacks[cell](hover, item, actions, {
    room,
    mouse,
    ancestors,
    scale
  })
}

export default class HoverService {
  constructor({ matrix, callbacks }) {
    this.matrix = matrix
    this.callbacks = callbacks
  }

  hover(hover, item, actions, { room, mouse, ancestors }) {
    return computeHover(hover, item, actions, {
      room,
      mouse,
      ancestors,
      matrix: this.matrix,
      callbacks: this.callbacks
    })
  }
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

export const callbacks = {
  [c.C1]: () => ({}),
  [c.C2]: () => ({}),
  [c.C3]: () => ({}),
  [c.C4]: () => ({}),

  [c.AH]: (hover, item, { above }) => above(hover, item, 0),
  [c.BH]: (hover, item, { below }) => below(hover, item, 0),

  [c.LH]: ({ inline, hasInlineNeighbour, ...hover }, item, { leftOf }) => {
    if (inline || hasInlineNeighbour) {
      return leftOf(hover, item, 2)
    }

    return leftOf(hover, item, 0)
  },
  [c.RH]: ({ inline, hasInlineNeighbour, ...hover }, item, { rightOf }) => {
    if (inline || hasInlineNeighbour) {
      return rightOf(hover, item, 2)
    }

    return rightOf(hover, item, 0)
  },

  [c.AA]: (hover, item, { above }, { room, mouse, ancestors, scale }) => {
    const level = 0
    above(hover, item, level)
  },
  [c.BA]: (hover, item, { below }, { room, mouse, ancestors, scale }) => {
    const level = 0
    below(hover, item, level)
    below(level)
  },

  [c.LA]: ({ inline, hasInlineNeighbour }, item, { leftOf }, { room, mouse, ancestors, scale }) => {
    const level = 0
    leftOf(hover, item, level)
  },
  [c.RA]: ({ inline, hasInlineNeighbour }, item, { rightOf }, { room, mouse, ancestors, scale }) => {
    const level = 0
    rightOf(hover, item, level)
  },

  [c.IL]: (hover, item, { inlineLeft, leftOf }, { room, mouse, ancestors, scale }) => {
    const level = 0
    inlineLeft(hover, item, level)
  },
  [c.IR]: (hover, item, { inlineRight, rightOf }, { room, mouse, ancestors, scale }) => {
    const level = 0
    inlineRight(hover, item, level)
  }
}
