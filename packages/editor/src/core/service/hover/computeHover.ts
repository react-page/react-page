import type { CellPluginList, Levels, PartialCell } from '../../types';
import { isRow } from '../../types';
import type {
  HoverInsertActions,
  Matrix,
  MatrixIndex,
  Room,
  Vector,
} from '../../types/hover';
import deepEquals from '../../utils/deepEquals';
import logger from '../logger';

/**
 *
 * FIXME: this logic needs an overhowl, because it is not really understandable
 *
 */
export type HoverTarget = {
  id?: string;
  inline?: string | null;
  levels?: Levels | null;
  hasInlineNeighbour?: string;
  ancestorIds?: string[];
  pluginId?: string;
};
type Context = {
  room: Room;
  mouse: Vector;
  position: MatrixIndex;
  size: {
    rows: number;
    cells: number;
  };
  scale: Vector;
  cellPlugins: CellPluginList;
};
type MatrixList = { [key: string]: Matrix };
type CallbackList = {
  [key: number]: (
    drag: PartialCell,
    hover: HoverTarget,
    actions: HoverInsertActions,
    context: Context
  ) => void;
};

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
  IR: 301,
};

const c = classes;

/**
 * A list of matrices that are used to define the callback function.
 *
 * @type {{10x10: *[], 10x10-no-inline: *[]}}
 */
const MATRIX_LIST: MatrixList = {
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
    [c.C4, c.BA, c.BA, c.BA, c.BA, c.BA, c.BA, c.BA, c.BA, c.C3],
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
    [c.C4, c.BA, c.BA, c.BA, c.BA, c.BA, c.BA, c.BA, c.BA, c.C3],
  ],
};

/**
 * Computes the average width and height for cells in a room.
 *
 * @param room
 * @param matrix
 * @returns {{x: number, y: number}}
 */
const getRoomScale = ({
  room,
  matrix,
}: {
  room: Room;
  matrix: Matrix;
}): Vector => {
  const rows = matrix.length;
  const cells = matrix[0].length;

  const scalingX = room.width / cells;
  const scalingY = room.height / rows;

  return {
    x: scalingX,
    y: scalingY,
  };
};

/**
 * Returns the index of the hover cell.
 *
 * @param mouse
 * @param scale
 */
const getMouseHoverCell = ({
  mouse,
  scale,
}: {
  mouse: Vector;
  scale: Vector;
}): MatrixIndex => ({
  cell: Math.floor(mouse.x / scale.x),
  row: Math.floor(mouse.y / scale.y),
});

/**
 * Used for caching.
 */
const last = { '10x10': null, '10x10-no-inline': null };

export const computeHover = (
  drag: PartialCell,
  hover: HoverTarget,
  actions: HoverInsertActions,
  {
    room,
    mouse,
    cellPlugins,
  }: {
    room: Room;
    mouse: Vector;
    cellPlugins: CellPluginList;
  }
) => {
  const allowInlineNeighbours =
    cellPlugins.find((p) => p.id === hover.pluginId)?.allowInlineNeighbours ??
    false;

  const matrixName = allowInlineNeighbours ? '10x10' : '10x10-no-inline';

  const matrix = MATRIX_LIST[matrixName];
  const scale = getRoomScale({ room, matrix });
  const hoverCell = getMouseHoverCell({ mouse, scale });
  const rows = matrix.length;
  const cells = matrix[0].length;

  if (hoverCell.row >= rows) {
    hoverCell.row = rows - 1;
  } else if (hoverCell.row < 0) {
    hoverCell.row = 0;
  }

  if (hoverCell.cell >= cells) {
    hoverCell.cell = cells - 1;
  } else if (hoverCell.cell < 0) {
    hoverCell.cell = 0;
  }

  const cell = matrix[hoverCell.row][hoverCell.cell];
  if (!CALLBACK_LIST[cell]) {
    logger.error('Matrix callback not found.', {
      room,
      mouse,
      matrix,
      scale,
      hoverCell,
      rows,
      cells,
    });
    return;
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
      scale,
    },
  };
  if (deepEquals(all, last[matrixName])) {
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  last[matrixName] = all as any;

  return CALLBACK_LIST[cell](drag, hover, actions, {
    room,
    mouse,
    position: hoverCell,
    size: { rows, cells },
    cellPlugins,
    scale,
  });
};

/**
 * Return the mouse position relative to the cell.
 */
const relativeMousePosition = ({
  mouse,
  position,
  scale,
}: {
  mouse: Vector;
  scale: Vector;
  position: MatrixIndex;
}) => ({
  x: Math.round(mouse.x - position.cell * scale.x),
  y: Math.round(mouse.y - position.row * scale.y),
});

/**
 * Computes the drop level based on the mouse position and the cell width.
 */
export const computeLevel = ({
  size,
  level = 0,
  position,
}: {
  size: number;
  level?: number;
  position: number;
}) => {
  if (size <= (level + 1) * 2) {
    return Math.round(position / (size / level));
  }

  const spare = size - (level + 1) * 2;
  const steps = [0];
  let current = spare;
  for (let i = 0; i <= level; i++) {
    steps.push(steps[i] + current / 2);
    current /= 2;
    if (position >= steps[i] + i * 2 && position < steps[i + 1] + (i + 1) * 2) {
      return i;
    }
  }

  return level;
};

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
const computeHorizontal = (
  {
    mouse,
    position,
    hover,
    scale,
    level = 0,
  }: {
    mouse: Vector;
    position: MatrixIndex;
    scale: Vector;
    level?: number;
    hover: HoverTarget;
  },
  inv = false
) => {
  const x = relativeMousePosition({ mouse, position, scale }).x;
  let at = computeLevel({ size: scale.x, position: x, level });

  if (isRow(hover)) {
    // Is row, always opt for lowest level
    return level;
  }

  // If the hovered element is an inline element, level 0 would be directly besides it which doesn't work.
  // Set it to 1 instead.
  if (hover.inline && at === 0) {
    at = 1;
  }

  return inv ? level - at : at;
};

/**
 * Computes the vertical drop level based on the mouse position.
 *
 * @returns number
 */
const computeVertical = (
  {
    level = 0,
    mouse,
    hover,
    position,
    scale,
  }: {
    level?: number;
    mouse: Vector;
    hover: HoverTarget;
    position: MatrixIndex;
    scale: Vector;
  },
  inv = false
) => {
  const y = relativeMousePosition({ mouse, position, scale }).y;
  let at = computeLevel({ size: scale.y, position: y, level });

  if (isRow(hover)) {
    // Is row, always opt for lowest level
    return level;
  }

  // If the hovered element is an inline element, level 0 would be directly besides it which doesn't work.
  // Set it to 1 instead.
  if (hover.inline && at === 0) {
    at = 1;
  }

  return inv ? level - at : at;
};

const getDropLevel = (hover: HoverTarget) =>
  !isRow(hover) && hover.inline ? 1 : 0;

/**
 * A list of callbacks.
 */
export const CALLBACK_LIST: CallbackList = {
  [c.NO]: (
    item: PartialCell,
    hover: HoverTarget,
    { clear }: HoverInsertActions
  ) => clear(),

  /* corners */
  [c.C1]: (
    item: PartialCell,
    hover: HoverTarget,
    { leftOf, above }: HoverInsertActions,

    ctx: Context
  ) => {
    const mouse = relativeMousePosition(ctx);
    const level = getDropLevel(hover);

    if (mouse.x < mouse.y) {
      return leftOf(item, hover, { level });
    }

    above(item, hover, { level });
  },

  [c.C2]: (
    item: PartialCell,
    hover: HoverTarget,
    { rightOf, above }: HoverInsertActions,

    ctx: Context
  ) => {
    const mouse = relativeMousePosition(ctx);
    const level = getDropLevel(hover);

    if (mouse.x > mouse.y) {
      return rightOf(item, hover, { level });
    }

    above(item, hover, { level });
  },

  [c.C3]: (
    item: PartialCell,
    hover: HoverTarget,
    { rightOf, below }: HoverInsertActions,

    ctx: Context
  ) => {
    const mouse = relativeMousePosition(ctx);
    const level = getDropLevel(hover);

    if (mouse.x > mouse.y) {
      return rightOf(item, hover, { level });
    }
    below(item, hover, { level });
  },

  [c.C4]: (
    item: PartialCell,
    hover: HoverTarget,
    { leftOf, below }: HoverInsertActions,

    ctx: Context
  ) => {
    const mouse = relativeMousePosition(ctx);
    const level = getDropLevel(hover);

    if (mouse.x < mouse.y) {
      return leftOf(item, hover, { level });
    }
    below(item, hover, { level });
  },

  /* heres */
  [c.AH]: (
    item: PartialCell,
    hover: HoverTarget,
    { above }: HoverInsertActions
  ) => {
    const level = getDropLevel(hover);
    above(item, hover, { level });
  },
  [c.BH]: (
    item: PartialCell,
    hover: HoverTarget,
    { below }: HoverInsertActions
  ) => {
    const level = getDropLevel(hover);
    below(item, hover, { level });
  },

  [c.LH]: (
    item: PartialCell,
    hover: HoverTarget,
    { leftOf }: HoverInsertActions
  ) => {
    const level = getDropLevel(hover);
    leftOf(item, hover, { level });
  },
  [c.RH]: (
    item: PartialCell,
    hover: HoverTarget,
    { rightOf }: HoverInsertActions
  ) => {
    const level = getDropLevel(hover);
    rightOf(item, hover, { level });
  },

  /* ancestors */
  [c.AA]: (
    item: PartialCell,
    hover: HoverTarget,
    { above }: HoverInsertActions,
    ctx: Context
  ) =>
    above(item, hover, {
      level: computeVertical(
        {
          ...ctx,
          hover: hover,
          level: hover.levels?.above,
        },
        true
      ),
    }),
  [c.BA]: (
    item: PartialCell,
    hover: HoverTarget,
    { below }: HoverInsertActions,
    ctx: Context
  ) =>
    below(item, hover, {
      level: computeVertical({
        ...ctx,
        hover,
        level: hover.levels?.below,
      }),
    }),

  [c.LA]: (
    item: PartialCell,
    hover: HoverTarget,
    { leftOf }: HoverInsertActions,
    ctx: Context
  ) =>
    leftOf(item, hover, {
      level: computeHorizontal(
        {
          ...ctx,
          hover,
          level: hover.levels?.left,
        },
        true
      ),
    }),
  [c.RA]: (
    item: PartialCell,
    hover: HoverTarget,
    { rightOf }: HoverInsertActions,
    ctx: Context
  ) =>
    rightOf(item, hover, {
      level: computeHorizontal({
        ...ctx,
        hover,
        level: hover.levels?.right,
      }),
    }),

  /* inline */
  [c.IL]: (
    item: PartialCell,
    hover: HoverTarget,
    { inlineLeft, leftOf }: HoverInsertActions,
    { cellPlugins }
  ) => {
    if (isRow(item) || isRow(hover)) {
      return;
    }
    const { inline, hasInlineNeighbour } = hover;
    const plugin = cellPlugins.find(
      (p) =>
        p.id ===
        (typeof item.plugin === 'string' ? item.plugin : item.plugin?.id)
    );
    const isInlineable = plugin?.isInlineable ?? false;
    if (inline || !isInlineable) {
      return leftOf(item, hover, { level: 2 });
    }
    if (hasInlineNeighbour && hasInlineNeighbour !== item.id) {
      return leftOf(item, hover, { level: 2 });
    }
    if (
      hasInlineNeighbour &&
      hasInlineNeighbour === item.id &&
      item.inline === 'left'
    ) {
      return leftOf(item, hover, { level: 2 });
    }

    inlineLeft(item, hover);
  },

  [c.IR]: (
    item: PartialCell,
    hover: HoverTarget,
    { inlineRight, rightOf }: HoverInsertActions,
    { cellPlugins }
  ) => {
    if (isRow(item) || isRow(hover)) {
      return;
    }
    const { inline, hasInlineNeighbour } = hover;
    const plugin = cellPlugins.find(
      (p) =>
        p.id ===
        (typeof item.plugin === 'string' ? item.plugin : item.plugin?.id)
    );
    const isInlineable = plugin?.isInlineable ?? false;

    if (inline || !isInlineable) {
      return rightOf(item, hover, { level: 2 });
    }
    if (hasInlineNeighbour && hasInlineNeighbour !== item.id) {
      return rightOf(item, hover, { level: 2 });
    }
    if (
      hasInlineNeighbour &&
      hasInlineNeighbour === item.id &&
      item.inline === 'right'
    ) {
      return rightOf(item, hover, { level: 2 });
    }

    inlineRight(item, hover);
  },
};
