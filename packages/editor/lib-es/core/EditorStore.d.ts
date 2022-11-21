/// <reference types="react" />
import type { Middleware, Store } from 'redux';
import type { Value } from './types/node';
import type { RootState } from './types/state';
export declare const EditorContext: import("react").Context<EditorStore<RootState> | null>;
export type Languages = Array<{
    lang: string;
    label: string;
}>;
export interface CoreEditorProps<T extends RootState = RootState> {
    middleware?: Middleware[];
    store?: Store<T> | null;
    initialState: RootState;
}
declare class EditorStore<T extends RootState = RootState> {
    store: Store<RootState>;
    middleware: Middleware[];
    constructor({ middleware, store, initialState }: CoreEditorProps<T>);
    setLang(lang: string): void;
    getNodeWithAncestors: (nodeId: string) => import("./types/node").NodeWithAncestors | null;
    getNode: (nodeId: string) => import("./types/node").Node | undefined;
}
export declare const createEmptyState: () => Value;
export default EditorStore;
//# sourceMappingURL=EditorStore.d.ts.map