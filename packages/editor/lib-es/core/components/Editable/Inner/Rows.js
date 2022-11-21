import React from 'react';
import InsertNew from '../../Cell/InsertNew';
import { useCellSpacing, useOption, useValueNode } from '../../hooks';
import Row from '../../Row';
var Rows = function () {
    var _a;
    var rowIds = useValueNode(function (editable) {
        var _a, _b;
        return ({
            rowIds: (_b = (_a = editable === null || editable === void 0 ? void 0 : editable.rows) === null || _a === void 0 ? void 0 : _a.map(function (c) { return c.id; })) !== null && _b !== void 0 ? _b : [],
        });
    }).rowIds;
    var childConstraints = useOption('childConstraints');
    var components = useOption('components');
    var cellSpacingY = useCellSpacing().y;
    var insertAllowed = (childConstraints === null || childConstraints === void 0 ? void 0 : childConstraints.maxChildren)
        ? (childConstraints === null || childConstraints === void 0 ? void 0 : childConstraints.maxChildren) > rowIds.length
        : true;
    var InsertNewWithDefault = (_a = components === null || components === void 0 ? void 0 : components.InsertNew) !== null && _a !== void 0 ? _a : InsertNew;
    return (React.createElement(React.Fragment, null,
        rowIds.length > 0 ? (React.createElement("div", { style: cellSpacingY !== 0
                ? { margin: "".concat(-cellSpacingY / 2, "px 0") }
                : undefined }, rowIds.map(function (id) { return (React.createElement(Row, { nodeId: id, key: id })); }))) : null,
        insertAllowed ? React.createElement(InsertNewWithDefault, { childrenIds: rowIds }) : null));
};
export default React.memo(Rows);
//# sourceMappingURL=Rows.js.map