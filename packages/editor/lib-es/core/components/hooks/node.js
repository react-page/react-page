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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from '../../reduxConnect';
import { findNodeInState } from '../../selector/editable';
import { isRow } from '../../types/node';
import deepEquals from '../../utils/deepEquals';
import { getAvailablePlugins } from '../../utils/getAvailablePlugins';
import { getCellData } from '../../utils/getCellData';
import { getCellInnerDivStylingProps } from '../../utils/getCellStylingProps';
import { getDropLevels } from '../../utils/getDropLevels';
import { useUpdateCellData } from './nodeActions';
import { useLang } from './options';
import { useRenderOption } from './renderOptions';
/**
 * Use this function to get derived properties of a node. It prevents unnessesary rerenders when only the nessesary properties are returned by the selector
 *
 * you can also select props from the ancestors of the node. Be aware that the last ancestor is the root document id
 *
 * @param nodeId an id of a node (cell or row)
 * @param selector receives the node object or null (if no node with this id exists) and returns T
 * @returns the selection T
 */
export var useNodeProps = function (nodeId, selector) {
    var node = useSelector(function (state) {
        var result = nodeId ? findNodeInState(state, nodeId) : null;
        if (!result) {
            return selector(null, []);
        }
        return selector(result.node, result.ancestors);
    }, deepEquals);
    return node;
};
/**
 *
 * @param nodeId id of a node
 * @param selector receives the ancestors array and returns T
 * @returns T
 */
export var useNodeAncestorProps = function (nodeId, selector) {
    return useNodeProps(nodeId, function (__, ancestors) { return selector(ancestors); });
};
/**
 * This is the same as @see useNodeProps, but only for cells. selector will receive null if the given nodeId is not a cell
 * @param nodeId an id of a cell
 * @param selector receives the cell or null (if no cell with this id exists) object and returns T
 * @returns the selection T
 */
export var useCellProps = function (nodeId, selector) {
    return useNodeProps(nodeId, function (node, ancestors) {
        return node && !isRow(node) ? selector(node, ancestors) : selector(null, ancestors);
    });
};
/**
 * better use useCellProps, unless you really need the full cell object
 * @param nodeId an id of a cell
 * @returns full Cell object
 */
export var useCell = function (nodeId) {
    return useNodeProps(nodeId, function (node, ancestors) {
        return !isRow(node) ? node : null;
    });
};
/**
 * This is the same as @see useNodeProps, but only for rows.
 * @param nodeId an id of a row
 * @param selector receives the row or null (if no row with this id exists) object and returns T
 * @returns the selection T
 */
export var useRowProps = function (nodeId, selector) {
    return useNodeProps(nodeId, function (node, ancestors) {
        return isRow(node) ? selector(node, ancestors) : null;
    });
};
/**
 *
 * @param nodeId id of a node
 * @returns the relative hover position over the given node, or null if this node is not hovered over
 */
export var useNodeHoverPosition = function (nodeId) {
    return useSelector(function (state) {
        var _a, _b;
        return ((_a = state.reactPage.hover) === null || _a === void 0 ? void 0 : _a.nodeId) === nodeId
            ? (_b = state.reactPage.hover) === null || _b === void 0 ? void 0 : _b.position
            : null;
    });
};
/**
 *
 * @param nodeId id of a node
 * @returns an array of ids that are ancestors of the given node
 */
export var useNodeAncestorIds = function (nodeId) {
    return useNodeAncestorProps(nodeId, function (ancestors) {
        return ancestors.map(function (a) { return a.id; });
    });
};
/**
 *
 * @param nodeId the id of a row or cell
 * @returns the nearest ancestor cell of the cell or row that has a plugin
 */
export var useParentCellId = function (nodeId) {
    return useNodeProps(nodeId, function (node, ancestors) {
        var _a;
        return node && ancestors
            ? (_a = ancestors.find(function (node) { return !isRow(node) && node.plugin; })) === null || _a === void 0 ? void 0 : _a.id
            : null;
    });
};
/**
 * returns a cell as a HoverTarget that is suiteable to be passed to the drop-logic
 *
 * @param nodeId a nodeId
 * @returns a HoverTarget
 */
export var useNodeAsHoverTarget = function (nodeId) {
    return useNodeProps(nodeId, function (node, ancestors) {
        var _a;
        return node
            ? {
                id: node.id,
                // the last element is the root element, we can't currenly use that as hover target
                ancestorIds: ancestors.slice(0, -1).map(function (a) { return a.id; }),
                hasInlineNeighbour: !isRow(node)
                    ? node.hasInlineNeighbour
                    : undefined,
                inline: !isRow(node) ? node.inline : null,
                levels: getDropLevels(node, ancestors),
                pluginId: !isRow(node) ? (_a = node.plugin) === null || _a === void 0 ? void 0 : _a.id : undefined,
            }
            : null;
    });
};
/**
 *
 * @deprecated currently unused
 */
export var useCellBounds = function (nodeId) {
    return useNodeProps(nodeId, function (node, ancestors) {
        var _a, _b, _c, _d, _e, _f, _g;
        var parent = isRow(ancestors[0]) ? ancestors[0] : null;
        if (!node) {
            return null;
        }
        var myIndex = (_a = parent === null || parent === void 0 ? void 0 : parent.cells.findIndex(function (c) { return c.id === node.id; })) !== null && _a !== void 0 ? _a : -1;
        var cell = !isRow(node) ? node : null;
        if (!parent || !cell || myIndex < 0) {
            return null;
        }
        if (cell.inline) {
            return {
                left: 0,
                right: 0,
            };
        }
        return {
            left: myIndex > 0
                ? ((_c = (_b = parent.cells[myIndex - 1]) === null || _b === void 0 ? void 0 : _b.size) !== null && _c !== void 0 ? _c : 0) + ((_d = cell.size) !== null && _d !== void 0 ? _d : 0) - 1
                : 0,
            right: myIndex === parent.cells.length - 1
                ? 0
                : ((_e = cell.size) !== null && _e !== void 0 ? _e : 0) - 1 + ((_g = (_f = parent.cells[myIndex + 1]) === null || _f === void 0 ? void 0 : _f.size) !== null && _g !== void 0 ? _g : 0),
        };
    });
};
/**
 *
 * @param nodeId a node id
 * @returns an array of nodeIds that are direct children of the given node
 */
export var useNodeChildrenIds = function (nodeId) {
    return useNodeProps(nodeId, function (node) {
        var _a, _b, _c, _d;
        return isRow(node)
            ? (_b = (_a = node === null || node === void 0 ? void 0 : node.cells) === null || _a === void 0 ? void 0 : _a.map(function (c) { return c.id; })) !== null && _b !== void 0 ? _b : []
            : (_d = (_c = node === null || node === void 0 ? void 0 : node.rows) === null || _c === void 0 ? void 0 : _c.map(function (r) { return r.id; })) !== null && _d !== void 0 ? _d : [];
    });
};
/**
 *
 * @param nodeId a node id
 * @returns true if node has children
 */
export var useNodeHasChildren = function (nodeId) {
    return useNodeProps(nodeId, function (node) {
        var _a, _b, _c, _d, _e;
        return isRow(node)
            ? (_b = ((_a = node.cells) === null || _a === void 0 ? void 0 : _a.length) > 0) !== null && _b !== void 0 ? _b : false
            : (_e = ((_d = (_c = node === null || node === void 0 ? void 0 : node.rows) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0) > 0) !== null && _e !== void 0 ? _e : false;
    });
};
/**
 *
 * @param nodeId an id of a cell
 * @returns true if this cell has a configured plugin. It does not check if this plugin exists (in @see Options)
 */
export var useCellHasPlugin = function (nodeId) {
    return useCellProps(nodeId, function (c) { return Boolean(c === null || c === void 0 ? void 0 : c.plugin); });
};
/**
 * @param parentNodeId the parent node id, or null if its the root
 * @returns all configured CellPlugin that are allowed in the given parentCellId
 */
export var useAllCellPluginsForNode = function (parentNodeId) {
    if (parentNodeId === void 0) { parentNodeId = null; }
    var currentLang = useLang();
    var ancestors = useNodeProps(parentNodeId, function (node, ancestors) {
        return __spreadArray([node], __read(ancestors), false).reverse().map(function (a) {
            var _a;
            return {
                pluginId: !a || isRow(a) ? null : (_a = a.plugin) === null || _a === void 0 ? void 0 : _a.id,
                data: !a || isRow(a) ? null : getCellData(a, currentLang),
            };
        });
    });
    // pluginIdsOfAncestors is an array of ids, the last one is the
    var rootCellPlugins = useRenderOption('cellPlugins');
    return useMemo(function () {
        return getAvailablePlugins(rootCellPlugins, ancestors);
    }, [rootCellPlugins, ancestors]);
};
export var useCellIsAllowedHere = function (nodeId) {
    var availablePlugins = useAllCellPluginsForNode(nodeId);
    return useCallback(function (item) {
        var _a, _b, _c, _d;
        if (!(item === null || item === void 0 ? void 0 : item.cell)) {
            return false;
        }
        var itemPluginId = typeof ((_a = item.cell) === null || _a === void 0 ? void 0 : _a.plugin) === 'string'
            ? item.cell.plugin
            : (_c = (_b = item.cell) === null || _b === void 0 ? void 0 : _b.plugin) === null || _c === void 0 ? void 0 : _c.id;
        var allowed = !((_d = item.cell) === null || _d === void 0 ? void 0 : _d.plugin) ||
            availablePlugins.some(function (p) { return p.id === itemPluginId; });
        return allowed;
    }, [availablePlugins]);
};
/**
 * Use this function to get the plugin of a cell.
 * @param nodeId an id of a cell
 * @returns the plugin of the given cell
 *
 */
export var usePluginOfCell = function (nodeId) {
    var _a, _b;
    var _c = (_a = useCellProps(nodeId, function (c, ancestors) {
        var _a, _b;
        return ({
            pluginId: (_a = c === null || c === void 0 ? void 0 : c.plugin) === null || _a === void 0 ? void 0 : _a.id,
            parentNodeId: (_b = ancestors === null || ancestors === void 0 ? void 0 : ancestors[0]) === null || _b === void 0 ? void 0 : _b.id,
        });
    })) !== null && _a !== void 0 ? _a : {}, pluginId = _c.pluginId, parentNodeId = _c.parentNodeId;
    var plugins = useAllCellPluginsForNode(parentNodeId);
    return (_b = plugins.find(function (p) { return p.id === pluginId; })) !== null && _b !== void 0 ? _b : null;
};
/**
 *
 * @param nodeId a cell id
 * @returns the raw localized data of the cell
 */
export var useCellDataI18nRaw = function (nodeId) {
    return useCellProps(nodeId, function (c) { return c === null || c === void 0 ? void 0 : c.dataI18n; });
};
/**
 *
 * @param nodeId a cell id
 * @param lang a language key
 * @returns the data object in the given language of the given cell
 */
export var useCellData = function (nodeId, lang) {
    var currentLang = useLang();
    var theLang = lang !== null && lang !== void 0 ? lang : currentLang;
    return useCellProps(nodeId, function (c) { var _a; return (_a = getCellData(c, theLang)) !== null && _a !== void 0 ? _a : {}; });
};
/**
 *returns style and classname of a cell's inner div
 * @param nodeId a cell id
 * @param lang a language key (optionally)
 * @returns the data object in the given language of the given cell
 */
export var useCellInnerDivStylingProps = function (nodeId, lang) {
    var _a;
    var plugin = usePluginOfCell(nodeId);
    var currentLang = useLang();
    var theLang = lang !== null && lang !== void 0 ? lang : currentLang;
    return ((_a = useCellProps(nodeId, function (c) {
        var data = getCellData(c, theLang);
        return getCellInnerDivStylingProps(c, plugin, data);
    })) !== null && _a !== void 0 ? _a : {});
};
/**
 *
 * @returns [data, onChangeData] pair, with setData debouncing the propagation
 * also data is always partially updated
 * @param nodeId the id of a cell
 */
export var useDebouncedCellData = function (nodeId) {
    var cellData = useCellData(nodeId);
    var _a = __read(useState(cellData), 2), setData = _a[1];
    var dataRef = useRef(cellData);
    var currentLang = useLang();
    var cellDataRef = useRef(cellData);
    var updateCellDataImmediate = useUpdateCellData(nodeId);
    var updateCellDataDebounced = useCallback(debounce(function (options) {
        cellDataRef.current = dataRef.current;
        updateCellDataImmediate(dataRef.current, options);
    }, 200), [updateCellDataImmediate]);
    var changed = useMemo(function () { return !deepEquals(cellData, cellDataRef.current); }, [cellData]);
    useEffect(function () {
        // changed from "outside" overwrite whatever is pending
        if (changed) {
            cellDataRef.current = cellData;
            dataRef.current = cellData;
            setData(cellData);
        }
    }, [changed, cellData]);
    var onChange = useCallback(function (partialData, options) {
        // special handling if non default language is changed (special custom code)
        if ((options === null || options === void 0 ? void 0 : options.lang) && options.lang !== currentLang) {
            // this hook is a bit hacky, because we keep around state of changes and debounce changes
            // its probably not the cleanest solution
            // however this handling is problematic, if you change any other language.
            // this is rarely used and only in custom code
            // however, we don't need the debouncing if other languages are changed, because they are not visible anyway and do not feed back into this component
            updateCellDataImmediate(partialData, options);
        }
        else {
            dataRef.current = __assign(__assign({}, dataRef.current), partialData);
            setData(dataRef.current);
            updateCellDataDebounced(options);
        }
    }, [updateCellDataDebounced, updateCellDataImmediate, setData, currentLang]);
    return [dataRef.current, onChange];
};
//# sourceMappingURL=node.js.map