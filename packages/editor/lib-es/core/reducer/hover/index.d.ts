import type { CellHoverAction, ClearHoverAction } from '../../actions/cell';
import type { PositionEnum } from '../../const';
export type Hover = {
    nodeId?: string;
    position: PositionEnum;
} | null;
export declare const hover: (state: Hover | undefined, action: CellHoverAction | ClearHoverAction) => Hover;
//# sourceMappingURL=index.d.ts.map