import { version } from 'react';
import semver from 'semver';
import { Cell, EditableType, Row } from '../types/editable';

import EDITABLE_MIGRATIONS from './EDITABLE_MIGRATIONS';
import { Migration, MigrationContext } from './Migration';

export const migrate = <TOut>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataIn: any,
  allMigrations: Migration[],
  versionIn = '0.0.0',
  context: MigrationContext
): TOut => {
  //console.log('----------');
  //console.log('versionin ' + versionIn);
  let data = dataIn;
  if (semver.valid(versionIn) === null) {
    return data;
  }
  let currentDataVersion = versionIn;
  let migrations = allMigrations;
  //console.log('migrate', versionIn);
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const migration = migrations.find((m) =>
      semver.satisfies(currentDataVersion, m.fromVersionRange)
    );

    migrations = migrations.filter(
      (m) => !semver.satisfies(currentDataVersion, m.fromVersionRange)
    );
    if (!migration) {
      //console.log('no migreation, break');
      // We assume all migrations necessary for the current version of plugin to work are provided
      // Therefore if we don't find any, that means we are done and state is up to date
      break;
    }
    currentDataVersion = migration.toVersion;
    //console.log('!! do migrate to ' + currentDataVersion);
    data = migration.migrate(data, context);
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
      : {};
    return {
      ...c,
      plugin: pluginFound
        ? {
            id: pluginFound.id,
            version: pluginFound.version,
          }
        : null,
      rows: c.rows?.map(migrateRowData) ?? [],
      dataI18n,
    };
  };

  return {
    ...editable,
    cells: editable.cells.map(migrateCellData),
  };
};

export const migrateEditable = (
  dataIn: { version?: string } & unknown,
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
  return {
    ...migratePluginData(data, context),
    version: newestVersion,
  };
};
