import IconRedo from '@mui/icons-material/Redo';
import IconUndo from '@mui/icons-material/Undo';
import React from 'react';
import { useCanRedo, useCanUndo, useIsSmallScreen, useRedo, useUndo, } from '../../../core/components/hooks';
import Button from '../Button/index';
var UndoRedo = function (_a) {
    var labelUndo = _a.labelUndo, labelRedo = _a.labelRedo;
    var undo = useUndo();
    var canUndo = useCanUndo();
    var canRedo = useCanRedo();
    var redo = useRedo();
    var isSmall = useIsSmallScreen();
    return (React.createElement("div", { style: {
            height: isSmall ? 56 : 80,
            float: 'right',
            display: 'flex',
            direction: 'ltr',
            transform: 'scale(1.2)',
        } },
        React.createElement("div", { style: {
                width: isSmall ? 29 : 36,
                overflow: 'hidden',
                marginRight: isSmall ? 1 : 2,
            } },
            React.createElement(Button, { active: true, disabled: !canUndo, style: {
                    transform: "translateX(".concat(isSmall ? 27 : 35, "px)"),
                }, icon: React.createElement(IconUndo, { style: { transform: "translateX(-".concat(isSmall ? 6 : 12, "px)") } }), description: labelUndo, onClick: undo, activeColor: "primary" })),
        React.createElement("div", { style: {
                width: isSmall ? 28 : 36,
                overflow: 'hidden',
                marginLeft: 1,
            } },
            React.createElement(Button, { style: {
                    position: 'relative',
                    transform: 'translateX(1px)',
                }, active: true, disabled: !canRedo, icon: React.createElement(IconRedo, { style: { transform: "translateX(".concat(isSmall ? 6 : 12, "px)") } }), description: labelRedo, onClick: redo, activeColor: "primary" }))));
};
export default React.memo(UndoRedo);
//# sourceMappingURL=index.js.map