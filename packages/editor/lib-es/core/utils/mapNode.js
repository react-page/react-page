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
/**
 * map a node recursivly
 * @param node the node to map
 * @param mapper mapRow and mapCell callbck. Return the transformed row or cell
 * @param depth initialy 0
 */
export var mapNode = function (node, mapper, depth) {
    var _a, _b, _c, _d, _e, _f;
    if (depth === void 0) { depth = 0; }
    if (isRow(node)) {
        if ((_a = mapper.skipMapRow) === null || _a === void 0 ? void 0 : _a.call(mapper, node, depth))
            return node;
        var mappedNode = mapper.mapRow ? mapper.mapRow(node, depth) : node;
        var mappedChildren = (_b = mappedNode === null || mappedNode === void 0 ? void 0 : mappedNode.cells) === null || _b === void 0 ? void 0 : _b.map(function (c) { return mapNode(c, mapper, depth + 1); });
        var fullMapped = ((_c = mappedChildren === null || mappedChildren === void 0 ? void 0 : mappedChildren.length) !== null && _c !== void 0 ? _c : 0) > 0
            ? __assign(__assign({}, mappedNode), { cells: mappedChildren })
            : mappedNode;
        return mapper.mapRowDown
            ? mapper.mapRowDown(fullMapped, depth)
            : fullMapped;
    }
    else {
        if ((_d = mapper.skipMapCell) === null || _d === void 0 ? void 0 : _d.call(mapper, node, depth))
            return node;
        var mappedNode = mapper.mapCell ? mapper.mapCell(node, depth) : node;
        var mappedChildren = (_e = mappedNode === null || mappedNode === void 0 ? void 0 : mappedNode.rows) === null || _e === void 0 ? void 0 : _e.map(function (c) { return mapNode(c, mapper, depth + 1); });
        var fullMapped = ((_f = mappedChildren === null || mappedChildren === void 0 ? void 0 : mappedChildren.length) !== null && _f !== void 0 ? _f : 0) > 0
            ? __assign(__assign({}, mappedNode), { rows: mappedChildren })
            : mappedNode;
        return mapper.mapCellDown
            ? mapper.mapCellDown(fullMapped, depth)
            : fullMapped;
    }
};
//# sourceMappingURL=mapNode.js.map