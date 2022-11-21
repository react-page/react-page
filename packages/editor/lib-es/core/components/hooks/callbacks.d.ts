/// <reference types="react" />
import type { Callbacks } from '../../types';
export declare const CallbacksContext: import("react").Context<Callbacks>;
/**
 * @returns the callbacks object of the current Editor.
 *
 * this object is memoized, alltough its better to use `usecallback` instead if you want to use a single callback
 */
export declare const useCallbackOptions: () => Callbacks;
/**
 * get a single (memoized) callback
 * @param key the callback key
 * @returns the callback value
 */
export declare const useCallbackOption: <K extends keyof Callbacks>(key: K) => Callbacks[K];
//# sourceMappingURL=callbacks.d.ts.map