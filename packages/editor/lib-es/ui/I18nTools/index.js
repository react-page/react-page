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
import { IconButton, Dialog } from '@mui/material';
import Translate from '@mui/icons-material/Translate';
import React, { useState } from 'react';
import SelectLang from './SelectLang';
import I18nDialog from './I18nDialog';
import { useOption } from '../../core/components/hooks';
export var I18nTools = React.memo(function (_a) {
    var nodeId = _a.nodeId;
    var languages = useOption('languages');
    var _b = __read(useState(false), 2), showI18nDialog = _b[0], setShowI18nDialog = _b[1];
    var hasI18n = languages && (languages === null || languages === void 0 ? void 0 : languages.length) > 0;
    var onClose = function () { return setShowI18nDialog(false); };
    if (!hasI18n) {
        return null;
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(Dialog, { open: showI18nDialog, onClose: onClose },
            React.createElement(I18nDialog, { nodeId: nodeId, onClose: onClose })),
        React.createElement("div", { style: { display: 'flex', alignItems: 'center' } },
            React.createElement(IconButton, { onClick: function () { return setShowI18nDialog(true); }, "aria-label": "i18n", color: "secondary" },
                React.createElement(Translate, null)),
            React.createElement(SelectLang, null))));
});
//# sourceMappingURL=index.js.map