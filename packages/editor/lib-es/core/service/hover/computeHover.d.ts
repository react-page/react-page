import type { CellPluginList, Levels, PartialCell } from '../../types';
import type { HoverInsertActions, MatrixIndex, Room, Vector } from '../../types/hover';
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
type CallbackList = {
    [key: number]: (drag: PartialCell, hover: HoverTarget, actions: HoverInsertActions, context: Context) => void;
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
export declare const classes: {
    [key: string]: number;
};
export declare const computeHover: (drag: PartialCell, hover: HoverTarget, actions: HoverInsertActions, { room, mouse, cellPlugins, }: {
    room: Room;
    mouse: Vector;
    cellPlugins: CellPluginList;
}) => void;
/**
 * Computes the drop level based on the mouse position and the cell width.
 */
export declare const computeLevel: ({ size, level, position, }: {
    size: number;
    level?: number | undefined;
    position: number;
}) => number;
/**
 * A list of callbacks.
 */
export declare const CALLBACK_LIST: CallbackList;
export {};
//# sourceMappingURL=computeHover.d.ts.map