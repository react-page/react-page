import { Editor } from 'slate';
type ListBaseDef = {
    listItemType: string;
};
export declare const getActiveList: (editor: Editor) => import("slate").NodeEntry<import("slate").Node>;
export declare const getActiveListType: (editor: Editor) => string | null | undefined;
export declare const getPreviousListItem: (editor: Editor, listItemType: string) => import("slate").NodeEntry<import("slate").Node> | null;
export declare const increaseListIndention: (editor: Editor, def: ListBaseDef, listType?: string) => void;
export declare const decreaseListIndention: (editor: Editor, def: ListBaseDef) => void;
export {};
//# sourceMappingURL=listUtils.d.ts.map