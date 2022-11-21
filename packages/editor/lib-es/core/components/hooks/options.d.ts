import type { FC, PropsWithChildren } from 'react';
import React from 'react';
import type EditorStore from '../../EditorStore';
import type { CellSpacing, Options, RenderOptions } from '../../types';
/**
 * @returns the store object of the current editor. Contains the redux store.
 */
export declare const useEditorStore: () => EditorStore<import("../../types").RootState> | null;
export declare const OptionsContext: React.Context<Options>;
/**
 * @returns the options object of the current Editor.
 *
 * this object is memoized, alltough its better to use `useOption` instead if you want to use a single option
 */
export declare const useOptions: () => Options;
/**
 * get a single (memoized) option value
 * @param key the option key
 * @returns the option value
 */
export declare const useOption: <K extends keyof Options>(key: K) => Options[K];
export type TranslatorFunction = (key?: string | null) => string | null;
/**
 * @returns the an object with a single `t` function for ui translations
 */
export declare const useUiTranslator: () => {
    t: TranslatorFunction;
};
/**
 * @returns the current language
 */
export declare const useLang: () => string;
/**
 * @returns cell spacing for the current cell sub-tree
 */
export declare const useCellSpacing: () => CellSpacing;
/**
 * @returns a Provider/value tuple that can be used to override cell spacing for a subtree of cells
 */
export declare const useCellSpacingProvider: (cellSpacing?: number | CellSpacing | null) => [FC<PropsWithChildren<{
    value: RenderOptions;
}>>, RenderOptions];
//# sourceMappingURL=options.d.ts.map