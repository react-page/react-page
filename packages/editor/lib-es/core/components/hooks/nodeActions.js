var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { getCommonAncestorTree } from '../../utils/ancestorTree';
import { blurAllCells } from '../../actions/cell';
import { blurCell, focusCell, removeCells, resizeCell, updateCellData, updateCellIsDraft, } from '../../actions/cell/core';
import { duplicateCell, duplicateNode, insertCellAtTheEnd, insertCellNewAsNewRow, } from '../../actions/cell/insert';
import { setDisplayReferenceNodeId } from '../../actions/display';
import { setLang } from '../../actions/setting';
import { useDispatch } from '../../reduxConnect';
import { isRow } from '../../types/node';
import { useAllCellPluginsForNode } from './node';
import { useEditorStore, useLang } from './options';
import { cloneWithNewIds } from '../../../core/utils/cloneWithNewIds';
import { useDisplayModeReferenceNodeId } from './displayMode';
/**
 * @param id id of a node
 * @returns function, that sets a cell in draft mode (will be invisible in readonly / preview)
 */
export var useSetDraft = function (id) {
    var dispatch = useDispatch();
    return useCallback(function (isDraft, lang) {
        return dispatch(updateCellIsDraft(id, isDraft, lang));
    }, [dispatch, id]);
};
/**
 * @returns function to resize a cell
 */
export var useResizeCellById = function () {
    var dispatch = useDispatch();
    return useCallback(function (nodeId, size) { return dispatch(resizeCell(nodeId)(size)); }, [dispatch]);
};
/**
 *
 * @param id a cell id
 * @returns a function to resize the given cell
 */
export var useResizeCell = function (id) {
    var resizeById = useResizeCellById();
    return useCallback(function (size) { return resizeById(id, size); }, [resizeById, id]);
};
/**
 *
 * @returns a function to change the current language
 */
export var useSetLang = function () {
    var dispatch = useDispatch();
    return useCallback(function (lang) { return dispatch(setLang(lang)); }, [dispatch]);
};
/**
 *
 * @param id a cell id
 * @returns function to update the data of the given cell. Sets the data in the current language, unless options.lang is set
 */
export var useUpdateCellData = function (id) {
    var dispatch = useDispatch();
    var currentLang = useLang();
    return useCallback(function (data, options) {
        if (options === void 0) { options = {}; }
        dispatch(updateCellData(id)(data, __assign({ notUndoable: false, lang: currentLang }, options)));
    }, [dispatch, id, currentLang]);
};
/**
 * @returns a function to remove a cell by id
 */
export var useRemoveCellById = function () {
    var dispatch = useDispatch();
    return useCallback(function (id) { return dispatch(removeCells(id ? [id] : [])); }, [dispatch]);
};
/**
 * @param id a cell id
 * @returns a function to remove the given cell
 */
export var useRemoveCell = function (id) {
    var removeById = useRemoveCellById();
    return useCallback(function () { return removeById(id); }, [removeById, id]);
};
/**
 *
 * @returns a function to remove muliple nodeids
 */
export var useRemoveMultipleNodeIds = function () {
    var dispatch = useDispatch();
    return useCallback(function (nodeIds) {
        dispatch(removeCells(nodeIds));
    }, [dispatch]);
};
/**
 * @returns a function that duplicates a cell
 */
export var useDuplicateCellById = function () {
    var dispatch = useDispatch();
    var editor = useEditorStore();
    return useCallback(function (id) {
        var node = editor && editor.getNode(id);
        if (node)
            dispatch(duplicateCell(node));
    }, [editor, dispatch]);
};
export var useInsertAfter = function () {
    var dispatch = useDispatch();
    var insertNew = useInsertNew();
    return useCallback(function (node, insertAfterNodeId) {
        if (insertAfterNodeId) {
            dispatch(duplicateNode(node, {
                insertAfterNodeId: insertAfterNodeId,
            }));
        }
        else {
            // insert at the end
            insertNew(cloneWithNewIds(node));
        }
    }, [dispatch, insertNew]);
};
/**
 * @returns a function that duplicates multiple cell
 */
export var useDuplicateMultipleCells = function () {
    var editor = useEditorStore();
    var insertAfter = useInsertAfter();
    return useCallback(function (cellIds) {
        var _a, _b, _c, _d;
        var node = editor && getCommonAncestorTree(editor, cellIds);
        if (!node) {
            return;
        }
        var insertAfterNodeId = isRow(node)
            ? node.id
            : (_d = (_a = node === null || node === void 0 ? void 0 : node.rows) === null || _a === void 0 ? void 0 : _a[(_c = (_b = node === null || node === void 0 ? void 0 : node.rows) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0 - 1]) === null || _d === void 0 ? void 0 : _d.id;
        insertAfter(node, insertAfterNodeId);
    }, [editor, insertAfter]);
};
/**
 * @param a cell id
 * @returns a function that duplicates the given cell
 */
export var useDuplicateCell = function (id) {
    var duplicate = useDuplicateCellById();
    return useCallback(function () { return duplicate(id); }, [duplicate, id]);
};
/**
 * experimental
 * @returns function to set the reference node id. used internally
 */
export var useSetDisplayReferenceNodeId = function () {
    var dispatch = useDispatch();
    var referenceId = useDisplayModeReferenceNodeId();
    return useCallback(function (nodeId) {
        if (nodeId !== referenceId)
            dispatch(setDisplayReferenceNodeId(nodeId));
    }, [dispatch, referenceId]);
};
/**
 * @returns a function to focus a cell by id
 */
export var useFocusCellById = function () {
    var dispatch = useDispatch();
    var editor = useEditorStore();
    return useCallback(function (id, scrollToCell, mode) {
        var _a, _b, _c;
        if (!editor) {
            return;
        }
        var parentCellId = (_c = (_b = (_a = editor
            .getNodeWithAncestors(id)) === null || _a === void 0 ? void 0 : _a.ancestors) === null || _b === void 0 ? void 0 : _b.find(function (node) { return !isRow(node); })) === null || _c === void 0 ? void 0 : _c.id;
        dispatch(setDisplayReferenceNodeId(parentCellId));
        dispatch(focusCell(id, scrollToCell, mode));
    }, [dispatch, editor]);
};
/**
 * @returns a function to focus a cell by id
 */
export var useFocusCell = function (id) {
    var focusCellById = useFocusCellById();
    return useCallback(function (scrollToCell, mode) {
        if (id) {
            focusCellById(id, scrollToCell, mode);
        }
    }, [focusCellById, id]);
};
/**
 * @returns function to blur a cell by id
 */
export var useBlurCell = function () {
    var dispatch = useDispatch();
    return useCallback(function (id) {
        dispatch(blurCell(id));
    }, [dispatch]);
};
/**
 * @returns function to blur all cells
 */
export var useBlurAllCells = function () {
    var dispatch = useDispatch();
    return useCallback(function () {
        dispatch(blurAllCells());
    }, [dispatch]);
};
/**
 * @returns function to insert a cell at the end of the document or the end of the parent cell
 *
 * if the id already exists, it will move that cell
 */
export var useInsertNew = function (parentCellId) {
    var dispatch = useDispatch();
    var cellPlugins = useAllCellPluginsForNode(parentCellId);
    var editor = useEditorStore();
    var lang = useLang();
    return useCallback(function (partialCell) {
        var action = parentCellId ? insertCellNewAsNewRow : insertCellAtTheEnd;
        dispatch(action({
            cellPlugins: cellPlugins,
            lang: lang,
        })(partialCell, { id: parentCellId }, { focusAfter: true }));
    }, [dispatch, editor, cellPlugins, parentCellId]);
};
/**
 * used for the trash target
 */
export var useTrashDrop = function () {
    var removeCell = useRemoveCellById();
    return useDrop({
        accept: 'cell',
        collect: function (monitor) { return ({
            isHovering: monitor.isOver({ shallow: true }),
        }); },
        drop: function (item, monitor) {
            if (item.cell) {
                removeCell(item.cell.id);
            }
        },
    });
};
//# sourceMappingURL=nodeActions.js.map