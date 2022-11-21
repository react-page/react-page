import React, { useEffect } from 'react';
import { DISPLAY_MODE_EDIT } from '../actions/display';
import { useBlurAllCells, useIsInsertMode, useOption, useSetMode, } from './hooks';
// this might break in future, but its better than nothing
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function findReactElement(node) {
    for (var key in node) {
        if (key.startsWith('__reactInternalInstance$') ||
            key.startsWith('__reactFiber$') // react 17
        ) {
            return node[key];
        }
    }
    return null;
}
// we go up the reac-tree. This works even through portals, which would not be possible with traversing the dom tree!
var isInSameTree = function (parent, child) {
    if (!parent) {
        return false;
    }
    var element = findReactElement(child);
    while (element) {
        if (element.stateNode === parent) {
            return true;
        }
        element = element.return;
    }
    return false;
};
var useBlurAll = function (_a) {
    var _b = _a.defaultMode, defaultMode = _b === void 0 ? DISPLAY_MODE_EDIT : _b, disabled = _a.disabled;
    var ref = React.useRef();
    var blurAllCells = useBlurAllCells();
    var setMode = useSetMode();
    var isInsertMode = useIsInsertMode();
    useEffect(function () {
        if (disabled) {
            return;
        }
        if (!ref.current) {
            return;
        }
        if (!document && !document.body) {
            return;
        }
        var onMouseDown = function (e) {
            if (!isInSameTree(ref.current, e.target)) {
                blurAllCells();
                // set us in default mode if current mode is "insert"
                if (isInsertMode) {
                    setMode(defaultMode);
                }
            }
        };
        document.body.addEventListener('mousedown', onMouseDown);
        return function () {
            document.body.removeEventListener('mousedown', onMouseDown);
        };
    }, [ref.current, disabled, isInsertMode, setMode, blurAllCells]);
    return ref;
};
var BlurGate = function (_a) {
    var children = _a.children;
    var defaultMode = useOption('blurGateDefaultMode');
    var disabled = useOption('blurGateDisabled');
    var ref = useBlurAll({ defaultMode: defaultMode, disabled: disabled });
    return React.createElement("div", { ref: ref }, children);
};
export default BlurGate;
//# sourceMappingURL=BlurGate.js.map