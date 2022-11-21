import { isRow } from '../../../types/node';
export var isEmpty = function (node) {
    var _a;
    if (!node) {
        return true;
    }
    if (isRow(node)) {
        return node.cells.length === 0;
    }
    if (node.rows && ((_a = node.rows) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        return false;
    }
    return !node.plugin;
};
//# sourceMappingURL=empty.js.map