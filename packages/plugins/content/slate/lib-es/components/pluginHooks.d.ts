import type { DependencyList } from 'react';
import type { SlatePlugin } from '../types/SlatePlugin';
import type { SlateComponentPluginDefinition } from '../types/slatePluginDefinitions';
export declare const useComponentNodePlugins: ({ plugins }: {
    plugins: SlatePlugin[];
}, deps: DependencyList) => SlateComponentPluginDefinition<any>[];
export declare const useComponentMarkPlugins: ({ plugins }: {
    plugins: SlatePlugin[];
}, deps: DependencyList) => SlateComponentPluginDefinition<any>[];
//# sourceMappingURL=pluginHooks.d.ts.map