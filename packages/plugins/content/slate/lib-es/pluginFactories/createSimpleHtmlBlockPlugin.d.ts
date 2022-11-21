/// <reference types="react" />
import type { SlateComponentPluginDefinition } from '../types/slatePluginDefinitions';
type Def<T extends Record<string, unknown>> = Pick<SlateComponentPluginDefinition<HtmlBlockData<T>>, 'type' | 'icon' | 'label' | 'customAdd' | 'customRemove' | 'isDisabled' | 'hotKey' | 'onKeyDown' | 'getInitialData' | 'controls' | 'getStyle'> & {
    replaceWithDefaultOnRemove?: boolean;
    tagName: keyof JSX.IntrinsicElements;
    getData?: (el: HTMLElement) => T | void;
    noButton?: boolean;
};
export type DefaultBlockDataType = {
    align: 'left' | 'right' | 'center' | 'justify';
};
export type HtmlBlockData<T> = T & DefaultBlockDataType;
declare function createSimpleHtmlBlockPlugin<T = {}>(def: Def<HtmlBlockData<T>>): {
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
export default createSimpleHtmlBlockPlugin;
//# sourceMappingURL=createSimpleHtmlBlockPlugin.d.ts.map