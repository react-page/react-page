import type { ValueWithLegacy } from '../..';
import type { Cell, Value, Row } from '../types/node';
import { getChildCellPlugins } from '../utils/getAvailablePlugins';
import { getCellData } from '../utils/getCellData';
import { removeUndefinedProps } from '../utils/removeUndefinedProps';

import EDITABLE_MIGRATIONS from './EDITABLE_MIGRATIONS';
import type { Migration, MigrationContext } from './Migration';
import { sanitizeVersion } from './Migration';

export type MigrationVersion = number | string;
export const migrate = <TOut>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataIn: any,
  migrations: Migration[],
  versionIn: MigrationVersion = 0,
  context: MigrationContext
): TOut => {
  //console.log('----------');
  //console.log('versionin ' + versionIn);
  let data = dataIn;

  let currentDataVersion = sanitizeVersion(versionIn);

  //console.log('migrate', versionIn);
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const migrationToRun = migrations?.find(
      (m) =>
        m.fromVersion <= currentDataVersion && m.toVersion > currentDataVersion
    );

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

const migratePluginDataForRow = (r: Row, context: MigrationContext): Row => {
  return {
    ...r,
    cells: r.cells.map((c) => migratePluginDataForCell(c, context)),
  };
};
const migratePluginDataForCell = (
  c: Cell,
  { lang, cellPlugins }: MigrationContext
): Cell => {
  const pluginDef = c.plugin;
  const pluginFound = pluginDef
    ? cellPlugins.find((p) => p.id === pluginDef.id)
    : null;

  const versionMismatch =
    pluginDef && pluginFound && pluginDef.version !== pluginFound.version;

  const transformData = (dataIn: unknown) => {
    const data = versionMismatch
      ? migrate(dataIn, pluginFound.migrations, pluginDef.version, {
          lang,
          cellPlugins,
        })
      : dataIn;

    return pluginFound?.unserialize ? pluginFound.unserialize(data) : data;
  };
  const dataI18n = c.dataI18n
    ? Object.keys(c.dataI18n).reduce(
        (acc, l) => ({
          ...acc,
          [l]: transformData(c.dataI18n?.[l]),
        }),
        {}
      )
    : undefined;

  const plugin = pluginFound
    ? {
        id: pluginFound.id,
        version: pluginFound.version,
      }
    : c.plugin; // keep c.plugin in case of not found, that will show an error

  // because plugins can define different child plugins,
  // we have to use these for proper migration
  const childCellPlugins = getChildCellPlugins(cellPlugins, {
    data: getCellData({ ...c, dataI18n }, lang),
    pluginId: plugin?.id,
  });
  return removeUndefinedProps({
    ...c,
    plugin,
    dataI18n,
    rows: c.rows?.map((r) =>
      migratePluginDataForRow(r, {
        lang,
        cellPlugins: childCellPlugins,
      })
    ),
  });
};

const migratePluginData = (editable: Value, context: MigrationContext) => {
  return {
    ...editable,
    rows: editable.rows.map((r) => migratePluginDataForRow(r, context)),
  };
};

export const migrateValue = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataIn: { version?: number } & ValueWithLegacy,
  context: MigrationContext
): Value => {
  if (!dataIn) {
    return null;
  }
  const versionIn = dataIn?.version;
  const newestVersion =
    EDITABLE_MIGRATIONS[EDITABLE_MIGRATIONS.length - 1].toVersion;
  const data = migrate<Value>(dataIn, EDITABLE_MIGRATIONS, versionIn, context);

  const migrated = {
    ...migratePluginData(data, context),
    version: newestVersion,
  };
  return migrated;
};
