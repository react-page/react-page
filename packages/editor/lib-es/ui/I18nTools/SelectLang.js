import { Select, MenuItem } from '@mui/material';
import React, { memo } from 'react';
import { useLang, useOption, useSetLang } from '../../core/components/hooks';
var SelectLang = function () {
    var languages = useOption('languages');
    var lang = useLang();
    var setLang = useSetLang();
    if (languages && (languages === null || languages === void 0 ? void 0 : languages.length) > 0) {
        return (React.createElement(Select, { variant: "standard", value: lang || '', onChange: function (e) { return setLang(e.target.value); } }, languages.map(function (l) { return (React.createElement(MenuItem, { key: l.lang, value: l.lang }, l.label)); })));
    }
    return null;
};
export default memo(SelectLang);
//# sourceMappingURL=SelectLang.js.map