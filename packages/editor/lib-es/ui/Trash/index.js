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
import Fab from '@mui/material/Fab';
import Delete from '@mui/icons-material/Delete';
import classNames from 'classnames';
import React from 'react';
import { useIsLayoutMode, useTrashDrop } from '../../core/components/hooks';
export var Trash = React.memo(function () {
    var isLayoutMode = useIsLayoutMode();
    var _a = __read(useTrashDrop(), 2), isHovering = _a[0].isHovering, ref = _a[1];
    return (React.createElement("div", { ref: ref, className: classNames('react-page-controls-trash', {
            'react-page-controls-trash-active': isLayoutMode,
        }) },
        React.createElement(Fab, { color: "secondary", disabled: !isHovering },
            React.createElement(Delete, null))));
});
//# sourceMappingURL=index.js.map