import type { Node, Row } from '../../../types';
type Direction = 'previous' | 'next';
/**
 *
 * @param nodeId a cell or row
 * @param ancestors the ancestors of the node
 *
 * @returns the previous row if any or null
 */
export declare const findSiblingRow: (nodeId: string, ancestors: Node[], direction: Direction) => Row | null;
export {};
//# sourceMappingURL=findSiblingRow.d.ts.map