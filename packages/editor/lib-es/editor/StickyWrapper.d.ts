import React from 'react';
type StickyProps = {
    rightOffset: number;
    rightOffsetFixed: number;
    stickyElRef: React.RefObject<HTMLDivElement>;
    focusRef: React.RefObject<HTMLDivElement>;
    shouldStickToTop: boolean;
    shouldStickToBottom: boolean;
};
declare const StickyWrapper: React.FC<{
    children: (s: StickyProps) => React.ReactNode;
}>;
export default StickyWrapper;
//# sourceMappingURL=StickyWrapper.d.ts.map