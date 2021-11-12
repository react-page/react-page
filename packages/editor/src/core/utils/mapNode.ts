import type { Row, Cell, Node } from '../types';
import { isRow } from '../types';

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
export const mapNode = (node: Node, mapper: Mapper, depth = 0): Node | null => {
  if (isRow(node)) {
    if (mapper.skipMapRow?.(node, depth)) return node;
    const mappedNode = mapper.mapRow ? mapper.mapRow(node, depth) : node;
    const mappedChildren = mappedNode?.cells?.map(
      (c) => mapNode(c, mapper, depth + 1) as Cell
    );
    const fullMapped: Row | null =
      (mappedChildren?.length ?? 0) > 0
        ? ({
            ...mappedNode,
            cells: mappedChildren,
          } as Row)
        : mappedNode;
    return mapper.mapRowDown
      ? mapper.mapRowDown(fullMapped, depth)
      : fullMapped;
  } else {
    if (mapper.skipMapCell?.(node, depth)) return node;
    const mappedNode = mapper.mapCell ? mapper.mapCell(node, depth) : node;
    const mappedChildren = mappedNode?.rows?.map(
      (c) => mapNode(c, mapper, depth + 1) as Row
    );
    const fullMapped: Cell | null =
      (mappedChildren?.length ?? 0) > 0
        ? ({
            ...mappedNode,
            rows: mappedChildren,
          } as Cell)
        : mappedNode;
    return mapper.mapCellDown
      ? mapper.mapCellDown(fullMapped, depth)
      : fullMapped;
  }
};
