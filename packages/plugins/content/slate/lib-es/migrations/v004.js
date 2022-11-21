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
import { Migration } from '@react-page/editor';
import isEmpty from 'lodash.isempty';
var migrateTextNode = function (oldNode) {
    var _a, _b;
    return __assign({ text: oldNode.text }, ((_b = (_a = oldNode.marks) === null || _a === void 0 ? void 0 : _a.reduce(function (acc, mark) {
        var _a;
        return (__assign(__assign({}, acc), (_a = {}, _a[mark.type] = !isEmpty(mark.data) ? mark.data : true, _a)));
    }, {})) !== null && _b !== void 0 ? _b : {}));
};
var migrateElementNode = function (node) {
    var _a, _b, _c;
    return {
        data: (_a = node.data) !== null && _a !== void 0 ? _a : {},
        type: node.type,
        children: (_c = (_b = node.nodes) === null || _b === void 0 ? void 0 : _b.map(migrateNode)) !== null && _c !== void 0 ? _c : [],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    };
};
var migrateNode = function (oldNode) {
    if (oldNode.object === 'text') {
        return migrateTextNode(oldNode);
    }
    else {
        return migrateElementNode(oldNode);
    }
};
var migration = new Migration({
    toVersion: '0.0.4',
    fromVersionRange: '^0.0.3',
    migrate: function (state) {
        var _a, _b, _c, _d;
        if (!state) {
            return {};
        }
        var slate = (_d = (_c = (_b = (_a = state.serialized) === null || _a === void 0 ? void 0 : _a.document) === null || _b === void 0 ? void 0 : _b.nodes) === null || _c === void 0 ? void 0 : _c.map(migrateNode)) !== null && _d !== void 0 ? _d : [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var result = { slate: slate };
        if (state.importFromHtml) {
            result.importFromHtml = state.importFromHtml;
        }
        return result;
    },
});
export default migration;
//# sourceMappingURL=v004.js.map