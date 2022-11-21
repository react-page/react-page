import React from 'react';
declare const _default: {
    ol: {
        <CT>(customizers: {
            customizeList?: ((def: {
                object: import("../../types/slatePluginDefinitions").SlateNodeObjectType;
            } & import("../../types/slatePluginDefinitions").SlateBasePluginDefinition<import("../../pluginFactories/createSimpleHtmlBlockPlugin").DefaultBlockDataType> & {
                type: string;
                getStyle?: ((data: import("../../pluginFactories/createSimpleHtmlBlockPlugin").DefaultBlockDataType) => React.CSSProperties) | undefined;
                deserialize?: {
                    tagName: string;
                    getData?: ((el: HTMLElement) => void | import("../../pluginFactories/createSimpleHtmlBlockPlugin").DefaultBlockDataType) | undefined;
                } | undefined;
                Component: keyof JSX.IntrinsicElements | React.ComponentType<{
                    attributes?: Record<string, unknown> | undefined;
                    style?: React.CSSProperties | undefined;
                    className?: string | undefined;
                    childNodes: import("slate").Node[];
                    useFocused: () => boolean;
                    useSelected: () => boolean;
                    getTextContents: () => string[];
                    children: React.ReactNode;
                } & import("../../pluginFactories/createSimpleHtmlBlockPlugin").DefaultBlockDataType>;
            } & ({
                object: "block";
                replaceWithDefaultOnRemove?: boolean | undefined;
                isVoid?: boolean | undefined;
            } | {
                object: "inline";
                addExtraSpace?: boolean | undefined;
                isVoid?: boolean | undefined;
            } | {
                object: "mark";
            })) => {
                object: import("../../types/slatePluginDefinitions").SlateNodeObjectType;
            } & import("../../types/slatePluginDefinitions").SlateBasePluginDefinition<import("../../pluginFactories/createSimpleHtmlBlockPlugin").HtmlBlockData<CT & {}>> & {
                type: string;
                getStyle?: ((data: import("../../pluginFactories/createSimpleHtmlBlockPlugin").HtmlBlockData<CT & {}>) => React.CSSProperties) | undefined;
                deserialize?: {
                    tagName: string;
                    getData?: ((el: HTMLElement) => void | import("../../pluginFactories/createSimpleHtmlBlockPlugin").HtmlBlockData<CT & {}>) | undefined;
                } | undefined;
                Component: keyof JSX.IntrinsicElements | React.ComponentType<[{
                    attributes?: Record<string, unknown> | undefined;
                    style?: React.CSSProperties | undefined;
                    className?: string | undefined;
                    childNodes: import("slate").Node[];
                    useFocused: () => boolean;
                    useSelected: () => boolean;
                    getTextContents: () => string[];
                    children: React.ReactNode;
                } & CT & import("../../pluginFactories/createSimpleHtmlBlockPlugin").DefaultBlockDataType][{
                    attributes?: Record<string, unknown> | undefined;
                    style?: React.CSSProperties | undefined;
                    className?: string | undefined;
                    childNodes: import("slate").Node[];
                    useFocused: () => boolean;
                    useSelected: () => boolean;
                    getTextContents: () => string[];
                    children: React.ReactNode;
                } & CT & import("../../pluginFactories/createSimpleHtmlBlockPlugin").DefaultBlockDataType extends infer T ? T extends {
                    attributes?: Record<string, unknown> | undefined;
                    style?: React.CSSProperties | undefined;
                    className?: string | undefined;
                    childNodes: import("slate").Node[];
                    useFocused: () => boolean;
                    useSelected: () => boolean;
                    getTextContents: () => string[];
                    children: React.ReactNode;
                } & CT & import("../../pluginFactories/createSimpleHtmlBlockPlugin").DefaultBlockDataType ? T extends any ? 0 : never : never : never]>;
            } & ({
                object: "block";
                replaceWithDefaultOnRemove?: boolean | undefined;
                isVoid?: boolean | undefined;
            } | {
                object: "inline";
                addExtraSpace?: boolean | undefined;
                isVoid?: boolean | undefined;
            } | {
                object: "mark";
            })) | undefined;
            customizeListItem?: ((def: {
                object: import("../../types/slatePluginDefinitions").SlateNodeObjectType;
            } & import("../../types/slatePluginDefinitions").SlateBasePluginDefinition<import("../../pluginFactories/createSimpleHtmlBlockPlugin").DefaultBlockDataType> & {
                type: string;
                getStyle?: ((data: import("../../pluginFactories/createSimpleHtmlBlockPlugin").DefaultBlockDataType) => React.CSSProperties) | undefined;
                deserialize?: {
                    tagName: string;
                    getData?: ((el: HTMLElement) => void | import("../../pluginFactories/createSimpleHtmlBlockPlugin").DefaultBlockDataType) | undefined;
                } | undefined;
                Component: keyof JSX.IntrinsicElements | React.ComponentType<{
                    attributes?: Record<string, unknown> | undefined;
                    style?: React.CSSProperties | undefined;
                    className?: string | undefined;
                    childNodes: import("slate").Node[];
                    useFocused: () => boolean;
                    useSelected: () => boolean;
                    getTextContents: () => string[];
                    children: React.ReactNode;
                } & import("../../pluginFactories/createSimpleHtmlBlockPlugin").DefaultBlockDataType>;
            } & ({
                object: "block";
                replaceWithDefaultOnRemove?: boolean | undefined;
                isVoid?: boolean | undefined;
            } | {
                object: "inline";
                addExtraSpace?: boolean | undefined;
                isVoid?: boolean | undefined;
            } | {
                object: "mark";
            })) => {
                object: import("../../types/slatePluginDefinitions").SlateNodeObjectType;
            } & import("../../types/slatePluginDefinitions").SlateBasePluginDefinition<import("../../pluginFactories/createSimpleHtmlBlockPlugin").HtmlBlockData<CT & {}>> & {
                type: string;
                getStyle?: ((data: import("../../pluginFactories/createSimpleHtmlBlockPlugin").HtmlBlockData<CT & {}>) => React.CSSProperties) | undefined;
                deserialize?: {
                    tagName: string;
                    getData?: ((el: HTMLElement) => void | import("../../pluginFactories/createSimpleHtmlBlockPlugin").HtmlBlockData<CT & {}>) | undefined;
                } | undefined;
                Component: keyof JSX.IntrinsicElements | React.ComponentType<[{
                    attributes?: Record<string, unknown> | undefined;
                    style?: React.CSSProperties | undefined;
                    className?: string | undefined;
                    childNodes: import("slate").Node[];
                    useFocused: () => boolean;
                    useSelected: () => boolean;
                    getTextContents: () => string[];
                    children: React.ReactNode;
                } & CT & import("../../pluginFactories/createSimpleHtmlBlockPlugin").DefaultBlockDataType][{
                    attributes?: Record<string, unknown> | undefined;
                    style?: React.CSSProperties | undefined;
                    className?: string | undefined;
                    childNodes: import("slate").Node[];
                    useFocused: () => boolean;
                    useSelected: () => boolean;
                    getTextContents: () => string[];
                    children: React.ReactNode;
                } & CT & import("../../pluginFactories/createSimpleHtmlBlockPlugin").DefaultBlockDataType extends infer T ? T extends {
                    attributes?: Record<string, unknown> | undefined;
                    style?: React.CSSProperties | undefined;
                    className?: string | undefined;
                    childNodes: import("slate").Node[];
                    useFocused: () => boolean;
                    useSelected: () => boolean;
                    getTextContents: () => string[];
                    children: React.ReactNode;
                } & CT & import("../../pluginFactories/createSimpleHtmlBlockPlugin").DefaultBlockDataType ? T extends any ? 0 : never : never : never]>;
            } & ({
                object: "block";
                replaceWithDefaultOnRemove?: boolean | undefined;
                isVoid?: boolean | undefined;
            } | {
                object: "inline";
                addExtraSpace?: boolean | undefined;
                isVoid?: boolean | undefined;
            } | {
                object: "mark";
            })) | undefined;
        }): {
            <CT_1>(customizers: {
                customizeList?: ((def: {
                    object: import("../../types/slatePluginDefinitions").SlateNodeObjectType;
                } & import("../../types/slatePluginDefinitions").SlateBasePluginDefinition<import("../../pluginFactories/createSimpleHtmlBlockPlugin").DefaultBlockDataType> & {
                    type: string;
                    getStyle?: ((data: import("../../pluginFactories/createSimpleHtmlBlockPlugin").DefaultBlockDataType) => React.CSSProperties) | undefined;
                    deserialize?: {
                        tagName: string;
                        getData?: ((el: HTMLElement) => void | import("../../pluginFactories/createSimpleHtmlBlockPlugin").DefaultBlockDataType) | undefined;
                    } | undefined;
                    Component: keyof JSX.IntrinsicElements | React.ComponentType<{
                        attributes?: Record<string, unknown> | undefined;
                        style?: React.CSSProperties | undefined;
                        className?: string | undefined;
                        childNodes: import("slate").Node[];
                        useFocused: () => boolean;
                        useSelected: () => boolean;
                        getTextContents: () => string[];
                        children: React.ReactNode;
                    } & import("../../pluginFactories/createSimpleHtmlBlockPlugin").DefaultBlockDataType>;
                } & ({
                    object: "block";
                    replaceWithDefaultOnRemove?: boolean | undefined;
                    isVoid?: boolean | undefined;
                } | {
                    object: "inline";
                    addExtraSpace?: boolean | undefined;
                    isVoid?: boolean | undefined;
                } | {
                    object: "mark";
                })) => {
                    object: import("../../types/slatePluginDefinitions").SlateNodeObjectType;
                } & import("../../types/slatePluginDefinitions").SlateBasePluginDefinition<import("../../pluginFactories/createSimpleHtmlBlockPlugin").HtmlBlockData<CT_1>> & {
                    type: string;
                    getStyle?: ((data: import("../../pluginFactories/createSimpleHtmlBlockPlugin").HtmlBlockData<CT_1>) => React.CSSProperties) | undefined;
                    deserialize?: {
                        tagName: string;
                        getData?: ((el: HTMLElement) => void | import("../../pluginFactories/createSimpleHtmlBlockPlugin").HtmlBlockData<CT_1>) | undefined;
                    } | undefined;
                    Component: keyof JSX.IntrinsicElements | React.ComponentType<[{
                        attributes?: Record<string, unknown> | undefined;
                        style?: React.CSSProperties | undefined;
                        className?: string | undefined;
                        childNodes: import("slate").Node[];
                        useFocused: () => boolean;
                        useSelected: () => boolean;
                        getTextContents: () => string[];
                        children: React.ReactNode;
                    } & CT_1 & import("../../pluginFactories/createSimpleHtmlBlockPlugin").DefaultBlockDataType][{
                        attributes?: Record<string, unknown> | undefined;
                        style?: React.CSSProperties | undefined;
                        className?: string | undefined;
                        childNodes: import("slate").Node[];
                        useFocused: () => boolean;
                        useSelected: () => boolean;
                        getTextContents: () => string[];
                        children: React.ReactNode;
                    } & CT_1 & import("../../pluginFactories/createSimpleHtmlBlockPlugin").DefaultBlockDataType extends infer T_1 ? T_1 extends {
                        attributes?: Record<string, unknown> | undefined;
                        style?: React.CSSProperties | undefined;
                        className?: string | undefined;
                        childNodes: import("slate").Node[];
                        useFocused: () => boolean;
                        useSelected: () => boolean;
                        getTextContents: () => string[];
                        children: React.ReactNode;
                    } & CT_1 & import("../../pluginFactories/createSimpleHtmlBlockPlugin").DefaultBlockDataType ? T_1 extends any ? 0 : never : never : never]>;
                } & ({
                    object: "block";
                    replaceWithDefaultOnRemove?: boolean | undefined;
                    isVoid?: boolean | undefined;
                } | {
                    object: "inline";
                    addExtraSpace?: boolean | undefined;
                    isVoid?: boolean | undefined;
                } | {
                    object: "mark";
                })) | undefined;
                customizeListItem?: ((def: {
                    object: import("../../types/slatePluginDefinitions").SlateNodeObjectType;
                } & import("../../types/slatePluginDefinitions").SlateBasePluginDefinition<import("../../pluginFactories/createSimpleHtmlBlockPlugin").DefaultBlockDataType> & {
                    type: string;
                    getStyle?: ((data: import("../../pluginFactories/createSimpleHtmlBlockPlugin").DefaultBlockDataType) => React.CSSProperties) | undefined;
                    deserialize?: {
                        tagName: string;
                        getData?: ((el: HTMLElement) => void | import("../../pluginFactories/createSimpleHtmlBlockPlugin").DefaultBlockDataType) | undefined;
                    } | undefined;
                    Component: keyof JSX.IntrinsicElements | React.ComponentType<{
                        attributes?: Record<string, unknown> | undefined;
                        style?: React.CSSProperties | undefined;
                        className?: string | undefined;
                        childNodes: import("slate").Node[];
                        useFocused: () => boolean;
                        useSelected: () => boolean;
                        getTextContents: () => string[];
                        children: React.ReactNode;
                    } & import("../../pluginFactories/createSimpleHtmlBlockPlugin").DefaultBlockDataType>;
                } & ({
                    object: "block";
                    replaceWithDefaultOnRemove?: boolean | undefined;
                    isVoid?: boolean | undefined;
                } | {
                    object: "inline";
                    addExtraSpace?: boolean | undefined;
                    isVoid?: boolean | undefined;
                } | {
                    object: "mark";
                })) => {
                    object: import("../../types/slatePluginDefinitions").SlateNodeObjectType;
                } & import("../../types/slatePluginDefinitions").SlateBasePluginDefinition<import("../../pluginFactories/createSimpleHtmlBlockPlugin").HtmlBlockData<CT_1>> & {
                    type: string;
                    getStyle?: ((data: import("../../pluginFactories/createSimpleHtmlBlockPlugin").HtmlBlockData<CT_1>) => React.CSSProperties) | undefined;
                    deserialize?: {
                        tagName: string;
                        getData?: ((el: HTMLElement) => void | import("../../pluginFactories/createSimpleHtmlBlockPlugin").HtmlBlockData<CT_1>) | undefined;
                    } | undefined;
                    Component: keyof JSX.IntrinsicElements | React.ComponentType<[{
                        attributes?: Record<string, unknown> | undefined;
                        style?: React.CSSProperties | undefined;
                        className?: string | undefined;
                        childNodes: import("slate").Node[];
                        useFocused: () => boolean;
                        useSelected: () => boolean;
                        getTextContents: () => string[];
                        children: React.ReactNode;
                    } & CT_1 & import("../../pluginFactories/createSimpleHtmlBlockPlugin").DefaultBlockDataType][{
                        attributes?: Record<string, unknown> | undefined;
                        style?: React.CSSProperties | undefined;
                        className?: string | undefined;
                        childNodes: import("slate").Node[];
                        useFocused: () => boolean;
                        useSelected: () => boolean;
                        getTextContents: () => string[];
                        children: React.ReactNode;
                    } & CT_1 & import("../../pluginFactories/createSimpleHtmlBlockPlugin").DefaultBlockDataType extends infer T_1 ? T_1 extends {
                        attributes?: Record<string, unknown> | undefined;
                        style?: React.CSSProperties | undefined;
                        className?: string | undefined;
                        childNodes: import("slate").Node[];
                        useFocused: () => boolean;
                        useSelected: () => boolean;
                        getTextContents: () => string[];
                        children: React.ReactNode;
                    } & CT_1 & import("../../pluginFactories/createSimpleHtmlBlockPlugin").DefaultBlockDataType ? T_1 extends any ? 0 : never : never : never]>;
                } & ({
                    object: "block";
                    replaceWithDefaultOnRemove?: boolean | undefined;
                    isVoid?: boolean | undefined;
                } | {
                    object: "inline";
                    addExtraSpace?: boolean | undefined;
                    isVoid?: boolean | undefined;
                } | {
                    object: "mark";
                })) | undefined;
            }): any;
            toPlugin(): import("../../types/SlatePlugin").SlatePlugin[];
        };
        toPlugin(): import("../../types/SlatePlugin").SlatePlugin[];
    };
    ul: {
        <CT>(customizers: {
            customizeList?: ((def: {
                object: import("../../types/slatePluginDefinitions").SlateNodeObjectType;
            } & import("../../types/slatePluginDefinitions").SlateBasePluginDefinition<import("../../pluginFactories/createSimpleHtmlBlockPlugin").DefaultBlockDataType> & {
                type: string;
                getStyle?: ((data: import("../../pluginFactories/createSimpleHtmlBlockPlugin").DefaultBlockDataType) => React.CSSProperties) | undefined;
                deserialize?: {
                    tagName: string;
                    getData?: ((el: HTMLElement) => void | import("../../pluginFactories/createSimpleHtmlBlockPlugin").DefaultBlockDataType) | undefined;
                } | undefined;
                Component: keyof JSX.IntrinsicElements | React.ComponentType<{
                    attributes?: Record<string, unknown> | undefined;
                    style?: React.CSSProperties | undefined;
                    className?: string | undefined;
                    childNodes: import("slate").Node[];
                    useFocused: () => boolean;
                    useSelected: () => boolean;
                    getTextContents: () => string[];
                    children: React.ReactNode;
                } & import("../../pluginFactories/createSimpleHtmlBlockPlugin").DefaultBlockDataType>;
            } & ({
                object: "block";
                replaceWithDefaultOnRemove?: boolean | undefined;
                isVoid?: boolean | undefined;
            } | {
                object: "inline";
                addExtraSpace?: boolean | undefined;
                isVoid?: boolean | undefined;
            } | {
                object: "mark";
            })) => {
                object: import("../../types/slatePluginDefinitions").SlateNodeObjectType;
            } & import("../../types/slatePluginDefinitions").SlateBasePluginDefinition<import("../../pluginFactories/createSimpleHtmlBlockPlugin").HtmlBlockData<CT & {}>> & {
                type: string;
                getStyle?: ((data: import("../../pluginFactories/createSimpleHtmlBlockPlugin").HtmlBlockData<CT & {}>) => React.CSSProperties) | undefined;
                deserialize?: {
                    tagName: string;
                    getData?: ((el: HTMLElement) => void | import("../../pluginFactories/createSimpleHtmlBlockPlugin").HtmlBlockData<CT & {}>) | undefined;
                } | undefined;
                Component: keyof JSX.IntrinsicElements | React.ComponentType<[{
                    attributes?: Record<string, unknown> | undefined;
                    style?: React.CSSProperties | undefined;
                    className?: string | undefined;
                    childNodes: import("slate").Node[];
                    useFocused: () => boolean;
                    useSelected: () => boolean;
                    getTextContents: () => string[];
                    children: React.ReactNode;
                } & CT & import("../../pluginFactories/createSimpleHtmlBlockPlugin").DefaultBlockDataType][{
                    attributes?: Record<string, unknown> | undefined;
                    style?: React.CSSProperties | undefined;
                    className?: string | undefined;
                    childNodes: import("slate").Node[];
                    useFocused: () => boolean;
                    useSelected: () => boolean;
                    getTextContents: () => string[];
                    children: React.ReactNode;
                } & CT & import("../../pluginFactories/createSimpleHtmlBlockPlugin").DefaultBlockDataType extends infer T ? T extends {
                    attributes?: Record<string, unknown> | undefined;
                    style?: React.CSSProperties | undefined;
                    className?: string | undefined;
                    childNodes: import("slate").Node[];
                    useFocused: () => boolean;
                    useSelected: () => boolean;
                    getTextContents: () => string[];
                    children: React.ReactNode;
                } & CT & import("../../pluginFactories/createSimpleHtmlBlockPlugin").DefaultBlockDataType ? T extends any ? 0 : never : never : never]>;
            } & ({
                object: "block";
                replaceWithDefaultOnRemove?: boolean | undefined;
                isVoid?: boolean | undefined;
            } | {
                object: "inline";
                addExtraSpace?: boolean | undefined;
                isVoid?: boolean | undefined;
            } | {
                object: "mark";
            })) | undefined;
            customizeListItem?: ((def: {
                object: import("../../types/slatePluginDefinitions").SlateNodeObjectType;
            } & import("../../types/slatePluginDefinitions").SlateBasePluginDefinition<import("../../pluginFactories/createSimpleHtmlBlockPlugin").DefaultBlockDataType> & {
                type: string;
                getStyle?: ((data: import("../../pluginFactories/createSimpleHtmlBlockPlugin").DefaultBlockDataType) => React.CSSProperties) | undefined;
                deserialize?: {
                    tagName: string;
                    getData?: ((el: HTMLElement) => void | import("../../pluginFactories/createSimpleHtmlBlockPlugin").DefaultBlockDataType) | undefined;
                } | undefined;
                Component: keyof JSX.IntrinsicElements | React.ComponentType<{
                    attributes?: Record<string, unknown> | undefined;
                    style?: React.CSSProperties | undefined;
                    className?: string | undefined;
                    childNodes: import("slate").Node[];
                    useFocused: () => boolean;
                    useSelected: () => boolean;
                    getTextContents: () => string[];
                    children: React.ReactNode;
                } & import("../../pluginFactories/createSimpleHtmlBlockPlugin").DefaultBlockDataType>;
            } & ({
                object: "block";
                replaceWithDefaultOnRemove?: boolean | undefined;
                isVoid?: boolean | undefined;
            } | {
                object: "inline";
                addExtraSpace?: boolean | undefined;
                isVoid?: boolean | undefined;
            } | {
                object: "mark";
            })) => {
                object: import("../../types/slatePluginDefinitions").SlateNodeObjectType;
            } & import("../../types/slatePluginDefinitions").SlateBasePluginDefinition<import("../../pluginFactories/createSimpleHtmlBlockPlugin").HtmlBlockData<CT & {}>> & {
                type: string;
                getStyle?: ((data: import("../../pluginFactories/createSimpleHtmlBlockPlugin").HtmlBlockData<CT & {}>) => React.CSSProperties) | undefined;
                deserialize?: {
                    tagName: string;
                    getData?: ((el: HTMLElement) => void | import("../../pluginFactories/createSimpleHtmlBlockPlugin").HtmlBlockData<CT & {}>) | undefined;
                } | undefined;
                Component: keyof JSX.IntrinsicElements | React.ComponentType<[{
                    attributes?: Record<string, unknown> | undefined;
                    style?: React.CSSProperties | undefined;
                    className?: string | undefined;
                    childNodes: import("slate").Node[];
                    useFocused: () => boolean;
                    useSelected: () => boolean;
                    getTextContents: () => string[];
                    children: React.ReactNode;
                } & CT & import("../../pluginFactories/createSimpleHtmlBlockPlugin").DefaultBlockDataType][{
                    attributes?: Record<string, unknown> | undefined;
                    style?: React.CSSProperties | undefined;
                    className?: string | undefined;
                    childNodes: import("slate").Node[];
                    useFocused: () => boolean;
                    useSelected: () => boolean;
                    getTextContents: () => string[];
                    children: React.ReactNode;
                } & CT & import("../../pluginFactories/createSimpleHtmlBlockPlugin").DefaultBlockDataType extends infer T ? T extends {
                    attributes?: Record<string, unknown> | undefined;
                    style?: React.CSSProperties | undefined;
                    className?: string | undefined;
                    childNodes: import("slate").Node[];
                    useFocused: () => boolean;
                    useSelected: () => boolean;
                    getTextContents: () => string[];
                    children: React.ReactNode;
                } & CT & import("../../pluginFactories/createSimpleHtmlBlockPlugin").DefaultBlockDataType ? T extends any ? 0 : never : never : never]>;
            } & ({
                object: "block";
                replaceWithDefaultOnRemove?: boolean | undefined;
                isVoid?: boolean | undefined;
            } | {
                object: "inline";
                addExtraSpace?: boolean | undefined;
                isVoid?: boolean | undefined;
            } | {
                object: "mark";
            })) | undefined;
        }): {
            <CT_1>(customizers: {
                customizeList?: ((def: {
                    object: import("../../types/slatePluginDefinitions").SlateNodeObjectType;
                } & import("../../types/slatePluginDefinitions").SlateBasePluginDefinition<import("../../pluginFactories/createSimpleHtmlBlockPlugin").DefaultBlockDataType> & {
                    type: string;
                    getStyle?: ((data: import("../../pluginFactories/createSimpleHtmlBlockPlugin").DefaultBlockDataType) => React.CSSProperties) | undefined;
                    deserialize?: {
                        tagName: string;
                        getData?: ((el: HTMLElement) => void | import("../../pluginFactories/createSimpleHtmlBlockPlugin").DefaultBlockDataType) | undefined;
                    } | undefined;
                    Component: keyof JSX.IntrinsicElements | React.ComponentType<{
                        attributes?: Record<string, unknown> | undefined;
                        style?: React.CSSProperties | undefined;
                        className?: string | undefined;
                        childNodes: import("slate").Node[];
                        useFocused: () => boolean;
                        useSelected: () => boolean;
                        getTextContents: () => string[];
                        children: React.ReactNode;
                    } & import("../../pluginFactories/createSimpleHtmlBlockPlugin").DefaultBlockDataType>;
                } & ({
                    object: "block";
                    replaceWithDefaultOnRemove?: boolean | undefined;
                    isVoid?: boolean | undefined;
                } | {
                    object: "inline";
                    addExtraSpace?: boolean | undefined;
                    isVoid?: boolean | undefined;
                } | {
                    object: "mark";
                })) => {
                    object: import("../../types/slatePluginDefinitions").SlateNodeObjectType;
                } & import("../../types/slatePluginDefinitions").SlateBasePluginDefinition<import("../../pluginFactories/createSimpleHtmlBlockPlugin").HtmlBlockData<CT_1>> & {
                    type: string;
                    getStyle?: ((data: import("../../pluginFactories/createSimpleHtmlBlockPlugin").HtmlBlockData<CT_1>) => React.CSSProperties) | undefined;
                    deserialize?: {
                        tagName: string;
                        getData?: ((el: HTMLElement) => void | import("../../pluginFactories/createSimpleHtmlBlockPlugin").HtmlBlockData<CT_1>) | undefined;
                    } | undefined;
                    Component: keyof JSX.IntrinsicElements | React.ComponentType<[{
                        attributes?: Record<string, unknown> | undefined;
                        style?: React.CSSProperties | undefined;
                        className?: string | undefined;
                        childNodes: import("slate").Node[];
                        useFocused: () => boolean;
                        useSelected: () => boolean;
                        getTextContents: () => string[];
                        children: React.ReactNode;
                    } & CT_1 & import("../../pluginFactories/createSimpleHtmlBlockPlugin").DefaultBlockDataType][{
                        attributes?: Record<string, unknown> | undefined;
                        style?: React.CSSProperties | undefined;
                        className?: string | undefined;
                        childNodes: import("slate").Node[];
                        useFocused: () => boolean;
                        useSelected: () => boolean;
                        getTextContents: () => string[];
                        children: React.ReactNode;
                    } & CT_1 & import("../../pluginFactories/createSimpleHtmlBlockPlugin").DefaultBlockDataType extends infer T_1 ? T_1 extends {
                        attributes?: Record<string, unknown> | undefined;
                        style?: React.CSSProperties | undefined;
                        className?: string | undefined;
                        childNodes: import("slate").Node[];
                        useFocused: () => boolean;
                        useSelected: () => boolean;
                        getTextContents: () => string[];
                        children: React.ReactNode;
                    } & CT_1 & import("../../pluginFactories/createSimpleHtmlBlockPlugin").DefaultBlockDataType ? T_1 extends any ? 0 : never : never : never]>;
                } & ({
                    object: "block";
                    replaceWithDefaultOnRemove?: boolean | undefined;
                    isVoid?: boolean | undefined;
                } | {
                    object: "inline";
                    addExtraSpace?: boolean | undefined;
                    isVoid?: boolean | undefined;
                } | {
                    object: "mark";
                })) | undefined;
                customizeListItem?: ((def: {
                    object: import("../../types/slatePluginDefinitions").SlateNodeObjectType;
                } & import("../../types/slatePluginDefinitions").SlateBasePluginDefinition<import("../../pluginFactories/createSimpleHtmlBlockPlugin").DefaultBlockDataType> & {
                    type: string;
                    getStyle?: ((data: import("../../pluginFactories/createSimpleHtmlBlockPlugin").DefaultBlockDataType) => React.CSSProperties) | undefined;
                    deserialize?: {
                        tagName: string;
                        getData?: ((el: HTMLElement) => void | import("../../pluginFactories/createSimpleHtmlBlockPlugin").DefaultBlockDataType) | undefined;
                    } | undefined;
                    Component: keyof JSX.IntrinsicElements | React.ComponentType<{
                        attributes?: Record<string, unknown> | undefined;
                        style?: React.CSSProperties | undefined;
                        className?: string | undefined;
                        childNodes: import("slate").Node[];
                        useFocused: () => boolean;
                        useSelected: () => boolean;
                        getTextContents: () => string[];
                        children: React.ReactNode;
                    } & import("../../pluginFactories/createSimpleHtmlBlockPlugin").DefaultBlockDataType>;
                } & ({
                    object: "block";
                    replaceWithDefaultOnRemove?: boolean | undefined;
                    isVoid?: boolean | undefined;
                } | {
                    object: "inline";
                    addExtraSpace?: boolean | undefined;
                    isVoid?: boolean | undefined;
                } | {
                    object: "mark";
                })) => {
                    object: import("../../types/slatePluginDefinitions").SlateNodeObjectType;
                } & import("../../types/slatePluginDefinitions").SlateBasePluginDefinition<import("../../pluginFactories/createSimpleHtmlBlockPlugin").HtmlBlockData<CT_1>> & {
                    type: string;
                    getStyle?: ((data: import("../../pluginFactories/createSimpleHtmlBlockPlugin").HtmlBlockData<CT_1>) => React.CSSProperties) | undefined;
                    deserialize?: {
                        tagName: string;
                        getData?: ((el: HTMLElement) => void | import("../../pluginFactories/createSimpleHtmlBlockPlugin").HtmlBlockData<CT_1>) | undefined;
                    } | undefined;
                    Component: keyof JSX.IntrinsicElements | React.ComponentType<[{
                        attributes?: Record<string, unknown> | undefined;
                        style?: React.CSSProperties | undefined;
                        className?: string | undefined;
                        childNodes: import("slate").Node[];
                        useFocused: () => boolean;
                        useSelected: () => boolean;
                        getTextContents: () => string[];
                        children: React.ReactNode;
                    } & CT_1 & import("../../pluginFactories/createSimpleHtmlBlockPlugin").DefaultBlockDataType][{
                        attributes?: Record<string, unknown> | undefined;
                        style?: React.CSSProperties | undefined;
                        className?: string | undefined;
                        childNodes: import("slate").Node[];
                        useFocused: () => boolean;
                        useSelected: () => boolean;
                        getTextContents: () => string[];
                        children: React.ReactNode;
                    } & CT_1 & import("../../pluginFactories/createSimpleHtmlBlockPlugin").DefaultBlockDataType extends infer T_1 ? T_1 extends {
                        attributes?: Record<string, unknown> | undefined;
                        style?: React.CSSProperties | undefined;
                        className?: string | undefined;
                        childNodes: import("slate").Node[];
                        useFocused: () => boolean;
                        useSelected: () => boolean;
                        getTextContents: () => string[];
                        children: React.ReactNode;
                    } & CT_1 & import("../../pluginFactories/createSimpleHtmlBlockPlugin").DefaultBlockDataType ? T_1 extends any ? 0 : never : never : never]>;
                } & ({
                    object: "block";
                    replaceWithDefaultOnRemove?: boolean | undefined;
                    isVoid?: boolean | undefined;
                } | {
                    object: "inline";
                    addExtraSpace?: boolean | undefined;
                    isVoid?: boolean | undefined;
                } | {
                    object: "mark";
                })) | undefined;
            }): any;
            toPlugin(): import("../../types/SlatePlugin").SlatePlugin[];
        };
        toPlugin(): import("../../types/SlatePlugin").SlatePlugin[];
    };
    li: {
        <CT_2 extends Record<string, unknown> = import("../../pluginFactories/createSimpleHtmlBlockPlugin").DefaultBlockDataType>(customize?: (t: import("../../types/slatePluginDefinitions").SlateComponentPluginDefinition<import("../../pluginFactories/createSimpleHtmlBlockPlugin").DefaultBlockDataType>) => import("../../types/slatePluginDefinitions").SlateComponentPluginDefinition<CT_2>): {
            <CT_3 extends Record<string, unknown> = CT_2>(customize?: (t: import("../../types/slatePluginDefinitions").SlateComponentPluginDefinition<CT_2>) => import("../../types/slatePluginDefinitions").SlateComponentPluginDefinition<CT_3>): {
                <CT_4 extends Record<string, unknown> = CT_3>(customize?: (t: import("../../types/slatePluginDefinitions").SlateComponentPluginDefinition<CT_3>) => import("../../types/slatePluginDefinitions").SlateComponentPluginDefinition<CT_4>): {
                    <CT_5 extends Record<string, unknown> = CT_4>(customize?: (t: import("../../types/slatePluginDefinitions").SlateComponentPluginDefinition<CT_4>) => import("../../types/slatePluginDefinitions").SlateComponentPluginDefinition<CT_5>): {
                        <CT_6 extends Record<string, unknown> = CT_5>(customize?: (t: import("../../types/slatePluginDefinitions").SlateComponentPluginDefinition<CT_5>) => import("../../types/slatePluginDefinitions").SlateComponentPluginDefinition<CT_6>): {
                            <CT_7 extends Record<string, unknown> = CT_6>(customize?: (t: import("../../types/slatePluginDefinitions").SlateComponentPluginDefinition<CT_6>) => import("../../types/slatePluginDefinitions").SlateComponentPluginDefinition<CT_7>): {
                                <CT_8 extends Record<string, unknown> = CT_7>(customize?: (t: import("../../types/slatePluginDefinitions").SlateComponentPluginDefinition<CT_7>) => import("../../types/slatePluginDefinitions").SlateComponentPluginDefinition<CT_8>): {
                                    <CT_9 extends Record<string, unknown> = CT_8>(customize?: (t: import("../../types/slatePluginDefinitions").SlateComponentPluginDefinition<CT_8>) => import("../../types/slatePluginDefinitions").SlateComponentPluginDefinition<CT_9>): {
                                        <CT_10 extends Record<string, unknown> = CT_9>(customize?: (t: import("../../types/slatePluginDefinitions").SlateComponentPluginDefinition<CT_9>) => import("../../types/slatePluginDefinitions").SlateComponentPluginDefinition<CT_10>): {
                                            <CT_11 extends Record<string, unknown> = CT_10>(customize?: (t: import("../../types/slatePluginDefinitions").SlateComponentPluginDefinition<CT_10>) => import("../../types/slatePluginDefinitions").SlateComponentPluginDefinition<CT_11>): {
                                                <CT_12 extends Record<string, unknown> = CT_11>(customize?: (t: import("../../types/slatePluginDefinitions").SlateComponentPluginDefinition<CT_11>) => import("../../types/slatePluginDefinitions").SlateComponentPluginDefinition<CT_12>): any;
                                                toPlugin(): import("../../types/SlatePlugin").SlatePlugin;
                                            };
                                            toPlugin(): import("../../types/SlatePlugin").SlatePlugin;
                                        };
                                        toPlugin(): import("../../types/SlatePlugin").SlatePlugin;
                                    };
                                    toPlugin(): import("../../types/SlatePlugin").SlatePlugin;
                                };
                                toPlugin(): import("../../types/SlatePlugin").SlatePlugin;
                            };
                            toPlugin(): import("../../types/SlatePlugin").SlatePlugin;
                        };
                        toPlugin(): import("../../types/SlatePlugin").SlatePlugin;
                    };
                    toPlugin(): import("../../types/SlatePlugin").SlatePlugin;
                };
                toPlugin(): import("../../types/SlatePlugin").SlatePlugin;
            };
            toPlugin(): import("../../types/SlatePlugin").SlatePlugin;
        };
        toPlugin(): import("../../types/SlatePlugin").SlatePlugin;
    };
    indention: {
        (customize: (def2: {
            iconIncrease: JSX.Element;
            iconDecrease: JSX.Element;
            listItemType: string;
            labelIncrease?: string | undefined;
            labelDecrease?: string | undefined;
        }) => {
            iconIncrease: JSX.Element;
            iconDecrease: JSX.Element;
            listItemType: string;
            labelIncrease?: string | undefined;
            labelDecrease?: string | undefined;
        }): any;
        toPlugin(): import("../../types/SlatePlugin").SlatePlugin[];
    };
};
export default _default;
//# sourceMappingURL=index.d.ts.map