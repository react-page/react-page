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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import ListMaterial from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import React, { Children, cloneElement, isValidElement } from 'react';
import { connectField, filterDOMProps } from 'uniforms';
import ListAddField from './ListAddField';
import ListItemField from './ListItemField';
function List(_a) {
    var addIcon = _a.addIcon, _b = _a.children, children = _b === void 0 ? React.createElement(ListItemField, { name: "$" }) : _b, initialCount = _a.initialCount, itemProps = _a.itemProps, label = _a.label, value = _a.value, props = __rest(_a, ["addIcon", "children", "initialCount", "itemProps", "label", "value"]);
    return (React.createElement(React.Fragment, null,
        React.createElement(ListMaterial, __assign({ dense: true, subheader: label ? (React.createElement(ListSubheader, { disableSticky: true }, label)) : undefined }, filterDOMProps(props)), value === null || value === void 0 ? void 0 : value.map(function (item, itemIndex) {
            return Children.map(children, function (child, childIndex) {
                var _a;
                return isValidElement(child)
                    ? cloneElement(child, __assign({ key: "".concat(itemIndex, "-").concat(childIndex), name: (_a = child.props.name) === null || _a === void 0 ? void 0 : _a.replace('$', '' + itemIndex) }, itemProps))
                    : child;
            });
        })),
        React.createElement(ListAddField, { icon: addIcon, initialCount: initialCount, name: "$" })));
}
export default connectField(List);
//# sourceMappingURL=ListField.js.map