import ListItemMaterial from '@mui/material/ListItem';
import React from 'react';
import { connectField } from 'uniforms';
import AutoField from './AutoField';
import ListDelField from './ListDelField';
function ListItem(_a) {
    var _b = _a.children, children = _b === void 0 ? React.createElement(AutoField, { label: null, name: "" }) : _b, _c = _a.dense, dense = _c === void 0 ? true : _c, disableGutters = _a.disableGutters, divider = _a.divider, removeIcon = _a.removeIcon;
    return (React.createElement(ListItemMaterial, { dense: dense, disableGutters: disableGutters, divider: divider },
        children,
        React.createElement(ListDelField, { name: "", icon: removeIcon })));
}
export default connectField(ListItem, {
    initialValue: false,
});
//# sourceMappingURL=ListItemField.js.map