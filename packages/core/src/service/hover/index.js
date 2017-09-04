// @flow
import deepEqual from 'deep-equal'

import type { ComponetizedCell, ComponetizedRow } from '../../types/editable'
import type {
  Room,
  Matrix,
  Vector,
  MatrixIndex,
  Callbacks
} from '../../types/hover'
import logger from '../logger'

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

/**
 * A list of matrices that are used to define the callback function.
 *
 * @type {{6x6: *[], 10x10: *[], 10x10-no-inline: *[]}}
 */
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

/**
 * Computes the average width and height for cells in a room.
 *
 * @param room
 * @param matrix
 * @returns {{x: number, y: number}}
 */
export const getRoomScale = ({
  room,
  matrix
}: {
  room: Room,
  matrix: Matrix
}): Vector => {
  const rows = matrix.length
  const cells = matrix[0].length

  const scalingX = room.width / cells
  const scalingY = room.height / rows

  return {
    x: scalingX,
    y: scalingY
  }
}

/**
 * Returns the index of the hover cell.
 *
 * @param mouse
 * @param scale
 */
export const getMouseHoverCell = ({
  mouse,
  scale
}: {
  mouse: Vector,
  scale: Vector
}): MatrixIndex => ({
  cell: Math.floor(mouse.x / scale.x),
  row: Math.floor(mouse.y / scale.y)
})

/**
 * Used for caching.
 */
const last = { '10x10': null, '10x10-no-inline': null }

export const computeHover = (
  drag: ComponetizedCell,
  hover: ComponetizedCell,
  actions: Callbacks,
  {
    room,
    mouse,
    matrix,
    callbacks
  }: {
    room: Room,
    mouse: Vector,
    callbacks: CallbackList,
    matrix: Matrix
  },
  m: string
): any => {
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
    logger.error('Matrix callback not found.', {
      room,
      mouse,
      matrix,
      scale,
      hoverCell,
      rows,
      cells
    })
    return
  }

  const all = {
    item: drag.id,
    hover: hover.id,
    actions,
    ctx: {
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

  return callbacks[cell](drag, hover, actions, {
    room,
    mouse,
    position: hoverCell,
    size: { rows, cells },
    scale
  })
}

/**
 * Return the mouse position relative to the cell.
 */
export const relativeMousePosition = ({
  mouse,
  position,
  scale
}: {
  mouse: Vector,
  scale: Vector,
  position: MatrixIndex
}) => ({
  x: Math.round(mouse.x - position.cell * scale.x),
  y: Math.round(mouse.y - position.row * scale.y)
})

/**
 * Computes the drop level based on the mouse position and the cell width.
*/
export const computeLevel = ({
  size,
  levels,
  position
}: {
  size: number,
  levels: number,
  position: number
}) => {
  if (size <= (levels + 1) * 2) {
    return Math.round(position / (size / levels))
  }

  const spare = size - (levels + 1) * 2
  const steps = [0]
  let current = spare
  for (let i = 0; i <= levels; i++) {
    steps.push(steps[i] + current / 2)
    current /= 2
    if (position >= steps[i] + i * 2 && position < steps[i + 1] + (i + 1) * 2) {
      return i
    }
  }

  return levels
}

/**
 * Computes the horizontal drop level based on the mouse position.
 *
 * @param mouse
 * @param position
 * @param hover
 * @param scale
 * @param level
 * @param inv returns the inverse drop level. Usually true for left and above drop level computation.
 * @returns number
 */
export const computeHorizontal = (
  {
    mouse,
    position,
    hover,
    scale,
    level
  }: {
    mouse: Vector,
    position: MatrixIndex,
    scale: Vector,
    level: number,
    hover: ComponetizedRow
  },
  inv: boolean = false
) => {
  const { node: { cells = [] } } = hover
  const x = relativeMousePosition({ mouse, position, scale }).x
  let at = computeLevel({ size: scale.x, position: x, levels: level })

  if (cells.length) {
    // Is row, always opt for lowest level
    return level
  }

  // If the hovered element is an inline element, level 0 would be directly besides it which doesn't work.
  // Set it to 1 instead.
  if (hover.node.inline && at === 0) {
    at = 1
  }

  return inv ? level - at : at
}

/**
 * Computes the vertical drop level based on the mouse position.
 *
 * @returns number
 */
export const computeVertical = (
  {
    level,
    mouse,
    hover,
    position,
    scale
  }: {
    level: number,
    mouse: Vector,
    hover: ComponetizedRow,
    position: MatrixIndex,
    scale: Vector
  },
  inv: boolean = false
) => {
  const { node: { cells = [] } } = hover
  const y = relativeMousePosition({ mouse, position, scale }).y
  let at = computeLevel({ size: scale.y, position: y, levels: level })

  if (cells.length) {
    // Is row, always opt for lowest level
    return level
  }

  // If the hovered element is an inline element, level 0 would be directly besides it which doesn't work.
  // Set it to 1 instead.
  if (hover.node.inline && at === 0) {
    at = 1
  }

  return inv ? level - at : at
}

const getDropLevel = (hover: ComponetizedCell) => (hover.node.inline ? 1 : 0)

/**
 * A list of callbacks.
 */
export const defaultCallbacks: CallbackList = {
  [c.NO]: (
    item: ComponetizedCell,
    hover: ComponetizedCell,
    { clear }: Callbacks
  ) => clear(item.id),

  /* corners */
  [c.C1]: (
    item: ComponetizedCell,
    hover: ComponetizedCell,
    { leftOf, above }: Callbacks,
    ctx: Object
  ) => {
    const mouse = relativeMousePosition(ctx)
    const level = getDropLevel(hover)

    if (mouse.x < mouse.y) {
      return leftOf(item.rawNode(), hover.rawNode(), level)
    }

    above(item.rawNode(), hover.rawNode(), level)
  },

  [c.C2]: (
    item: ComponetizedCell,
    hover: ComponetizedCell,
    { rightOf, above }: Callbacks,
    ctx: Object
  ) => {
    const mouse = relativeMousePosition(ctx)
    const level = getDropLevel(hover)

    if (mouse.x > mouse.y) {
      return rightOf(item.rawNode(), hover.rawNode(), level)
    }

    above(item.rawNode(), hover.rawNode(), level)
  },

  [c.C3]: (
    item: ComponetizedCell,
    hover: ComponetizedCell,
    { rightOf, below }: Callbacks,
    ctx: Object
  ) => {
    const mouse = relativeMousePosition(ctx)
    const level = getDropLevel(hover)

    if (mouse.x > mouse.y) {
      return rightOf(item.rawNode(), hover.rawNode(), level)
    }
    below(item.rawNode(), hover.rawNode(), level)
  },

  [c.C4]: (
    item: ComponetizedCell,
    hover: ComponetizedCell,
    { leftOf, below }: Callbacks,
    ctx: Object
  ) => {
    const mouse = relativeMousePosition(ctx)
    const level = getDropLevel(hover)

    if (mouse.x < mouse.y) {
      return leftOf(item.rawNode(), hover.rawNode(), level)
    }
    below(item.rawNode(), hover.rawNode(), level)
  },

  /* heres */
  [c.AH]: (
    item: ComponetizedCell,
    hover: ComponetizedCell,
    { above }: Callbacks
  ) => {
    const level = getDropLevel(hover)
    above(
      item.rawNode(),
      {
        ...hover.rawNode()
      },
      level
    )
  },
  [c.BH]: (
    item: ComponetizedCell,
    hover: ComponetizedCell,
    { below }: Callbacks
  ) => {
    const level = getDropLevel(hover)
    below(
      item.rawNode(),
      {
        ...hover.rawNode()
      },
      level
    )
  },

  [c.LH]: (
    item: ComponetizedCell,
    hover: ComponetizedCell,
    { leftOf }: Callbacks
  ) => {
    const level = getDropLevel(hover)
    leftOf(
      item.rawNode(),
      {
        ...hover.rawNode()
      },
      level
    )
  },
  [c.RH]: (
    item: ComponetizedCell,
    hover: ComponetizedCell,
    { rightOf }: Callbacks
  ) => {
    const level = getDropLevel(hover)
    rightOf(
      item.rawNode(),
      {
        ...hover.rawNode()
      },
      level
    )
  },

  /* ancestors */
  [c.AA]: (
    item: ComponetizedCell,
    hover: ComponetizedCell,
    { above }: Callbacks,
    ctx: Object
  ) =>
    above(
      item.rawNode(),
      hover.rawNode(),
      computeVertical(
        {
          ...ctx,
          hover,
          level: hover.node.levels.above
        },
        true
      )
    ),
  [c.BA]: (
    item: ComponetizedCell,
    hover: ComponetizedCell,
    { below }: Callbacks,
    ctx: Object
  ) =>
    below(
      item.rawNode(),
      hover.rawNode(),
      computeVertical({
        ...ctx,
        hover,
        level: hover.node.levels.below
      })
    ),

  [c.LA]: (
    item: ComponetizedCell,
    hover: ComponetizedCell,
    { leftOf }: Callbacks,
    ctx: Object
  ) =>
    leftOf(
      item.rawNode(),
      hover.rawNode(),
      computeHorizontal(
        {
          ...ctx,
          hover,
          level: hover.node.levels.left
        },
        true
      )
    ),
  [c.RA]: (
    item: ComponetizedCell,
    hover: ComponetizedCell,
    { rightOf }: Callbacks,
    ctx: Object
  ) =>
    rightOf(
      item.rawNode(),
      hover.rawNode(),
      computeHorizontal({
        ...ctx,
        hover,
        level: hover.node.levels.right
      })
    ),

  /* inline */
  [c.IL]: (
    item: ComponetizedCell,
    hover: ComponetizedCell,
    { inlineLeft, leftOf }: Callbacks
  ) => {
    const { node: { inline, hasInlineNeighbour } } = hover
    const {
      node: { content: { plugin: { isInlineable = false } = {} } = {} }
    } = item
    if (inline || !isInlineable) {
      return leftOf(item.rawNode(), hover.rawNode(), 2)
    }
    if (hasInlineNeighbour && hasInlineNeighbour !== item.id) {
      return leftOf(item.rawNode(), hover.rawNode(), 2)
    }
    if (
      hasInlineNeighbour &&
      hasInlineNeighbour === item.id &&
      item.node.inline === 'left'
    ) {
      return leftOf(item.rawNode(), hover.rawNode(), 2)
    }

    inlineLeft(item.rawNode(), hover.rawNode())
  },

  [c.IR]: (
    item: ComponetizedCell,
    hover: ComponetizedCell,
    { inlineRight, rightOf }: Callbacks
  ) => {
    const { node: { inline, hasInlineNeighbour } } = hover
    const {
      node: { content: { plugin: { isInlineable = false } = {} } = {} }
    } = item
    if (inline || !isInlineable) {
      return rightOf(item.rawNode(), hover.rawNode(), 2)
    }
    if (hasInlineNeighbour && hasInlineNeighbour !== item.id) {
      return rightOf(item.rawNode(), hover.rawNode(), 2)
    }
    if (
      hasInlineNeighbour &&
      hasInlineNeighbour === item.id &&
      item.node.inline === 'right'
    ) {
      return rightOf(item.rawNode(), hover.rawNode(), 2)
    }

    inlineRight(item.rawNode(), hover.rawNode())
  }
}

/**
 * The HoverService uses callbacks and matrices to compute hover logic.
 *
 * @class HoverService
 */
export default class HoverService {
  callbacks: CallbackList = defaultCallbacks
  matrices: MatrixList = defaultMatrices

  constructor(
    {
      matrices,
      callbacks
    }: { matrices: MatrixList, callbacks: CallbackList } = {}
  ) {
    this.matrices = matrices || this.matrices
    this.callbacks = callbacks || this.callbacks
  }

  hover(
    drag: ComponetizedCell,
    hover: ComponetizedCell,
    actions: Callbacks,
    {
      room,
      mouse,
      matrix: use = '10x10'
    }: { room: Room, mouse: Vector, matrix: string }
  ) {
    return computeHover(
      drag,
      hover,
      actions,
      {
        room,
        mouse,
        matrix: this.matrices[use],
        callbacks: this.callbacks
      },
      use
    )
  }
}
