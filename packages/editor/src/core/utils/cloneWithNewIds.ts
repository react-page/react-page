import type { Node } from '../types';
import { createId } from './createId';
import { mapNode } from './mapNode';

export const cloneWithNewIds = (node: Node) => {
  return mapNode(node, {
    mapCell: (n) => ({
      ...n,
      // clone data as well
      dataI18n: n?.dataI18n ? JSON.parse(JSON.stringify(n.dataI18n)) : {},
      id: createId(),
    }),
    mapRow: (n) => ({
      ...n,
      id: createId(),
    }),
  });
};
