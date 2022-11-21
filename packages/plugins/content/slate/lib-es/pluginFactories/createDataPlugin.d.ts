import type { SlatePlugin } from '../types/SlatePlugin';
import type { SlateDataPluginDefinition } from '../types/slatePluginDefinitions';
declare function createDataPlugin<T extends Record<string, unknown>>(def: SlateDataPluginDefinition<T>): {
    <CT>(customize?: (t: SlateDataPluginDefinition<T>) => SlateDataPluginDefinition<T & CT>): {
        <CT_1>(customize?: (t: SlateDataPluginDefinition<T & CT>) => SlateDataPluginDefinition<T & CT & CT_1>): {
            <CT_2>(customize?: (t: SlateDataPluginDefinition<T & CT & CT_1>) => SlateDataPluginDefinition<T & CT & CT_1 & CT_2>): {
                <CT_3>(customize?: (t: SlateDataPluginDefinition<T & CT & CT_1 & CT_2>) => SlateDataPluginDefinition<T & CT & CT_1 & CT_2 & CT_3>): {
                    <CT_4>(customize?: (t: SlateDataPluginDefinition<T & CT & CT_1 & CT_2 & CT_3>) => SlateDataPluginDefinition<T & CT & CT_1 & CT_2 & CT_3 & CT_4>): {
                        <CT_5>(customize?: (t: SlateDataPluginDefinition<T & CT & CT_1 & CT_2 & CT_3 & CT_4>) => SlateDataPluginDefinition<T & CT & CT_1 & CT_2 & CT_3 & CT_4 & CT_5>): {
                            <CT_6>(customize?: (t: SlateDataPluginDefinition<T & CT & CT_1 & CT_2 & CT_3 & CT_4 & CT_5>) => SlateDataPluginDefinition<T & CT & CT_1 & CT_2 & CT_3 & CT_4 & CT_5 & CT_6>): {
                                <CT_7>(customize?: (t: SlateDataPluginDefinition<T & CT & CT_1 & CT_2 & CT_3 & CT_4 & CT_5 & CT_6>) => SlateDataPluginDefinition<T & CT & CT_1 & CT_2 & CT_3 & CT_4 & CT_5 & CT_6 & CT_7>): {
                                    <CT_8>(customize?: (t: SlateDataPluginDefinition<T & CT & CT_1 & CT_2 & CT_3 & CT_4 & CT_5 & CT_6 & CT_7>) => SlateDataPluginDefinition<T & CT & CT_1 & CT_2 & CT_3 & CT_4 & CT_5 & CT_6 & CT_7 & CT_8>): {
                                        <CT_9>(customize?: (t: SlateDataPluginDefinition<T & CT & CT_1 & CT_2 & CT_3 & CT_4 & CT_5 & CT_6 & CT_7 & CT_8>) => SlateDataPluginDefinition<T & CT & CT_1 & CT_2 & CT_3 & CT_4 & CT_5 & CT_6 & CT_7 & CT_8 & CT_9>): {
                                            <CT_10>(customize?: (t: SlateDataPluginDefinition<T & CT & CT_1 & CT_2 & CT_3 & CT_4 & CT_5 & CT_6 & CT_7 & CT_8 & CT_9>) => SlateDataPluginDefinition<T & CT & CT_1 & CT_2 & CT_3 & CT_4 & CT_5 & CT_6 & CT_7 & CT_8 & CT_9 & CT_10>): any;
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
export default createDataPlugin;
//# sourceMappingURL=createDataPlugin.d.ts.map