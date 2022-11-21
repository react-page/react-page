var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import React from 'react';
import { useEffect, useState } from 'react';
import { Resizable } from 'react-resizable';
var faintBlack = 'rgba(0, 0, 0, 0.12)';
var SpacerResizable = function (props) {
    var _a, _b, _c;
    var _d = __read(useState((_b = (_a = props.data) === null || _a === void 0 ? void 0 : _a.height) !== null && _b !== void 0 ? _b : 24), 2), height = _d[0], setHeight = _d[1];
    useEffect(function () { var _a; return setHeight((_a = props.data) === null || _a === void 0 ? void 0 : _a.height); }, [(_c = props.data) === null || _c === void 0 ? void 0 : _c.height]);
    var onChange = props.onChange;
    return (React.createElement(Resizable, { onResize: function (e, _a) {
            var _b;
            var size = _a.size;
            setHeight((_b = size === null || size === void 0 ? void 0 : size.height) !== null && _b !== void 0 ? _b : 0);
        }, onResizeStop: function (e, _a) {
            var size = _a.size;
            return onChange({
                height: size === null || size === void 0 ? void 0 : size.height,
            });
        }, height: height, width: 0 },
        React.createElement("div", { style: { height: height, position: 'relative' } },
            React.createElement("div", { style: {
                    position: 'absolute',
                    bottom: '0',
                    height: '24px',
                    width: '100%',
                    background: faintBlack,
                    textAlign: 'center',
                } },
                React.createElement("svg", { viewBox: "0 0 24 24", style: { color: 'white', width: 24, height: 24 } },
                    React.createElement("path", { d: "M20 9H4v2h16V9zM4 15h16v-2H4v2z" }))))));
};
export default SpacerResizable;
//# sourceMappingURL=SpacerResizable.js.map