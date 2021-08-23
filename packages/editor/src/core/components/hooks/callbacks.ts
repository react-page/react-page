import { createContext, useContext, useRef } from 'react';
import type { Callbacks } from '../../types';

export const CallbacksContext = createContext<Callbacks>({});

/**
 * @returns the callbacks object of the current Editor.
 *
 * this object is memoized, alltough its better to use `usecallback` instead if you want to use a single callback
 */
export const useCallbackOptions = () => useContext(CallbacksContext);

/**
 * get a single (memoized) callback
 * @param key the callback key
 * @returns the callback value
 */
export const useCallbackOption = <K extends keyof Callbacks>(key: K) => {
  const callbacks = useCallbackOptions();
  const callback = callbacks[key];
  const lastcallback = useRef(callback);
  if (lastcallback.current !== callback) {
    lastcallback.current = callback;
  }
  return lastcallback.current;
};
