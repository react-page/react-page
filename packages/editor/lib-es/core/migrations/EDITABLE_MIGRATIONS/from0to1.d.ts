import type { Value } from '../../types';
import { Migration } from '../Migration';
type I18nField<T> = {
    [lang: string]: T;
};
type PluginOld = {
    name: string;
    version: number | string;
};
type Content<StateT = any> = {
    plugin: PluginOld;
    state?: StateT;
    stateI18n?: I18nField<StateT>;
};
type Layout<StateT = any> = {
    plugin: PluginOld;
    state?: StateT;
    stateI18n?: I18nField<StateT>;
};
type NodeBase = {
    id: string;
    levels?: Levels;
    hoverPosition?: string;
};
type CellOld = NodeBase & {
    rows?: RowOld[] | null;
    content?: Content;
    layout?: Layout;
    size?: number;
    inline?: string | null;
    isDraft?: boolean;
    isDraftI18n?: I18nField<boolean>;
    resizable?: boolean;
    bounds?: {
        left: number;
        right: number;
    };
    hasInlineNeighbour?: string;
};
type RowOld = NodeBase & {
    cells: CellOld[];
};
type Levels = {
    left: number;
    right: number;
    above: number;
    below: number;
};
/**
 * @deprecated this Value_v0 will not be removed as it represents an old version.
 * It will automatically be converted to Value
 */
export type Value_v0 = {
    id: string;
    cells: CellOld[];
};
declare const _default: Migration<Value_v0, Value>;
export default _default;
//# sourceMappingURL=from0to1.d.ts.map