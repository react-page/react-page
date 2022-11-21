/// <reference types="react" />
import type { RenderOptions } from '../../types';
export declare const RenderOptionsContext: import("react").Context<RenderOptions>;
/**
 * @returns the options object of the current Editor.
 *
 * this object is memoized, alltough its better to use `useOption` instead if you want to use a single option
 */
export declare const useRenderOptions: () => RenderOptions;
/**
 * get a single (memoized) option value
 * @param key the option key
 * @returns the option value
 */
export declare const useRenderOption: <K extends keyof RenderOptions>(key: K) => RenderOptions[K];
//# sourceMappingURL=renderOptions.d.ts.map