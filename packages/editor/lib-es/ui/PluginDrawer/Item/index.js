import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import { useDisplayModeReferenceNodeId, useInsertNew, useUiTranslator, } from '../../../core/components/hooks';
import Draggable from '../Draggable/index';
var Item = function (_a) {
    var _b, _c;
    var plugin = _a.plugin, insert = _a.insert;
    var title = (_b = plugin.title) !== null && _b !== void 0 ? _b : plugin.text;
    var t = useUiTranslator().t;
    if (!plugin.icon && !title) {
        return null;
    }
    var referenceNodeId = useDisplayModeReferenceNodeId();
    var insertNew = useInsertNew(referenceNodeId);
    var insertIt = React.useCallback(function () { return insertNew(insert); }, [insertNew, referenceNodeId, insert]);
    return (React.createElement(Draggable, { insert: insert },
        React.createElement(ListItem, { title: (_c = t('Click to add or drag and drop it somewhere on your page!')) !== null && _c !== void 0 ? _c : '', className: "react-page-plugin-drawer-item", onClick: insertIt },
            React.createElement(Avatar, { children: plugin.icon || (title === null || title === void 0 ? void 0 : title[0]), style: {
                    marginRight: 16,
                } }),
            React.createElement(ListItemText, { primary: t(title), secondary: t(plugin.description) }))));
};
export default Item;
//# sourceMappingURL=index.js.map