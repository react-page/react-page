import { useMemo } from 'react';
import type { Options } from '../types';

export const useOptionsMemoized = ({
  pluginsWillChange = false,
  cellPlugins = [],
  allowMoveInEditMode = true,
  allowResizeInEditMode = true,
  languages,
  childConstraints,
  components,
  cellSpacing,
  uiTranslator,
}: Options) => {
  // see https://github.com/react-page/react-page/issues/918#issuecomment-801457987
  // minimize unnecessary rerenders by forcing shallow comparison of "components" object
  const componentWithNulls: Required<Options['components']> = {
    BottomToolbar: null,
    CellPluginMissing: null,
    EditModeResizeHandle: null,
    Row: null,
    Cell: null,
    HTMLRow: null,
    HTMLCell: null,
    ...(components ?? {}),
  };
  const componentDeps = [
    ...Object.keys(componentWithNulls),
    ...Object.values(componentWithNulls),
  ];
  return useMemo<Required<Options>>(() => {
    return {
      cellPlugins,
      pluginsWillChange,
      allowMoveInEditMode,
      allowResizeInEditMode,
      languages,
      childConstraints,
      components,
      cellSpacing,
      uiTranslator,
    };
  }, [
    pluginsWillChange && cellPlugins,
    allowMoveInEditMode,
    allowResizeInEditMode,
    languages,
    uiTranslator,
    JSON.stringify(childConstraints ?? {}), // its an object, we prevent unnecessary rerenders by stringify it
    JSON.stringify(cellSpacing ?? []),

    ...componentDeps,
  ]);
};
