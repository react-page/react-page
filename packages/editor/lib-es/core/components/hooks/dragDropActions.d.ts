import type { HoverInsertActions } from '../../types/hover';
/**
 * @returns object of actions for hovering
 */
export declare const useHoverActions: () => HoverInsertActions;
/**
 * @param nodeId the parent reference node id
 * @returns object of actions for dropping a cell
 */
export declare const useDropActions: (parentNodeId?: string | null) => HoverInsertActions;
//# sourceMappingURL=dragDropActions.d.ts.map