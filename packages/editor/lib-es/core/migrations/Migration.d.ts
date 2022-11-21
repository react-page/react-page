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
    migrate: (state: TIn, context: MigrationContext) => TOut;
}
export declare const sanitizeVersion: (version?: MigrationVersion) => number;
/**
 * @class the class used to migrate plugin content between toVersion
 */
export declare class Migration<TIn = any, TOut = TIn> {
    toVersion: number;
    fromVersion: number;
    migrate: (state: TIn, context: MigrationContext) => TOut;
    constructor(config: MigrationConfig<TIn, TOut>);
}
export {};
//# sourceMappingURL=Migration.d.ts.map