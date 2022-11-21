import React from 'react';
export type StickyNess = {
    shouldStickToTop: boolean;
    shouldStickToBottom: boolean;
    rightOffset: number;
    rightOffsetFixed: number;
    stickyElRef?: React.Ref<HTMLDivElement>;
};
export declare const Sidebar: React.FC<{
    stickyNess?: StickyNess;
}>;
//# sourceMappingURL=index.d.ts.map