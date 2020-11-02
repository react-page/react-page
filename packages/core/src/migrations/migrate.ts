import { Cell, EditableType, Row } from '../types/editable';
import { removeUndefinedProps } from '../utils/removeUndefinedProps';

import EDITABLE_MIGRATIONS from './EDITABLE_MIGRATIONS';
import { Migration, MigrationContext, sanitizeVersion } from './Migration';

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

const migratePluginData = (
  editable: EditableType,
  context: MigrationContext
) => {
  const migrateRowData = (r: Row): Row => {
    return {
      ...r,
      cells: r.cells.map(migrateCellData),
    };
  };
  const migrateCellData = (c: Cell): Cell => {
    const pluginDef = c.plugin;
    const pluginFound = pluginDef
      ? context.plugins.find((p) => p.id === pluginDef.id)
      : null;

    const versionMismatch =
      pluginDef && pluginFound && pluginDef.version !== pluginFound.version;

    const transformData = (dataIn: unknown) => {
      const data = versionMismatch
        ? migrate(dataIn, pluginFound.migrations, pluginDef.version, context)
        : dataIn;

      return pluginFound?.unserialize ? pluginFound.unserialize(data) : data;
    };
    const dataI18n = c.dataI18n
      ? Object.keys(c.dataI18n).reduce(
          (acc, lang) => ({
            ...acc,
            [lang]: transformData(c.dataI18n?.[lang]),
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
    return removeUndefinedProps({
      ...c,
      plugin,
      dataI18n,
      rows: c.rows?.map(migrateRowData),
    });
  };

  return {
    ...editable,
    rows: editable.rows.map(migrateRowData),
  };
};

export const migrateEditable = (
  dataIn: { version?: number } & any,
  context: MigrationContext
) => {
  const versionIn = dataIn?.version;
  const newestVersion =
    EDITABLE_MIGRATIONS[EDITABLE_MIGRATIONS.length - 1].toVersion;
  const data = migrate<EditableType>(
    dataIn,
    EDITABLE_MIGRATIONS,
    versionIn,
    context
  );
  const migrated = {
    ...migratePluginData(data, context),
    version: newestVersion,
  };
  return migrated;
};
