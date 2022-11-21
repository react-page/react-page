import type { ValueWithLegacy } from '../..';
import type { Value } from '../types/node';
import type { Migration, MigrationContext } from './Migration';
export type MigrationVersion = number | string;
export declare const migrate: <TOut>(dataIn: any, migrations: Migration[] | undefined, versionIn: MigrationVersion | undefined, context: MigrationContext) => TOut;
export declare const migrateValue: (dataIn: null | ({
    version?: number;
} & ValueWithLegacy), context: MigrationContext) => Value | null;
//# sourceMappingURL=migrate.d.ts.map