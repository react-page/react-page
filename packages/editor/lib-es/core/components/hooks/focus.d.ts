import type { EffectCallback, DependencyList } from 'react';
/**
 * @returns the current focused nodeId if just one or null
 */
export declare const useFocusedNodeId: () => string | null;
export declare const useAllFocusedNodeIds: () => string[];
/**
 *
 * @param id the id of the node (row/cell)
 * @returns true if the given node id is focused
 */
export declare const useIsFocused: (id: string) => boolean;
/**
 *
 * @param id the id of the node (row/cell)
 * @returns true if ONLY the given node id is focused
 */
export declare const useIsExclusivlyFocused: (id: string) => boolean;
/**
 *
 * @param id the id of the node
 * @param effect callback that is run when the given node is focused and the focus action demanded scrollToCell
 * @param deps effect deps array
 */
export declare const useScrollToViewEffect: (id: string, effect: EffectCallback, deps: DependencyList) => void;
//# sourceMappingURL=focus.d.ts.map