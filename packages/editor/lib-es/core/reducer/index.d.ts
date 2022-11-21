/// <reference types="redux-undo" />
import type { Value, RootState } from '../types';
declare const reducer: import("redux").Reducer<import("redux").CombinedState<{
    values: import("redux-undo").StateWithHistory<Value | null>;
    display: never;
    focus: import("./focus").Focus;
    settings: never;
    hover: import("./hover").Hover;
    __nodeCache: null;
}>, import("../actions/display").DisplayAction | import("../actions/cell").CellHoverAction | import("../actions/cell").ClearHoverAction | import("../actions/cell").RemoveCellAction | import("../actions/cell").FocusCellAction | import("../actions/cell").BlurCellAction | import("../actions/cell").BlurAllCellsAction | import("redux").AnyAction | {
    [key: string]: unknown;
    type: string;
}>;
export { reducer };
declare const _default: import("redux").Reducer<import("redux").CombinedState<{
    reactPage: import("redux").CombinedState<{
        values: import("redux-undo").StateWithHistory<Value | null>;
        display: never;
        focus: import("./focus").Focus;
        settings: never;
        hover: import("./hover").Hover;
        __nodeCache: null;
    }>;
}>, import("redux").AnyAction>;
export default _default;
export declare function initialState(value: Value | null, lang: string): RootState;
//# sourceMappingURL=index.d.ts.map