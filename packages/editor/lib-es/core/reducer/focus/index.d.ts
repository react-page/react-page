import type { BlurCellAction, BlurAllCellsAction, FocusCellAction, RemoveCellAction } from '../../actions/cell';
export type Focus = {
    nodeIds: string[];
    scrollToCell?: number | null;
} | null;
export declare const focus: (state: Focus | undefined, action: FocusCellAction | BlurCellAction | BlurAllCellsAction | RemoveCellAction) => Focus;
//# sourceMappingURL=index.d.ts.map