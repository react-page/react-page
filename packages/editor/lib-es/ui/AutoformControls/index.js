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
import React, { Fragment, useEffect, useMemo } from 'react';
import { useIsSmallScreen } from '../../core/components/hooks';
import lazyLoad from '../../core/helper/lazyLoad';
import makeUniformsSchema from './makeUniformsSchema';
export var AutoForm = lazyLoad(function () { return import('./AutoForm'); });
export var AutoField = lazyLoad(function () { return import('./AutoField'); });
export var AutoFields = lazyLoad(function () { return import('./AutoFields'); });
var getDefaultValue = function (bridge) {
    return bridge.getSubfields().reduce(function (acc, fieldName) {
        var _a;
        return (__assign(__assign({}, acc), (_a = {}, _a[fieldName] = bridge.getInitialValue(fieldName), _a)));
    }, {});
};
export function AutoformControls(props) {
    var onChange = props.onChange, data = props.data, schema = props.schema, _a = props.columnCount, columnCount = _a === void 0 ? 2 : _a, Content = props.Content;
    var bridge = useMemo(function () { return makeUniformsSchema(schema); }, [schema]);
    useEffect(function () {
        var newDefaultData = __assign(__assign({}, getDefaultValue(bridge)), (data !== null && data !== void 0 ? data : {}));
        onChange(newDefaultData);
    }, [bridge]);
    var isSmall = useIsSmallScreen();
    return (React.createElement(AutoForm
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    , { 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        model: data, autosave: true, schema: bridge, onSubmit: onChange }, Content ? (React.createElement(Content, __assign({}, props, { columnCount: columnCount }))) : (React.createElement("div", { style: {
            columnCount: isSmall ? 1 : columnCount,
            columnRule: '1px solid #E0E0E0',
            columnGap: 48,
        } },
        React.createElement(AutoFields, { element: Fragment })))));
}
//# sourceMappingURL=index.js.map