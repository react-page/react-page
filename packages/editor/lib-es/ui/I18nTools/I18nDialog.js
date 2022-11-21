import { Button, DialogContent, Table } from '@mui/material';
import Translate from '@mui/icons-material/Translate';
import React, { useCallback } from 'react';
import { useCellDataI18nRaw, useLang, useOption, useSetLang, useUiTranslator, useUpdateCellData, } from '../../core/components/hooks';
import DraftSwitch from '../DraftSwitch';
import SelectLang from './SelectLang';
var I18nDialog = function (_a) {
    var _b;
    var nodeId = _a.nodeId, onClose = _a.onClose;
    var currentLang = useLang();
    var languages = useOption('languages');
    var t = useUiTranslator().t;
    var setLang = useSetLang();
    var dataI18n = useCellDataI18nRaw(nodeId);
    var updateCellData = useUpdateCellData(nodeId);
    var reset = useCallback(function (lang) {
        updateCellData(null, {
            lang: lang,
        });
    }, [updateCellData]);
    var defaultLangLabel = (_b = languages === null || languages === void 0 ? void 0 : languages[0]) === null || _b === void 0 ? void 0 : _b.label;
    return (React.createElement(DialogContent, null,
        React.createElement("div", { style: { display: 'flex', alignItems: 'center' } },
            React.createElement(Translate, { style: { marginRight: 'auto' } }),
            " ",
            React.createElement(SelectLang, null)),
        React.createElement("hr", null),
        React.createElement(Table, null,
            React.createElement("tbody", null, languages === null || languages === void 0 ? void 0 : languages.map(function (l, index) {
                var data = dataI18n === null || dataI18n === void 0 ? void 0 : dataI18n[l.lang];
                var isCurrent = currentLang === l.lang;
                var hasData = Boolean(data);
                return (React.createElement("tr", { key: l.lang },
                    React.createElement("th", { style: {
                            textAlign: 'left',
                            textDecoration: isCurrent ? 'underline' : undefined,
                        } },
                        React.createElement(Button, { onClick: function () { return setLang(l.lang); } },
                            l.label,
                            " ",
                            index === 0 ? t('(default)') : null)),
                    React.createElement("td", null,
                        React.createElement(DraftSwitch, { nodeId: nodeId, lang: l.lang })),
                    React.createElement("td", null, hasData ? '✔️' : ' '),
                    React.createElement("td", null, hasData && index !== 0 ? (React.createElement(Button, { onClick: function () {
                            reset(l.lang);
                        } }, t("Reset to ".concat(defaultLangLabel, " \u26A0\uFE0F")))) : null)));
            }))),
        React.createElement(Button, { onClick: function () { return onClose(); } }, t('Close'))));
};
export default I18nDialog;
//# sourceMappingURL=I18nDialog.js.map