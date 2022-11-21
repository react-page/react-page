import { Avatar, Grid, Typography } from '@mui/material';
import React from 'react';
import { useFocusCell, useOption, usePluginOfCell, useUiTranslator, } from '../../core/components/hooks';
import MoveActions from './MoveActions';
import { BottomToolbarTools } from './Tools';
export var BottomToolbarMainBar = React.memo(function (_a) {
    var _b;
    var nodeId = _a.nodeId, actionsLeft = _a.actionsLeft;
    var _c = (_b = usePluginOfCell(nodeId)) !== null && _b !== void 0 ? _b : {}, title = _c.title, icon = _c.icon;
    var t = useUiTranslator().t;
    var focus = useFocusCell(nodeId);
    var showMoveButtons = useOption('showMoveButtonsInBottomToolbar');
    return (React.createElement("div", null,
        React.createElement(Grid, { container: true, direction: "row", alignItems: "center" },
            icon || title ? (React.createElement(Grid, { item: true },
                React.createElement(Avatar, { onClick: function () { return focus(true); }, children: icon || (title ? title[0] : ''), style: {
                        cursor: 'pointer',
                        marginRight: 16,
                    } }))) : null,
            React.createElement(Grid, { item: true },
                React.createElement(Typography, { variant: "subtitle1" }, t(title))),
            actionsLeft &&
                React.Children.map(actionsLeft, function (action, index) { return (React.createElement(Grid, { item: true, key: index }, action)); }),
            showMoveButtons ? (React.createElement(Grid, { item: true, style: { marginLeft: 'auto' } },
                React.createElement(MoveActions, { nodeId: nodeId }))) : null,
            React.createElement(Grid, { item: true, style: { marginLeft: 'auto' } },
                React.createElement(BottomToolbarTools, { nodeId: nodeId })))));
});
//# sourceMappingURL=NodeTools.js.map