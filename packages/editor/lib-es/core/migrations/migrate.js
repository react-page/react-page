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
import { getChildCellPlugins } from '../utils/getAvailablePlugins';
import { getCellData } from '../utils/getCellData';
import { removeUndefinedProps } from '../utils/removeUndefinedProps';
import EDITABLE_MIGRATIONS from './EDITABLE_MIGRATIONS';
import { sanitizeVersion } from './Migration';
export var migrate = function (
// eslint-disable-next-line @typescript-eslint/no-explicit-any
dataIn, migrations, versionIn, context) {
    if (versionIn === void 0) { versionIn = 0; }
    //console.log('----------');
    //console.log('versionin ' + versionIn);
    var data = dataIn;
    var currentDataVersion = sanitizeVersion(versionIn);
    //console.log('migrate', versionIn);
    // eslint-disable-next-line no-constant-condition
    while (true) {
        var migrationToRun = migrations === null || migrations === void 0 ? void 0 : migrations.find(function (m) {
            return m.fromVersion <= currentDataVersion && m.toVersion > currentDataVersion;
        });
        if (!migrationToRun) {
            // We assume all migrations necessary for the current version of plugin to work are provided
            // Therefore if we don't find any, that means we are done and state is up to date
            break;
        }
        currentDataVersion = migrationToRun.toVersion;
        //console.log('!! do migrate to ' + currentDataVersion);
        data = migrationToRun.migrate(data, context);
    }
    //console.log('----------');
    return data;
};
var migratePluginDataForRow = function (r, context) {
    return __assign(__assign({}, r), { cells: r.cells.map(function (c) { return migratePluginDataForCell(c, context); }) });
};
var migratePluginDataForCell = function (c, _a) {
    var _b;
    var lang = _a.lang, cellPlugins = _a.cellPlugins;
    var pluginDef = c.plugin;
    var pluginFound = pluginDef
        ? cellPlugins.find(function (p) { return p.id === pluginDef.id; })
        : null;
    var versionMismatch = pluginDef && pluginFound && pluginDef.version !== pluginFound.version;
    var transformData = function (dataIn) {
        var data = versionMismatch
            ? migrate(dataIn, pluginFound.migrations, pluginDef.version, {
                lang: lang,
                cellPlugins: cellPlugins,
            })
            : dataIn;
        return (pluginFound === null || pluginFound === void 0 ? void 0 : pluginFound.unserialize) ? pluginFound.unserialize(data) : data;
    };
    var dataI18n = c.dataI18n
        ? Object.keys(c.dataI18n).reduce(function (acc, l) {
            var _a;
            var _b;
            return (__assign(__assign({}, acc), (_a = {}, _a[l] = transformData((_b = c.dataI18n) === null || _b === void 0 ? void 0 : _b[l]), _a)));
        }, {})
        : undefined;
    var plugin = pluginFound
        ? {
            id: pluginFound.id,
            version: pluginFound.version,
        }
        : c.plugin; // keep c.plugin in case of not found, that will show an error
    // because plugins can define different child plugins,
    // we have to use these for proper migration
    var childCellPlugins = getChildCellPlugins(cellPlugins, {
        data: getCellData(__assign(__assign({}, c), { dataI18n: dataI18n }), lang),
        pluginId: plugin === null || plugin === void 0 ? void 0 : plugin.id,
    });
    return removeUndefinedProps(__assign(__assign({}, c), { plugin: plugin, dataI18n: dataI18n, rows: (_b = c.rows) === null || _b === void 0 ? void 0 : _b.map(function (r) {
            return migratePluginDataForRow(r, {
                lang: lang,
                cellPlugins: childCellPlugins,
            });
        }) }));
};
var migratePluginData = function (editable, context) {
    return __assign(__assign({}, editable), { rows: editable.rows.map(function (r) { return migratePluginDataForRow(r, context); }) });
};
export var migrateValue = function (
// eslint-disable-next-line @typescript-eslint/no-explicit-any
dataIn, context) {
    if (!dataIn) {
        return null;
    }
    var versionIn = dataIn === null || dataIn === void 0 ? void 0 : dataIn.version;
    var newestVersion = EDITABLE_MIGRATIONS[EDITABLE_MIGRATIONS.length - 1].toVersion;
    var data = migrate(dataIn, EDITABLE_MIGRATIONS, versionIn, context);
    var migrated = __assign(__assign({}, migratePluginData(data, context)), { version: newestVersion });
    return migrated;
};
//# sourceMappingURL=migrate.js.map