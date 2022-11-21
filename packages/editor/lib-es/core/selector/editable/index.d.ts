import type { Value, NodeWithAncestors } from '../../types/node';
import type { RootState } from '../../types/state';
export declare const findNodeInState: (state: RootState, nodeId: string) => NodeWithAncestors | null;
export declare const currentValue: (state: RootState) => Value | null;
export type NodeProps = {
    id: string;
    editable: string;
};
export declare const selectNode: (state: RootState, nodeId: string) => NodeWithAncestors | null;
//# sourceMappingURL=index.d.ts.map