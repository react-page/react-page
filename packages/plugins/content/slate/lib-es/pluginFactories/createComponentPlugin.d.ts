import type { SlatePlugin } from '../types/SlatePlugin';
import type { SlateComponentPluginDefinition } from '../types/slatePluginDefinitions';
declare function createComponentPlugin<T extends Record<string, unknown>>(def: SlateComponentPluginDefinition<T>): {
    <CT extends Record<string, unknown> = T>(customize?: (t: SlateComponentPluginDefinition<T>) => SlateComponentPluginDefinition<CT>): {
        <CT_1 extends Record<string, unknown> = CT>(customize?: (t: SlateComponentPluginDefinition<CT>) => SlateComponentPluginDefinition<CT_1>): {
            <CT_2 extends Record<string, unknown> = CT_1>(customize?: (t: SlateComponentPluginDefinition<CT_1>) => SlateComponentPluginDefinition<CT_2>): {
                <CT_3 extends Record<string, unknown> = CT_2>(customize?: (t: SlateComponentPluginDefinition<CT_2>) => SlateComponentPluginDefinition<CT_3>): {
                    <CT_4 extends Record<string, unknown> = CT_3>(customize?: (t: SlateComponentPluginDefinition<CT_3>) => SlateComponentPluginDefinition<CT_4>): {
                        <CT_5 extends Record<string, unknown> = CT_4>(customize?: (t: SlateComponentPluginDefinition<CT_4>) => SlateComponentPluginDefinition<CT_5>): {
                            <CT_6 extends Record<string, unknown> = CT_5>(customize?: (t: SlateComponentPluginDefinition<CT_5>) => SlateComponentPluginDefinition<CT_6>): {
                                <CT_7 extends Record<string, unknown> = CT_6>(customize?: (t: SlateComponentPluginDefinition<CT_6>) => SlateComponentPluginDefinition<CT_7>): {
                                    <CT_8 extends Record<string, unknown> = CT_7>(customize?: (t: SlateComponentPluginDefinition<CT_7>) => SlateComponentPluginDefinition<CT_8>): {
                                        <CT_9 extends Record<string, unknown> = CT_8>(customize?: (t: SlateComponentPluginDefinition<CT_8>) => SlateComponentPluginDefinition<CT_9>): {
                                            <CT_10 extends Record<string, unknown> = CT_9>(customize?: (t: SlateComponentPluginDefinition<CT_9>) => SlateComponentPluginDefinition<CT_10>): any;
                                            toPlugin(): SlatePlugin;
                                        };
                                        toPlugin(): SlatePlugin;
                                    };
                                    toPlugin(): SlatePlugin;
                                };
                                toPlugin(): SlatePlugin;
                            };
                            toPlugin(): SlatePlugin;
                        };
                        toPlugin(): SlatePlugin;
                    };
                    toPlugin(): SlatePlugin;
                };
                toPlugin(): SlatePlugin;
            };
            toPlugin(): SlatePlugin;
        };
        toPlugin(): SlatePlugin;
    };
    toPlugin(): SlatePlugin;
};
export default createComponentPlugin;
//# sourceMappingURL=createComponentPlugin.d.ts.map