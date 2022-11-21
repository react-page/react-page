var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import isHotkey from 'is-hotkey';
import { useCallback, useEffect, useMemo } from 'react';
import { objIsNode } from '../../../core/utils/objIsNode';
import { isRow } from '../../types/node';
import { getCommonAncestorTree } from '../../utils/ancestorTree';
import { cloneAsCell } from '../../utils/cloneWithNewIds';
import { useAllCellPluginsForNode, useAllFocusedNodeIds, useBlurAllCells, useEditorStore, useFocusCellById, useFocusedNodeId, useInsertAfter, useIsEditMode, useIsInsertMode, useParentCellId, useRedo, useRemoveMultipleNodeIds, useSetEditMode, useSetInsertMode, useUndo, } from '../hooks';
var lastFocused = null;
var GlobalHotKeys = function (_a) {
    var focusRef = _a.focusRef;
    var editor = useEditorStore();
    var undo = useUndo();
    var redo = useRedo();
    var setInsertMode = useSetInsertMode();
    var isEditMode = useIsEditMode();
    var blurAllCells = useBlurAllCells();
    var focusedNodeIds = useAllFocusedNodeIds();
    var someCellIsFocused = focusedNodeIds.length > 0;
    var focusedNodeId = useFocusedNodeId();
    var focusParentId = useParentCellId(focusedNodeId);
    var plugins = useAllCellPluginsForNode(focusParentId);
    var focusCell = useFocusCellById();
    var removeCells = useRemoveMultipleNodeIds();
    var insertAfter = useInsertAfter();
    var isInsertMode = useIsInsertMode();
    var setEditMode = useSetEditMode();
    var delegateToFoundPlugin = useCallback(function (event, nodeId, handlerName, defaultHandler) { return __awaiter(void 0, void 0, void 0, function () {
        var node, plugin, e_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    node = nodeId ? editor === null || editor === void 0 ? void 0 : editor.getNode(nodeId) : null;
                    plugin = plugins.find(function (p) { var _a; return p.id === ((_a = node === null || node === void 0 ? void 0 : node.plugin) === null || _a === void 0 ? void 0 : _a.id); });
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 5, , 6]);
                    if (!(isEditMode && node && (plugin === null || plugin === void 0 ? void 0 : plugin[handlerName]))) return [3 /*break*/, 3];
                    return [4 /*yield*/, ((_a = plugin[handlerName]) === null || _a === void 0 ? void 0 : _a.call(plugin, event, node))];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3: 
                // if the plugin handler resolve or there is no, they do not handle it, so do the default
                return [4 /*yield*/, defaultHandler(event, node)];
                case 4:
                    // if the plugin handler resolve or there is no, they do not handle it, so do the default
                    _b.sent();
                    return [3 /*break*/, 6];
                case 5:
                    e_1 = _b.sent();
                    if (e_1) {
                        // tslint:disable-next-line:no-console
                        console.error(e_1);
                    }
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); }, [editor, isEditMode]);
    var handlers = useMemo(function () {
        var handleCopy = function (deleteAfter) {
            var _a;
            var _b;
            if (deleteAfter === void 0) { deleteAfter = false; }
            // copy cell, unless text is selected
            if (((_b = window.getSelection()) === null || _b === void 0 ? void 0 : _b.type) !== 'Range' &&
                (focusedNodeIds === null || focusedNodeIds === void 0 ? void 0 : focusedNodeIds.length) > 0) {
                if (!editor) {
                    return;
                }
                var node = getCommonAncestorTree(editor, focusedNodeIds);
                if (!node) {
                    return;
                }
                var cell = cloneAsCell(node);
                var type = 'text/plain'; // json is not supported
                var blob = new Blob([JSON.stringify(cell)], { type: type });
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var data = [new ClipboardItem((_a = {}, _a[type] = blob, _a))];
                navigator.clipboard.write(data);
                if (deleteAfter) {
                    removeCells(focusedNodeIds);
                }
            }
        };
        return [
            {
                hotkeys: ['Escape'],
                handler: function () {
                    if (someCellIsFocused) {
                        blurAllCells();
                    }
                    if (isInsertMode) {
                        setEditMode();
                    }
                },
            },
            {
                hotkeys: ['mod+z'],
                handler: function () {
                    undo();
                },
            },
            {
                hotkeys: ['mod+c'],
                handler: function () {
                    handleCopy(false);
                },
            },
            {
                hotkeys: ['mod+x'],
                handler: function () {
                    handleCopy(true);
                },
            },
            {
                hotkeys: ['mod+v'],
                handler: function () { return __awaiter(void 0, void 0, void 0, function () {
                    var node, _a, _b, commonAncestorNode, insertAfterNodeId, e_2;
                    var _c;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0:
                                _d.trys.push([0, 2, , 3]);
                                _b = (_a = JSON).parse;
                                return [4 /*yield*/, navigator.clipboard.readText()];
                            case 1:
                                node = _b.apply(_a, [_d.sent()]);
                                if (!editor) {
                                    return [2 /*return*/];
                                }
                                if (objIsNode(node)) {
                                    commonAncestorNode = focusedNodeIds.length > 0
                                        ? getCommonAncestorTree(editor, focusedNodeIds)
                                        : null;
                                    insertAfterNodeId = commonAncestorNode
                                        ? isRow(commonAncestorNode)
                                            ? commonAncestorNode.cells.length === 1 // if it has just one cell, add below this cell. if it has multiple, add below this row
                                                ? commonAncestorNode.cells[0].id
                                                : commonAncestorNode.id
                                            : (_c = commonAncestorNode.rows) === null || _c === void 0 ? void 0 : _c[commonAncestorNode.rows.length - 1].id // if common ancestor is a cell (usually the root cell, add below last row)
                                        : null;
                                    insertAfter(node, insertAfterNodeId);
                                }
                                return [3 /*break*/, 3];
                            case 2:
                                e_2 = _d.sent();
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); },
            },
            {
                hotkeys: ['ctrl+shift+z', 'ctrl+y', 'command+shift+z', 'command+y'],
                handler: function () {
                    redo();
                },
            },
            {
                hotkeys: ['alt+del', 'alt+backspace'],
                handler: function (event) {
                    delegateToFoundPlugin(event, focusedNodeId, 'handleRemoveHotKey', function () {
                        removeCells(focusedNodeIds);
                    });
                },
            },
        ];
    }, [
        editor,
        focusedNodeId,
        focusedNodeIds,
        someCellIsFocused,
        blurAllCells,
        focusCell,
        removeCells,
        setEditMode,
        setInsertMode,
    ]);
    useEffect(function () {
        // when we have multiple instances, we try to send the event only to the right one
        // we do a little trick with a global variable (instead of requiring a wrapping context)
        var _a, _b;
        lastFocused = focusRef.current;
        var keyHandler = function (event) {
            if (lastFocused !== focusRef.current)
                return;
            var matchingHandler = handlers.find(function (handler) {
                return handler.hotkeys.some(function (hotkey) { return isHotkey(hotkey, event); });
            });
            matchingHandler === null || matchingHandler === void 0 ? void 0 : matchingHandler.handler(event);
        };
        document.addEventListener('keydown', keyHandler);
        var focusHandler = function () {
            lastFocused = focusRef.current;
        };
        (_a = focusRef.current) === null || _a === void 0 ? void 0 : _a.addEventListener('click', focusHandler);
        (_b = focusRef.current) === null || _b === void 0 ? void 0 : _b.addEventListener('mouseenter', focusHandler);
        return function () {
            var _a, _b;
            document.removeEventListener('keydown', keyHandler);
            (_a = focusRef.current) === null || _a === void 0 ? void 0 : _a.removeEventListener('mouseenter', focusHandler);
            (_b = focusRef.current) === null || _b === void 0 ? void 0 : _b.removeEventListener('click', focusHandler);
            if (lastFocused === focusRef.current) {
                lastFocused = null;
            }
        };
    }, [handlers, someCellIsFocused, isEditMode, focusRef]);
    return null;
};
export default GlobalHotKeys;
//# sourceMappingURL=GlobalHotKeys.js.map