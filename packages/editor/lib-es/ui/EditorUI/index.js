import React from 'react';
import { PluginDrawer } from '../PluginDrawer';
import { Trash } from '../Trash';
import { Sidebar } from '../Sidebar';
import { useOption } from '../../core/components/hooks';
import { MultiNodesBottomToolbar } from '../MultiNodesBottomToolbar';
export default React.memo(function (_a) {
    var _b = _a.stickyNess, stickyNess = _b === void 0 ? {
        shouldStickToTop: false,
        shouldStickToBottom: false,
        rightOffset: 0,
        rightOffsetFixed: 0,
    } : _b;
    var hideEditorSidebar = useOption('hideEditorSidebar');
    return (React.createElement(React.Fragment, null,
        React.createElement(Trash, null),
        !hideEditorSidebar && React.createElement(Sidebar, { stickyNess: stickyNess }),
        React.createElement(PluginDrawer, null),
        React.createElement(MultiNodesBottomToolbar, null)));
});
//# sourceMappingURL=index.js.map