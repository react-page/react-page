import type EditorStore from '../EditorStore';
import type { Node } from '../types';
/**
 * get a node with children that only contains certain cells
 * this is usefull to duplicate or clone multiple cells
 * @param editor: the editor store
 * @param cellIds
 */
export declare const getCommonAncestorTree: (editor: EditorStore, cellIds: string[]) => Node | null;
//# sourceMappingURL=ancestorTree.d.ts.map