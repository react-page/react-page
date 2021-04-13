import React, { createContext, useContext } from 'react';
import type EditorStore from '../../EditorStore';
import { EditorContext } from '../../EditorStore';
import { useSelector } from '../../reduxConnect';
import { getLang } from '../../selector/setting';
import type { CellSpacing, Options } from '../../types';

import { normalizeCellSpacing } from '../../utils/getCellSpacing';
import NoopProvider from '../Cell/NoopProvider';

/**
 * @returns the store object of the current editor. Contains the redux store.
 */

export const useEditorStore = () => useContext<EditorStore>(EditorContext);

export const OptionsContext = createContext<Options>({
  allowMoveInEditMode: true,
  allowResizeInEditMode: true,
  cellPlugins: [],
  languages: [],
  pluginsWillChange: false,
});

/**
 * @returns the options object of the current Editor. @see Options type for more information
 */
export const useOptions = () => useContext(OptionsContext);

export type TranslatorFunction = (key: string) => string;
/**
 * @returns the an object with a single `t` function for ui translations
 */
export const useUiTranslator = (): {
  t: TranslatorFunction;
} => {
  const { uiTranslator } = useOptions();
  return {
    t: (key: string) => {
      return uiTranslator?.(key) ?? key;
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
  return normalizeCellSpacing(useOptions().cellSpacing);
};

/**
 * @returns a Provider/value tuple that can be used to override cell spacing for a subtree of cells
 */
export const useCellSpacingProvider = (
  cellSpacing?: number | CellSpacing
): [React.FC<{ value: unknown }>, unknown] => {
  const options = useOptions();
  const value = React.useMemo(
    () => ({ ...options, cellSpacing: normalizeCellSpacing(cellSpacing) }),
    [options, JSON.stringify(cellSpacing)]
  );
  if (typeof cellSpacing === 'undefined' || cellSpacing == null) {
    return [NoopProvider, undefined];
  } else {
    return [OptionsContext.Provider, value];
  }
};
