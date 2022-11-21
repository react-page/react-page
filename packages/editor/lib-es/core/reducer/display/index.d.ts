import type { BlurAllCellsAction } from '../../actions/cell';
import type { DisplayAction } from '../../actions/display';
import type { Display } from '../../types/display';
export declare const display: (state: Display | undefined, action: DisplayAction | BlurAllCellsAction) => Display | {
    referenceNodeId: string | null | undefined;
    mode: import("../../actions/display").DisplayModes;
    zoom: number;
};
//# sourceMappingURL=index.d.ts.map