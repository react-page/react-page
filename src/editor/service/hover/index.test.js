/* eslint-env mocha */
import unexpected from 'unexpected'
import {} from './index'

const expect = unexpected.clone()

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
const classes = {
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

const normalizeCases = [
  {
    size: [10, 10],
    in: {
      room: {
        width: 100,
        height: 100
      },
      ancestors: 10,
      mouse: { x: 99, y: 95 }
    },
    expect: {
      mouse: [
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, true]
      ],
      position: 'right-of',
      level: 10
    }
  }
]

const cbMatrix = [
  {
    rules: [
      [c.C1, c.AA, c.AA, c.AA, c.AA, c.C2],
      [c.LA, c.IL, c.AH, c.AH, c.IR, c.RA],
      [c.LA, c.LH, c.NO, c.NO, c.RH, c.RA],
      [c.LA, c.LH, c.NO, c.NO, c.RH, c.RA],
      [c.LA, c.C4, c.BH, c.BH, c.C3, c.RA],
      [c.C4, c.BA, c.BA, c.BA, c.BA, c.C3]
    ]
  }
]
