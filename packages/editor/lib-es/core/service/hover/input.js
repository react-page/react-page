import { computeHover } from './computeHover';
var computeCurrentDropPosition = function (actions, hover, drag, monitor, element, cellPlugins) {
    var mousePosition = monitor.getClientOffset();
    var componentPosition = element.getBoundingClientRect();
    var room = {
        height: componentPosition.bottom - componentPosition.top,
        width: componentPosition.right - componentPosition.left,
    };
    if (!mousePosition) {
        return;
    }
    var mouse = {
        y: mousePosition.y - componentPosition.top,
        x: mousePosition.x - componentPosition.left,
    };
    computeHover(drag, hover, actions, {
        room: room,
        mouse: mouse,
        cellPlugins: cellPlugins,
    });
};
export var computeAndDispatchInsert = function (hover, drag, monitor, element, actions, cellPlugins) {
    return computeCurrentDropPosition(actions, hover, drag, monitor, element, cellPlugins);
};
export var computeAndDispatchHover = function (hover, drag, monitor, element, actions, cellPlugins) {
    return computeCurrentDropPosition(actions, hover, drag, monitor, element, cellPlugins);
};
//# sourceMappingURL=input.js.map