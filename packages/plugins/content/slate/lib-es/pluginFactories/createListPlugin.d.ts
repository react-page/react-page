import type { CSSProperties } from 'react';
import type { SlatePlugin } from '../types/SlatePlugin';
import type { SlateComponentPluginDefinition } from '../types/slatePluginDefinitions';
import type { HtmlBlockData } from './createSimpleHtmlBlockPlugin';
type ListDef = {
    type: string;
    icon?: JSX.Element;
    label?: string;
    hotKey?: string;
    tagName: keyof JSX.IntrinsicElements;
    noButton?: boolean;
    getStyle?: () => CSSProperties;
    listItem?: {
        type: string;
        tagName: keyof JSX.IntrinsicElements;
    };
};
type ListItemDef<T> = SlateComponentPluginDefinition<HtmlBlockData<T>>;
type CustomizeFunction<T, CT> = (def: ListItemDef<T>) => ListItemDef<CT & T>;
type ListCustomizers<T, CT> = {
    customizeList?: CustomizeFunction<T, CT>;
    customizeListItem?: CustomizeFunction<T, CT>;
};
declare function createListPlugin<T = {}>(defRaw: ListDef): {
    <CT>(customizers: ListCustomizers<T, CT>): {
        <CT_1>(customizers: ListCustomizers<unknown, CT_1>): any;
        toPlugin(): SlatePlugin[];
    };
    toPlugin(): SlatePlugin[];
};
export default createListPlugin;
//# sourceMappingURL=createListPlugin.d.ts.map