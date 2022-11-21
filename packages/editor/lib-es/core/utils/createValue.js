import { createRow } from '../actions/cell/insert';
import { CURRENT_EDITABLE_VERSION } from '../migrations/EDITABLE_MIGRATIONS';
import { createId } from './createId';
export var createValue = function (partial, options) {
    var _a, _b;
    return {
        id: partial.id || createId(),
        rows: (_b = (_a = partial.rows) === null || _a === void 0 ? void 0 : _a.map(function (c) { return createRow(c, options); })) !== null && _b !== void 0 ? _b : [],
        version: CURRENT_EDITABLE_VERSION,
    };
};
//# sourceMappingURL=createValue.js.map