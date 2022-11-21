/// <reference types="react" />
import type { Cell, CellPlugin, DataTType } from '../types';
export declare const getCellInnerDivStyle: (cell: Cell | null, plugin: CellPlugin | null, data: DataTType) => import("react").CSSProperties | undefined;
export declare const getCellInnerDivClassName: (cell: Cell | null, plugin: CellPlugin | null, data: unknown) => string;
export declare const getCellInnerDivStylingProps: (cell: Cell | null, plugin: CellPlugin | null, data: DataTType) => {
    style: import("react").CSSProperties | undefined;
    className: string;
};
export declare const gridClass: (size?: number) => string;
export declare const getCellOuterDivClassName: ({ size, hasInlineNeighbour, inline, hasChildren, }: {
    size?: number | undefined;
    hasChildren: boolean;
    hasInlineNeighbour?: string | undefined;
    inline?: string | null | undefined;
}) => string;
//# sourceMappingURL=getCellStylingProps.d.ts.map