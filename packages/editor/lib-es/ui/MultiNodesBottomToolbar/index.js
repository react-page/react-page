import { Avatar, Grid, Typography } from '@mui/material';
import React from 'react';
import { useAllFocusedNodeIds, useUiTranslator, } from '../../core/components/hooks';
import { BottomToolbarDrawer } from '../BottomToolbar';
import DeleteAll from './DeleteAll';
import DuplicateAll from './DuplicateAll';
export var MultiNodesBottomToolbar = React.memo(function () {
    var t = useUiTranslator().t;
    var focusedNodeIds = useAllFocusedNodeIds();
    return (React.createElement(BottomToolbarDrawer, { open: focusedNodeIds.length > 1, anchor: 'bottom' },
        React.createElement(Grid, { container: true, direction: "row", alignItems: "center" },
            React.createElement(Grid, { item: true },
                React.createElement(Avatar, { children: focusedNodeIds.length, style: {
                        marginRight: 16,
                    } })),
            React.createElement(Grid, { item: true },
                React.createElement(Typography, { variant: "subtitle1" }, t('(multiple selected)'))),
            React.createElement(Grid, { item: true, style: { marginLeft: 'auto' } },
                React.createElement(DuplicateAll, null)),
            React.createElement(Grid, { item: true },
                React.createElement(DeleteAll, null)))));
});
//# sourceMappingURL=index.js.map