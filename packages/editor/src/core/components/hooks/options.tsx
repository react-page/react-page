import React, { createContext, useContext } from 'react';
import EditorStore, { EditorContext } from '../../EditorStore';
import { useSelector } from '../../reduxConnect';
import { getLang } from '../../selector/setting';
import { Options } from '../../types/node';
import { normalizeCellSpacing } from '../../utils/getCellSpacing';

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

/**
 * @returns the options (@see useOptions) and the current selected language.
 *
 */
export const useOptionsWithLang = () => {
  const lang = useLang();
  return {
    ...useOptions(),
    lang,
  };
};

/**
 * @returns all configured CellPlugin
 */
export const useAllCellPlugins = () => {
  return useOptions().cellPlugins;
};

/**
 *
 * @param pluginId the id of the plugin
 * @eturns the plugin definition of the given plugin id.
 *
 */
export const useConfiguredCellPlugin = (pluginId: string) => {
  const plugins = useAllCellPlugins();
  return pluginId ? plugins.find((p) => p.id === pluginId) : null;
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
export const useCellSpacing: () => [number, number] = () => {
  return normalizeCellSpacing(useOptions().cellSpacing);
};

/**
 * @returns a Provider component that can be used to override cell spacing for a subtree of cells
 */
export const useCellSpacingProvider = (
  cellSpacingX: number,
  cellSpacingY: number
) => {
  const options = useOptions();
  return (({ children }) => (
    <OptionsContext.Provider
      value={{ ...options, cellSpacing: [cellSpacingX, cellSpacingY] }}
    >
      {children}
    </OptionsContext.Provider>
  )) as React.FC<unknown>;
};
