import type { PluginsAndLang } from '../actions/cell/insert';
import type { Value, PartialRow } from '../types/node';
type PartialValue = {
    id?: string;
    rows?: PartialRow[];
};
export declare const createValue: (partial: PartialValue, options: PluginsAndLang) => Value;
export {};
//# sourceMappingURL=createValue.d.ts.map