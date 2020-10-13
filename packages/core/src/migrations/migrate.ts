// TODO: get rid of this class
import { version } from 'react';
import semver from 'semver';
import { Cell, EditableType, PluginBase, Row } from '..';

import EDITABLE_MIGRATIONS from './EDITABLE_MIGRATIONS';
import { Migration } from './Migration';

export const migrate = <TOut>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataIn: any,
  allMigrations: Migration[],
  versionIn = '0.0.0'
): TOut => {
  let data = dataIn;
  if (semver.valid(versionIn) === null) {
    return data;
  }
  let currentDataVersion = versionIn;
  let migrations = allMigrations;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const migration = migrations.find((m) =>
      semver.satisfies(currentDataVersion, m.fromVersionRange)
    );
    migrations = migrations.filter(
      (m) => !semver.satisfies(currentDataVersion, m.fromVersionRange)
    );
    if (!migration) {
      // We assume all migrations necessary for the current version of plugin to work are provided
      // Therefore if we don't find any, that means we are done and state is up to date
      break;
    }
    currentDataVersion = migration.toVersion;
    data = migration.migrate(data);
  }

  return data;
};

const migratePluginData = (editable: EditableType, plugins: PluginBase[]) => {
  const migrateRowData = (r: Row): Row => {
    return {
      ...r,
      cells: r.cells.map(migrateCellData),
    };
  };
  const migrateCellData = (c: Cell): Cell => {
    const pluginDef = c.plugin;
    const pluginFound = plugins.find((p) => p.id === pluginDef.id);

    const versionMismatch = pluginDef.version !== pluginFound.version;

    const transformData = (dataIn: unknown) => {
      const data = versionMismatch
        ? migrate(dataIn, pluginFound.migrations, pluginDef.version)
        : dataIn;

      return pluginFound.unserialize ? pluginFound.unserialize(data) : data;
    };
    const dataI18n = Object.keys(c.dataI18n).reduce(
      (acc, lang) => ({
        ...acc,
        [lang]: transformData(dataI18n[lang]),
      }),
      {}
    );
    return {
      ...c,
      plugin: {
        ...pluginDef,
        version: pluginFound.version,
      },
      rows: c.rows.map(migrateRowData),
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
  plugins: PluginBase[]
) => {
  const versionIn = dataIn?.version;
  const newestVersion =
    EDITABLE_MIGRATIONS[EDITABLE_MIGRATIONS.length - 1].toVersion;
  const data = migrate<EditableType>(dataIn, EDITABLE_MIGRATIONS, versionIn);

  return {
    ...migratePluginData(data, plugins),
    version: newestVersion,
  };
};
