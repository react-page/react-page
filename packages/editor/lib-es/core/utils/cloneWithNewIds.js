var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { isRow } from '../types';
import { createId } from './createId';
import { mapNode } from './mapNode';
export var cloneWithNewIds = function (node) {
    return mapNode(node, {
        mapCell: function (n) { return (__assign(__assign({}, n), { 
            // clone data as well
            dataI18n: (n === null || n === void 0 ? void 0 : n.dataI18n) ? JSON.parse(JSON.stringify(n.dataI18n)) : {}, id: createId() })); },
        mapRow: function (n) { return (__assign(__assign({}, n), { id: createId() })); },
    });
};
export var cloneAsCell = function (node) {
    var cell = isRow(node)
        ? {
            id: createId(),
            rows: [node],
        }
        : node;
    return cloneWithNewIds(cell);
};
//# sourceMappingURL=cloneWithNewIds.js.map