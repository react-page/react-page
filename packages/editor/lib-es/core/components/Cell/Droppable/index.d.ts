import type { FC, PropsWithChildren } from 'react';
export declare const useCellDrop: (nodeId: string) => readonly [(domElement: HTMLDivElement) => void, boolean];
declare const Droppable: FC<PropsWithChildren<{
    nodeId: string;
    isLeaf?: boolean;
}>>;
export default Droppable;
//# sourceMappingURL=index.d.ts.map