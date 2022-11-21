import type { SlatePluginDefinition } from './slatePluginDefinitions';
export type SlatePlugin = SlatePluginDefinition<any>;
export type SlatePluginOrListOfPlugins = SlatePlugin | SlatePlugin[];
export type SlatePluginOrFactory = {
    toPlugin: () => SlatePluginOrListOfPlugins;
} | SlatePluginOrListOfPlugins;
export type SlatePluginCollection = {
    [group: string]: {
        [key: string]: SlatePluginOrFactory;
    };
};
//# sourceMappingURL=SlatePlugin.d.ts.map