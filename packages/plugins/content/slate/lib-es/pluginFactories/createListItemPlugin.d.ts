/// <reference types="react" />
type ListItemDef = {
    type: string;
    tagName: keyof JSX.IntrinsicElements;
};
export default function <T>(def: ListItemDef): {
    <CT extends Record<string, unknown> = import("./createSimpleHtmlBlockPlugin").HtmlBlockData<T>>(customize?: (t: import("../types/slatePluginDefinitions").SlateComponentPluginDefinition<import("./createSimpleHtmlBlockPlugin").HtmlBlockData<T>>) => import("../types/slatePluginDefinitions").SlateComponentPluginDefinition<CT>): {
        <CT_1 extends Record<string, unknown> = CT>(customize?: (t: import("../types/slatePluginDefinitions").SlateComponentPluginDefinition<CT>) => import("../types/slatePluginDefinitions").SlateComponentPluginDefinition<CT_1>): {
            <CT_2 extends Record<string, unknown> = CT_1>(customize?: (t: import("../types/slatePluginDefinitions").SlateComponentPluginDefinition<CT_1>) => import("../types/slatePluginDefinitions").SlateComponentPluginDefinition<CT_2>): {
                <CT_3 extends Record<string, unknown> = CT_2>(customize?: (t: import("../types/slatePluginDefinitions").SlateComponentPluginDefinition<CT_2>) => import("../types/slatePluginDefinitions").SlateComponentPluginDefinition<CT_3>): {
                    <CT_4 extends Record<string, unknown> = CT_3>(customize?: (t: import("../types/slatePluginDefinitions").SlateComponentPluginDefinition<CT_3>) => import("../types/slatePluginDefinitions").SlateComponentPluginDefinition<CT_4>): {
                        <CT_5 extends Record<string, unknown> = CT_4>(customize?: (t: import("../types/slatePluginDefinitions").SlateComponentPluginDefinition<CT_4>) => import("../types/slatePluginDefinitions").SlateComponentPluginDefinition<CT_5>): {
                            <CT_6 extends Record<string, unknown> = CT_5>(customize?: (t: import("../types/slatePluginDefinitions").SlateComponentPluginDefinition<CT_5>) => import("../types/slatePluginDefinitions").SlateComponentPluginDefinition<CT_6>): {
                                <CT_7 extends Record<string, unknown> = CT_6>(customize?: (t: import("../types/slatePluginDefinitions").SlateComponentPluginDefinition<CT_6>) => import("../types/slatePluginDefinitions").SlateComponentPluginDefinition<CT_7>): {
                                    <CT_8 extends Record<string, unknown> = CT_7>(customize?: (t: import("../types/slatePluginDefinitions").SlateComponentPluginDefinition<CT_7>) => import("../types/slatePluginDefinitions").SlateComponentPluginDefinition<CT_8>): {
                                        <CT_9 extends Record<string, unknown> = CT_8>(customize?: (t: import("../types/slatePluginDefinitions").SlateComponentPluginDefinition<CT_8>) => import("../types/slatePluginDefinitions").SlateComponentPluginDefinition<CT_9>): {
                                            <CT_10 extends Record<string, unknown> = CT_9>(customize?: (t: import("../types/slatePluginDefinitions").SlateComponentPluginDefinition<CT_9>) => import("../types/slatePluginDefinitions").SlateComponentPluginDefinition<CT_10>): any;
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
export {};
//# sourceMappingURL=createListItemPlugin.d.ts.map