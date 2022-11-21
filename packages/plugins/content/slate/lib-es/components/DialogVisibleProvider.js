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
import React, { useContext, useMemo, useState } from 'react';
var DialogContext = React.createContext({});
var DialogVisibleProvider = function (_a) {
    var children = _a.children;
    var _b = __read(useState(false), 2), visible = _b[0], setVisible = _b[1];
    var value = useMemo(function () { return ({ visible: visible, setVisible: setVisible }); }, [visible, setVisible]);
    return (React.createElement(DialogContext.Provider, { value: value }, children));
};
export var useDialogIsVisible = function () {
    var _a;
    return (_a = useContext(DialogContext)) === null || _a === void 0 ? void 0 : _a.visible;
};
export var useSetDialogIsVisible = function () {
    var _a;
    return (_a = useContext(DialogContext)) === null || _a === void 0 ? void 0 : _a.setVisible;
};
export default DialogVisibleProvider;
//# sourceMappingURL=DialogVisibleProvider.js.map