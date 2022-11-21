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
import { useEffect, useState } from 'react';
import { useSlate } from 'slate-react';
export default (function (plugin) {
    var editor = useSlate();
    var _a = __read(useState(false), 2), disabled = _a[0], setDisabled = _a[1];
    useEffect(function () {
        if (plugin.isDisabled) {
            try {
                plugin.isDisabled(editor).then(function (d) {
                    setDisabled(d);
                });
            }
            catch (e) {
                // slate sometimes throws when dom node cant be found in undo
            }
        }
    }, [editor.selection, plugin]);
    if (!editor) {
        return true;
    }
    return disabled;
});
//# sourceMappingURL=usePluginIsDisabled.js.map