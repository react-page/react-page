import type { Action } from 'redux';
import type { Value, NewIds } from '../types/node';
export declare const UPDATE_VALUE = "UPDATE_VALUE";
export interface UpdateEditableAction extends Action {
    ts: Date;
    value: Value | null;
    ids: NewIds;
}
export declare const updateValue: (value: Value | null) => UpdateEditableAction;
//# sourceMappingURL=value.d.ts.map