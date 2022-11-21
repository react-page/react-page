export declare const getTargetIndexForUpAndDownMove: (currentRowLength: number, targetRowLength: number, myIndex?: number) => {
    index: number;
    action: 'leftOf' | 'rightOf';
};
export declare const useMoveNodeUp: (nodeId: string) => (() => void) | null;
export declare const useMoveNodeDown: (nodeId: string) => (() => void) | null;
export declare const useMoveNodeLeft: (nodeId: string) => (() => void) | null;
export declare const useMoveNodeRight: (nodeId: string) => (() => void) | null;
//# sourceMappingURL=nodeMove.d.ts.map