import type { FocusMode } from '../../actions/cell/core';
import type { PartialCell, Node } from '../../types/node';
import type { CellPluginOnChangeOptions } from '../../types';
/**
 * @param id id of a node
 * @returns function, that sets a cell in draft mode (will be invisible in readonly / preview)
 */
export declare const useSetDraft: (id: string) => (isDraft: boolean, lang: string) => void;
/**
 * @returns function to resize a cell
 */
export declare const useResizeCellById: () => (nodeId: string, size: number) => void;
/**
 *
 * @param id a cell id
 * @returns a function to resize the given cell
 */
export declare const useResizeCell: (id: string) => (size: number) => void;
/**
 *
 * @returns a function to change the current language
 */
export declare const useSetLang: () => (lang: string) => void;
/**
 *
 * @param id a cell id
 * @returns function to update the data of the given cell. Sets the data in the current language, unless options.lang is set
 */
export declare const useUpdateCellData: (id: string) => (data: {
    [key: string]: unknown;
} | null, options?: CellPluginOnChangeOptions) => void;
/**
 * @returns a function to remove a cell by id
 */
export declare const useRemoveCellById: () => (id?: string) => void;
/**
 * @param id a cell id
 * @returns a function to remove the given cell
 */
export declare const useRemoveCell: (id: string) => () => void;
/**
 *
 * @returns a function to remove muliple nodeids
 */
export declare const useRemoveMultipleNodeIds: () => (nodeIds: string[]) => void;
/**
 * @returns a function that duplicates a cell
 */
export declare const useDuplicateCellById: () => (id: string) => void;
export declare const useInsertAfter: () => (node: Node, insertAfterNodeId?: string | null) => void;
/**
 * @returns a function that duplicates multiple cell
 */
export declare const useDuplicateMultipleCells: () => (cellIds: string[]) => void;
/**
 * @param a cell id
 * @returns a function that duplicates the given cell
 */
export declare const useDuplicateCell: (id: string) => () => void;
/**
 * experimental
 * @returns function to set the reference node id. used internally
 */
export declare const useSetDisplayReferenceNodeId: () => (nodeId?: string | null) => void;
/**
 * @returns a function to focus a cell by id
 */
export declare const useFocusCellById: () => (id: string, scrollToCell?: boolean, mode?: FocusMode) => void;
/**
 * @returns a function to focus a cell by id
 */
export declare const useFocusCell: (id?: string | null) => (scrollToCell?: boolean, mode?: FocusMode) => void;
/**
 * @returns function to blur a cell by id
 */
export declare const useBlurCell: () => (id: string) => void;
/**
 * @returns function to blur all cells
 */
export declare const useBlurAllCells: () => () => void;
/**
 * @returns function to insert a cell at the end of the document or the end of the parent cell
 *
 * if the id already exists, it will move that cell
 */
export declare const useInsertNew: (parentCellId?: string) => (partialCell: PartialCell) => void;
/**
 * used for the trash target
 */
export declare const useTrashDrop: () => [{
    isHovering: boolean;
}, import("react-dnd").ConnectDropTarget];
//# sourceMappingURL=nodeActions.d.ts.map