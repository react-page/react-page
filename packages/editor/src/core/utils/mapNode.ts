import type { Row, Cell, Node } from '../types';
import { isRow } from '../types';

type Mapper = {
  mapRow?: (r: Row, depth: number) => Row;
  mapCell?: (c: Cell, depth: number) => Cell;
  mapRowDown?: (r: Row, depth: number) => Row;
  mapCellDown?: (c: Cell, depth: number) => Cell;
  skipMapCell?: (c: Cell, depth: number) => boolean;
  skipMapRow?: (r: Cell, depth: number) => boolean;
};
/**
 * map a node recursivly
 * @param node the node to map
 * @param mapper mapRow and mapCell callbck. Return the transformed row or cell
 * @param depth initialy 0
 */
export const mapNode = (node: Node, mapper: Mapper, depth = 0) => {
  if (isRow(node)) {
    if (mapper.skipMapRow?.(node, depth)) return node;
    const mappedNode = mapper.mapRow ? mapper.mapRow(node, depth) : node;
    const mappedChildren = mappedNode?.cells?.map(
      (c) => mapNode(c, mapper, depth + 1) as Cell
    );
    const fullMapped: Row =
      mappedChildren?.length > 0
        ? {
            ...mappedNode,
            cells: mappedChildren,
          }
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
    const fullMapped: Cell =
      mappedChildren?.length > 0
        ? {
            ...mappedNode,
            rows: mappedChildren,
          }
        : mappedNode;
    return mapper.mapCellDown
      ? mapper.mapCellDown(fullMapped, depth)
      : fullMapped;
  }
};
