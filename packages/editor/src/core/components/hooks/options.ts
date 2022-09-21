import type { FC, PropsWithChildren } from 'react';
import React, { createContext, useContext, useRef } from 'react';
import deepEquals from '../../utils/deepEquals';
import { DEFAULT_OPTIONS } from '../../defaultOptions';
import type EditorStore from '../../EditorStore';
import { EditorContext } from '../../EditorStore';
import { useSelector } from '../../reduxConnect';
import { getLang } from '../../selector/setting';
import type { CellSpacing, Options, RenderOptions } from '../../types';

import { normalizeCellSpacing } from '../../utils/getCellSpacing';
import NoopProvider from '../Cell/NoopProvider';
import {
  RenderOptionsContext,
  useRenderOption,
  useRenderOptions,
} from './renderOptions';

/**
 * @returns the store object of the current editor. Contains the redux store.
 */

export const useEditorStore = () =>
  useContext<EditorStore | null>(EditorContext);

export const OptionsContext = createContext<Options>(DEFAULT_OPTIONS);

/**
 * @returns the options object of the current Editor.
 *
 * this object is memoized, alltough its better to use `useOption` instead if you want to use a single option
 */
export const useOptions = () => useContext(OptionsContext);

/**
 * get a single (memoized) option value
 * @param key the option key
 * @returns the option value
 */
export const useOption = <K extends keyof Options>(key: K) => {
  const options = useOptions();
  const option = options[key];
  const lastOption = useRef(option);
  if (!deepEquals(lastOption.current, option)) {
    lastOption.current = option;
  }
  return lastOption.current;
};

export type TranslatorFunction = (key?: string | null) => string | null;
/**
 * @returns the an object with a single `t` function for ui translations
 */
export const useUiTranslator = (): {
  t: TranslatorFunction;
} => {
  const uiTranslator = useOption('uiTranslator');
  return {
    t: (key?: string | null) => {
      return uiTranslator?.(key) ?? key ?? null;
    },
  };
};

/**
 * @returns the current language
 */
export const useLang = () => {
  return useSelector(getLang);
};

/**
 * @returns cell spacing for the current cell sub-tree
 */
export const useCellSpacing: () => CellSpacing = () => {
  return normalizeCellSpacing(useRenderOption('cellSpacing'));
};

/**
 * @returns a Provider/value tuple that can be used to override cell spacing for a subtree of cells
 */
export const useCellSpacingProvider = (
  cellSpacing?: number | CellSpacing | null
): [FC<PropsWithChildren<{ value: RenderOptions }>>, RenderOptions] => {
  const renderOptions = useRenderOptions();
  const value = React.useMemo(
    () => ({
      ...renderOptions,
      cellSpacing: normalizeCellSpacing(cellSpacing),
    }),
    [renderOptions, JSON.stringify(cellSpacing)]
  );
  if (typeof cellSpacing === 'undefined' || cellSpacing == null) {
    return [NoopProvider, value];
  } else {
    return [RenderOptionsContext.Provider, value];
  }
};
