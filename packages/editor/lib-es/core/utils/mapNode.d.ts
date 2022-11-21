import type { Row, Cell, Node } from '../types';
type Mapper = {
    mapRow?: (r: Row, depth: number) => Row | null;
    mapCell?: (c: Cell, depth: number) => Cell | null;
    mapRowDown?: (r: Row | null, depth: number) => Row | null;
    mapCellDown?: (c: Cell | null, depth: number) => Cell | null;
    skipMapCell?: (c: Cell, depth: number) => boolean;
    skipMapRow?: (r: Cell, depth: number) => boolean;
};
/**
 * map a node recursivly
 * @param node the node to map
 * @param mapper mapRow and mapCell callbck. Return the transformed row or cell
 * @param depth initialy 0
 */
export declare const mapNode: (node: Node, mapper: Mapper, depth?: number) => Node | null;
export {};
//# sourceMappingURL=mapNode.d.ts.map