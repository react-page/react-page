import type { CellPluginList } from '../types/plugins';
import type { MigrationVersion } from './migrate';

export type MigrationContext = {
  cellPlugins: CellPluginList;
  lang: string;
};
interface MigrationConfig<TIn, TOut> {
  toVersion: MigrationVersion;
  fromVersion?: MigrationVersion;

  /**@deprecated use fromVersion instead */
  fromVersionRange?: MigrationVersion;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  migrate: (state: TIn, context: MigrationContext) => TOut;
}

export const sanitizeVersion = (version?: MigrationVersion) => {
  if (!version) return 0;
  // string versions are deprecated
  if (typeof version === 'string') {
    const [major, minor, patch] = version
      .replace(/\^|\*/g, '')
      .split('.')
      .map(Number);

    return major + minor * 0.01 + patch * 0.01 * 0.01;
  } else return version;
};

/**
 * @class the class used to migrate plugin content between toVersion
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class Migration<TIn = any, TOut = TIn> {
  toVersion: number;
  fromVersion: number;
  migrate: (state: TIn, context: MigrationContext) => TOut;
  constructor(config: MigrationConfig<TIn, TOut>) {
    const {
      toVersion,
      migrate,
      fromVersion: fromVersionOrg,
      fromVersionRange,
    } = config;
    const fromVersion = fromVersionOrg ?? fromVersionRange; // just for backwards compatibility

    this.toVersion = sanitizeVersion(toVersion);
    this.migrate = migrate;
    this.fromVersion = sanitizeVersion(fromVersion);
  }
}
