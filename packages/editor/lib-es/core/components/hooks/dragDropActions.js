import { useMemo } from 'react';
import { cancelCellDrag, cellHoverAbove, cellHoverBelow, cellHoverInlineLeft, cellHoverInlineRight, cellHoverLeftOf, cellHoverRightOf, clearHover, dragCell, } from '../../actions/cell';
import { insertCellAbove, insertCellBelow, insertCellLeftInline, insertCellLeftOf, insertCellRightInline, insertCellRightOf, } from '../../actions/cell/insert';
import { useDispatch } from '../../reduxConnect';
import { useAllCellPluginsForNode } from './node';
import { useLang } from './options';
/**
 * @returns object of actions for hovering
 */
export var useHoverActions = function () {
    var dispatch = useDispatch();
    return useMemo(function () { return ({
        dragCell: function (id) { return dispatch(dragCell(id)); },
        clear: function () { return dispatch(clearHover()); },
        cancelCellDrag: function () { return dispatch(cancelCellDrag()); },
        above: function (drag, hover, options) {
            return dispatch(cellHoverAbove(drag, hover, options === null || options === void 0 ? void 0 : options.level));
        },
        below: function (drag, hover, options) {
            return dispatch(cellHoverBelow(drag, hover, options === null || options === void 0 ? void 0 : options.level));
        },
        leftOf: function (drag, hover, options) {
            return dispatch(cellHoverLeftOf(drag, hover, options === null || options === void 0 ? void 0 : options.level));
        },
        rightOf: function (drag, hover, options) {
            return dispatch(cellHoverRightOf(drag, hover, options === null || options === void 0 ? void 0 : options.level));
        },
        inlineLeft: function (drag, hover) { return dispatch(cellHoverInlineLeft(drag, hover)); },
        inlineRight: function (drag, hover) { return dispatch(cellHoverInlineRight(drag, hover)); },
    }); }, [dispatch]);
};
/**
 * @param nodeId the parent reference node id
 * @returns object of actions for dropping a cell
 */
export var useDropActions = function (parentNodeId) {
    var dispatch = useDispatch();
    var lang = useLang();
    var cellPlugins = useAllCellPluginsForNode(parentNodeId);
    return useMemo(function () { return ({
        above: function (drag, hover, level) {
            return dispatch(insertCellAbove({ cellPlugins: cellPlugins, lang: lang })(drag, hover, level));
        },
        below: function (drag, hover, level) {
            return dispatch(insertCellBelow({ cellPlugins: cellPlugins, lang: lang })(drag, hover, level));
        },
        leftOf: function (drag, hover, level) {
            return dispatch(insertCellLeftOf({ cellPlugins: cellPlugins, lang: lang })(drag, hover, level));
        },
        rightOf: function (drag, hover, level) {
            return dispatch(insertCellRightOf({ cellPlugins: cellPlugins, lang: lang })(drag, hover, level));
        },
        inlineLeft: function (drag, hover) {
            return dispatch(insertCellLeftInline({ cellPlugins: cellPlugins, lang: lang })(drag, hover));
        },
        inlineRight: function (drag, hover) {
            return dispatch(insertCellRightInline({ cellPlugins: cellPlugins, lang: lang })(drag, hover));
        },
        dragCell: function (id) { return dispatch(dragCell(id)); },
        clear: function () { return dispatch(clearHover()); },
        cancelCellDrag: function () { return dispatch(cancelCellDrag()); },
    }); }, [dispatch, lang, cellPlugins]);
};
//# sourceMappingURL=dragDropActions.js.map