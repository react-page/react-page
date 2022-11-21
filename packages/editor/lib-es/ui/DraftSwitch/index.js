import { FormControlLabel, Switch, Tooltip } from '@mui/material';
import VisibleIcon from '@mui/icons-material/Visibility';
import NonVisibleIcon from '@mui/icons-material/VisibilityOff';
import React from 'react';
import { useCellProps, useLang, useSetDraft, useUiTranslator, } from '../../core/components/hooks';
var DraftSwitch = function (_a) {
    var _b, _c;
    var nodeId = _a.nodeId, lang = _a.lang;
    var t = useUiTranslator().t;
    var cell = useCellProps(nodeId, function (c) { return ({
        isDraft: c === null || c === void 0 ? void 0 : c.isDraft,
        isDraftI18n: c === null || c === void 0 ? void 0 : c.isDraftI18n,
    }); });
    var setDraft = useSetDraft(nodeId);
    var currentLang = useLang();
    if (!cell) {
        return null;
    }
    var theLang = lang !== null && lang !== void 0 ? lang : currentLang;
    var hasI18n = Boolean(cell.isDraftI18n);
    var isDraft = (_c = (_b = cell === null || cell === void 0 ? void 0 : cell.isDraftI18n) === null || _b === void 0 ? void 0 : _b[theLang]) !== null && _c !== void 0 ? _c : cell === null || cell === void 0 ? void 0 : cell.isDraft; // fallback to legacy
    var title = t(isDraft ? 'Content is hidden' : 'Content is visible');
    return cell ? (React.createElement(Tooltip, { title: title + (hasI18n ? ' in ' + theLang : '') },
        React.createElement(FormControlLabel, { style: { marginRight: 5 }, labelPlacement: "start", control: React.createElement(Switch, { color: "primary", checked: !isDraft, onChange: function (e) {
                    setDraft(!e.target.checked, theLang);
                } }), label: isDraft ? (React.createElement(NonVisibleIcon, { style: { marginTop: 5 } })) : (React.createElement(VisibleIcon, { style: { marginTop: 5 } })) }))) : null;
};
export default DraftSwitch;
//# sourceMappingURL=index.js.map