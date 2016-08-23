// @flow
import deepEqual from 'deep-equal'
import type { ComponentizedCell, ComponentizedRow } from 'types/editable'
import type { Room, Matrix, Vector, MatrixIndex, Callbacks } from 'types/hover'

type MatrixList = { [key: string]: Matrix }
type CallbackList = { [key: number]: Function }

/**
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
 */
export const classes: { [key: string]: number } = {
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

export const defaultMatrices: MatrixList = {
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
  ],
  '10x10-no-inline': [
    [c.C1, c.AA, c.AA, c.AA, c.AA, c.AA, c.AA, c.AA, c.AA, c.C2],
    [c.LA, c.C1, c.AH, c.AH, c.AH, c.AH, c.AH, c.AH, c.C2, c.RA],
    [c.LA, c.LH, c.C1, c.AH, c.AH, c.AH, c.AH, c.C2, c.RH, c.RA],
    [c.LA, c.LH, c.LH, c.C1, c.AH, c.AH, c.C2, c.RH, c.RH, c.RA],
    [c.LA, c.LH, c.LH, c.LH, c.C1, c.C2, c.RH, c.RH, c.RH, c.RA],
    [c.LA, c.LH, c.LH, c.LH, c.C4, c.C3, c.RH, c.RH, c.RH, c.RA],
    [c.LA, c.LH, c.LH, c.C4, c.BH, c.BH, c.C3, c.RH, c.RH, c.RA],
    [c.LA, c.LH, c.C4, c.BH, c.BH, c.BH, c.BH, c.C3, c.RH, c.RA],
    [c.LA, c.C4, c.BH, c.BH, c.BH, c.BH, c.BH, c.BH, c.C3, c.RA],
    [c.C4, c.BA, c.BA, c.BA, c.BA, c.BA, c.BA, c.BA, c.BA, c.C3]
  ]
}

export const getRoomScale = ({ room, matrix }: { room: Room, matrix: Matrix }): Vector => {
  const rows = matrix.length
  const cells = matrix[0].length

  const scalingX = room.width / cells
  const scalingY = room.height / rows

  return {
    x: scalingX,
    y: scalingY
  }
}

export const getMouseHoverCell = ({ mouse, scale }: { mouse: Vector, scale: Vector }): MatrixIndex => ({
  cell: Math.floor(mouse.x / scale.x),
  row: Math.floor(mouse.y / scale.y)
})

const last = { '10x10': null, '10x10-no-inline': null }

export const computeHover = (item: ComponentizedCell, hover: ComponentizedCell, actions: Callbacks, { room, mouse, matrix, callbacks }: {
  room: Room,
  mouse: Vector,
  callbacks: CallbackList,
  matrix: Matrix
}, m: string): any => {
  const scale = getRoomScale({ room, matrix })
  const hoverCell = getMouseHoverCell({ mouse, scale })
  const rows = matrix.length
  const cells = matrix[0].length

  if (hoverCell.row >= rows) {
    hoverCell.row = rows - 1
  } else if (hoverCell.row < 0) {
    hoverCell.row = 0
  }

  if (hoverCell.cell >= cells) {
    hoverCell.cell = cells - 1
  } else if (hoverCell.cell < 0) {
    hoverCell.cell = 0
  }

  const cell = matrix[hoverCell.row][hoverCell.cell]
  if (!callbacks[cell]) {
    console.error('Matrix callback not found.', { room, mouse, matrix, scale, hoverCell, rows, cells })
    return
  }

  const all = {
    item: item.id, hover: hover.id, actions, ctx: {
      room,
      mouse,
      position: hoverCell,
      size: { rows, cells },
      scale
    }
  }
  if (deepEqual(all, last[m])) {
    return
  }
  last[m] = all

  return callbacks[cell](item, hover, actions, {
    room,
    mouse,
    position: hoverCell,
    size: { rows, cells },
    scale
  })
}

export const relativeMousePosition = ({ mouse, position, scale }: {
  mouse: Vector,
  scale: Vector,
  position: MatrixIndex
}) => ({
  x: Math.round(mouse.x - (position.cell * scale.x)),
  y: Math.round(mouse.y - (position.row * scale.y))
})

export const computeHorizontal = ({ mouse, position, hover, scale, level }: {
  mouse: Vector,
  position: MatrixIndex,
  scale: Vector,
  level: number,
  hover: ComponentizedRow
}, inv : boolean = false) => {
  const { node: { cells = [] } } = hover
  const x = relativeMousePosition({ mouse, position, scale }).x

  // cos(x*pi)*5.5+5.5 (11 level), x = %
  // (sec(x*1.04)-1)*10
  const at = Math.round(x / (scale.x / level))

  if (cells.length) {
    // Is row, always opt for lowest level
    return level
  }

  return inv ? level - at : at
}

export const computeVertical = ({ level, mouse, hover, position, scale }: { level: number, mouse: Vector, hover: ComponentizedRow, position: MatrixIndex, scale: Vector }, inv : boolean = false) => {
  const { node: { cells = [] } } = hover
  const at = Math.round(relativeMousePosition({ mouse, position, scale }).y / (scale.x / level))

  if (cells.length) {
    // Is row, always opt for lowest level
    return level
  }
  return inv ? level - at : at
}

export const defaultCallbacks: CallbackList = {
  [c.NO]: (item: ComponentizedCell, hover: ComponentizedCell, { clear }: Callbacks) => (clear(item.id)),

  /* corners */
  [c.C1]: (item: ComponentizedCell, hover: ComponentizedCell, { leftOf, above }: Callbacks, ctx: Object) => {
    const mouse = relativeMousePosition(ctx)
    if (mouse.x < mouse.y) {
      return leftOf(item.rawNode(), hover.rawNode(), 0)
    }
    above(item.rawNode(), hover.rawNode(), 0)
  },

  [c.C2]: (item: ComponentizedCell, hover: ComponentizedCell, { rightOf, above }: Callbacks, ctx: Object) => {
    const mouse = relativeMousePosition(ctx)
    if (mouse.x > mouse.y) {
      return rightOf(item.rawNode(), hover.rawNode(), 0)
    }
    above(item.rawNode(), hover.rawNode(), 0)
  },

  [c.C3]: (item: ComponentizedCell, hover: ComponentizedCell, { rightOf, below }: Callbacks, ctx: Object) => {
    const mouse = relativeMousePosition(ctx)

    if (mouse.x > mouse.y) {
      return rightOf(item.rawNode(), hover.rawNode(), 0)
    }
    below(item.rawNode(), hover.rawNode(), 0)
  },

  [c.C4]: (item: ComponentizedCell, hover: ComponentizedCell, { leftOf, below }: Callbacks, ctx: Object) => {
    const mouse = relativeMousePosition(ctx)

    if (mouse.x < mouse.y) {
      return leftOf(item.rawNode(), hover.rawNode(), 0)
    }
    below(item.rawNode(), hover.rawNode(), 0)
  },

  /* heres */
  [c.AH]: (item: ComponentizedCell, { node: { inline, hasInlineNeighbour, ...hover } }: ComponentizedCell, { above }: Callbacks) => above(item.rawNode(), {
    inline,
    hasInlineNeighbour, ...hover.rawNode()
  }, 0),
  [c.BH]: (item: ComponentizedCell, { node: { inline, hasInlineNeighbour, ...hover } }: ComponentizedCell, { below }: Callbacks) => below(item.rawNode(), {
    inline,
    hasInlineNeighbour, ...hover.rawNode()
  }, 0),

  [c.LH]: (item: ComponentizedCell, { node: { inline, hasInlineNeighbour, ...hover } }: ComponentizedCell, { leftOf }: Callbacks) => leftOf(item.rawNode(), {
    inline,
    hasInlineNeighbour, ...hover.rawNode()
  }, 0),
  [c.RH]: (item: ComponentizedCell, { node: { inline, hasInlineNeighbour, ...hover } }: ComponentizedCell, { rightOf }: Callbacks) => rightOf(item.rawNode(), {
    inline,
    hasInlineNeighbour, ...hover.rawNode()
  }, 0),

  /* ancestors */
  [c.AA]: (item: ComponentizedCell, hover: ComponentizedCell, { above }: Callbacks, ctx: Object) => above(item.rawNode(), hover.rawNode(), computeVertical({
    ...ctx,
    hover,
    level: hover.node.levels.above
  }, true)),
  [c.BA]: (item: ComponentizedCell, hover: ComponentizedCell, { below }: Callbacks, ctx: Object) => below(item.rawNode(), hover.rawNode(), computeVertical({
    ...ctx,
    hover,
    level: hover.node.levels.below
  })),

  [c.LA]: (item: ComponentizedCell, hover: ComponentizedCell, { leftOf }: Callbacks, ctx: Object) => leftOf(item.rawNode(), hover.rawNode(), computeHorizontal({
    ...ctx,
    hover,
    level: hover.node.levels.left
  }, true)),
  [c.RA]: (item: ComponentizedCell, hover: ComponentizedCell, { rightOf }: Callbacks, ctx: Object) => rightOf(item.rawNode(), hover.rawNode(), computeHorizontal({
    ...ctx,
    hover,
    level: hover.node.levels.right
  })),

  /* inline */
  [c.IL]: (item: ComponentizedCell, hover: ComponentizedCell, { inlineLeft, leftOf }: Callbacks) => {
    const { node: { inline, hasInlineNeighbour } } = hover
    const { node: { content: { plugin: { inlineable = false } = {} } } } = item
    if (inline || !inlineable) {
      return leftOf(item.rawNode(), hover.rawNode(), 2)
    }
    if (hasInlineNeighbour && hasInlineNeighbour !== item.id) {
      return leftOf(item.rawNode(), hover.rawNode(), 2)
    }
    if (hasInlineNeighbour && hasInlineNeighbour === item.id && item.node.inline === 'left') {
      return leftOf(item.rawNode(), hover.rawNode(), 2)
    }

    inlineLeft(item.rawNode(), hover.rawNode())
  },

  [c.IR]: (item: ComponentizedCell, hover: ComponentizedCell, { inlineRight, rightOf }: Callbacks) => {
    const { node: { inline, hasInlineNeighbour } } = hover
    const { node: { content: { plugin: { inlineable = false } = {} } } } = item
    if (inline || !inlineable) {
      return rightOf(item.rawNode(), hover.rawNode(), 2)
    }
    if (hasInlineNeighbour && hasInlineNeighbour !== item.id) {
      return rightOf(item.rawNode(), hover.rawNode(), 2)
    }
    if (hasInlineNeighbour && hasInlineNeighbour === item.id && item.node.inline === 'right') {
      return rightOf(item.rawNode(), hover.rawNode(), 2)
    }

    inlineRight(item.rawNode(), hover.rawNode())
  }
}

export default class HoverService {
  callbacks: CallbackList = defaultCallbacks
  matrices: MatrixList = defaultMatrices

  constructor({ matrices, callbacks }: { matrices: MatrixList, callbacks: CallbackList } = {}) {
    this.matrices = matrices || this.matrices
    this.callbacks = callbacks || this.callbacks
  }

  hover(item: ComponentizedCell,
        hover: ComponentizedCell,
        actions: Callbacks,
    { room, mouse, matrix: use = '10x10' }: { room: Room, mouse: Vector, matrix: string }) {
    return computeHover(item, hover, actions, {
      room,
      mouse,
      matrix: this.matrices[use],
      callbacks: this.callbacks
    }, use)
  }
}
