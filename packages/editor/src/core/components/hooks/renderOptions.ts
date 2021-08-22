import { createContext, useContext, useRef } from 'react';
import deepEquals from '../../utils/deepEquals';
import { DEFAULT_RENDER_OPTIONS } from '../../defaultOptions';
import type { RenderOptions } from '../../types';

export const RenderOptionsContext = createContext<RenderOptions>(
  DEFAULT_RENDER_OPTIONS
);

/**
 * @returns the options object of the current Editor.
 *
 * this object is memoized, alltough its better to use `useOption` instead if you want to use a single option
 */
export const useRenderOptions = () => useContext(RenderOptionsContext);

/**
 * get a single (memoized) option value
 * @param key the option key
 * @returns the option value
 */
export const useRenderOption = <K extends keyof RenderOptions>(key: K) => {
  const options = useRenderOptions();
  const option = options[key];
  const lastOption = useRef(option);
  if (!deepEquals(lastOption.current, option)) {
    lastOption.current = option;
  }
  return lastOption.current;
};
