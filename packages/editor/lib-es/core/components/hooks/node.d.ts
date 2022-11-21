import type { CSSProperties } from 'react';
import type { HoverTarget } from '../../service/hover/computeHover';
import type { PositionEnum } from '../../const';
import type { Cell, CellDrag, Node, Row } from '../../types/node';
import type { CellPluginOnChangeOptions } from '../../types';
/**
 *
 */
type NodeSelector<T> = (node: Node | null, ancestors: Node[]) => T;
/**
 * Use this function to get derived properties of a node. It prevents unnessesary rerenders when only the nessesary properties are returned by the selector
 *
 * you can also select props from the ancestors of the node. Be aware that the last ancestor is the root document id
 *
 * @param nodeId an id of a node (cell or row)
 * @param selector receives the node object or null (if no node with this id exists) and returns T
 * @returns the selection T
 */
export declare const useNodeProps: <T>(nodeId: string | null, selector: NodeSelector<T>) => T;
/**
 *
 * @param nodeId id of a node
 * @param selector receives the ancestors array and returns T
 * @returns T
 */
export declare const useNodeAncestorProps: <T>(nodeId: string, selector: (ancestors: Node[]) => T) => T;
type CellSelector<T> = (node: Cell | null, ancestors: Node[]) => T;
/**
 * This is the same as @see useNodeProps, but only for cells. selector will receive null if the given nodeId is not a cell
 * @param nodeId an id of a cell
 * @param selector receives the cell or null (if no cell with this id exists) object and returns T
 * @returns the selection T
 */
export declare const useCellProps: <T>(nodeId: string, selector: CellSelector<T>) => T;
/**
 * better use useCellProps, unless you really need the full cell object
 * @param nodeId an id of a cell
 * @returns full Cell object
 */
export declare const useCell: (nodeId: string) => Cell | null;
type RowSelector<T> = (node: Row, ancestors: Node[]) => T;
/**
 * This is the same as @see useNodeProps, but only for rows.
 * @param nodeId an id of a row
 * @param selector receives the row or null (if no row with this id exists) object and returns T
 * @returns the selection T
 */
export declare const useRowProps: <T>(nodeId: string, selector: RowSelector<T>) => T | null;
/**
 *
 * @param nodeId id of a node
 * @returns the relative hover position over the given node, or null if this node is not hovered over
 */
export declare const useNodeHoverPosition: (nodeId: string) => PositionEnum | null;
/**
 *
 * @param nodeId id of a node
 * @returns an array of ids that are ancestors of the given node
 */
export declare const useNodeAncestorIds: (nodeId: string) => string[];
/**
 *
 * @param nodeId the id of a row or cell
 * @returns the nearest ancestor cell of the cell or row that has a plugin
 */
export declare const useParentCellId: (nodeId: string | null) => string | null | undefined;
/**
 * returns a cell as a HoverTarget that is suiteable to be passed to the drop-logic
 *
 * @param nodeId a nodeId
 * @returns a HoverTarget
 */
export declare const useNodeAsHoverTarget: (nodeId: string | null) => HoverTarget | null;
/**
 *
 * @deprecated currently unused
 */
export declare const useCellBounds: (nodeId: string) => {
    left: number;
    right: number;
} | null;
/**
 *
 * @param nodeId a node id
 * @returns an array of nodeIds that are direct children of the given node
 */
export declare const useNodeChildrenIds: (nodeId: string) => string[];
/**
 *
 * @param nodeId a node id
 * @returns true if node has children
 */
export declare const useNodeHasChildren: (nodeId: string) => boolean;
/**
 *
 * @param nodeId an id of a cell
 * @returns true if this cell has a configured plugin. It does not check if this plugin exists (in @see Options)
 */
export declare const useCellHasPlugin: (nodeId: string) => boolean;
/**
 * @param parentNodeId the parent node id, or null if its the root
 * @returns all configured CellPlugin that are allowed in the given parentCellId
 */
export declare const useAllCellPluginsForNode: (parentNodeId?: string | null) => import("../../types").CellPluginList;
export declare const useCellIsAllowedHere: (nodeId?: string) => (item: CellDrag) => boolean;
/**
 * Use this function to get the plugin of a cell.
 * @param nodeId an id of a cell
 * @returns the plugin of the given cell
 *
 */
export declare const usePluginOfCell: (nodeId: string) => import("../../types").CellPlugin<any, any> | null;
/**
 *
 * @param nodeId a cell id
 * @returns the raw localized data of the cell
 */
export declare const useCellDataI18nRaw: (nodeId: string) => import("../../types").I18nField<Record<string, unknown>> | undefined;
/**
 *
 * @param nodeId a cell id
 * @param lang a language key
 * @returns the data object in the given language of the given cell
 */
export declare const useCellData: (nodeId: string, lang?: string) => Record<string, unknown>;
/**
 *returns style and classname of a cell's inner div
 * @param nodeId a cell id
 * @param lang a language key (optionally)
 * @returns the data object in the given language of the given cell
 */
export declare const useCellInnerDivStylingProps: (nodeId: string, lang?: string) => {
    className?: string;
    style?: CSSProperties;
};
/**
 *
 * @returns [data, onChangeData] pair, with setData debouncing the propagation
 * also data is always partially updated
 * @param nodeId the id of a cell
 */
export declare const useDebouncedCellData: (nodeId: string) => readonly [Record<string, unknown>, (partialData: Record<string, unknown>, options?: CellPluginOnChangeOptions) => void];
export {};
//# sourceMappingURL=node.d.ts.map