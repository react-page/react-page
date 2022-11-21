import type { SlateComponentPluginDefinition } from '../types/slatePluginDefinitions';
import type { HtmlBlockData } from './createSimpleHtmlBlockPlugin';
export type HeadingsDef<T> = {
    level: 1 | 2 | 3 | 4 | 5 | 6;
} & Pick<SlateComponentPluginDefinition<HtmlBlockData<T>>, 'type' | 'getInitialData' | 'icon'>;
declare function createHeadingsPlugin<T = {}>(def: HeadingsDef<T>): {
    <CT extends Record<string, unknown> = HtmlBlockData<T>>(customize?: (t: SlateComponentPluginDefinition<HtmlBlockData<T>>) => SlateComponentPluginDefinition<CT>): {
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
                                            toPlugin(): import("../types/SlatePlugin").SlatePlugin;
                                        };
                                        toPlugin(): import("../types/SlatePlugin").SlatePlugin;
                                    };
                                    toPlugin(): import("../types/SlatePlugin").SlatePlugin;
                                };
                                toPlugin(): import("../types/SlatePlugin").SlatePlugin;
                            };
                            toPlugin(): import("../types/SlatePlugin").SlatePlugin;
                        };
                        toPlugin(): import("../types/SlatePlugin").SlatePlugin;
                    };
                    toPlugin(): import("../types/SlatePlugin").SlatePlugin;
                };
                toPlugin(): import("../types/SlatePlugin").SlatePlugin;
            };
            toPlugin(): import("../types/SlatePlugin").SlatePlugin;
        };
        toPlugin(): import("../types/SlatePlugin").SlatePlugin;
    };
    toPlugin(): import("../types/SlatePlugin").SlatePlugin;
};
export default createHeadingsPlugin;
//# sourceMappingURL=createHeadingsPlugin.d.ts.map