import { useMemo } from 'react';
import { Options } from '../types';
type Required<T> = {
  [P in keyof T]-?: T[P];
};

export const useOptionsMemoized = ({
  pluginsWillChange,
  cellPlugins,
  allowMoveInEditMode,
  allowResizeInEditMode,
  editModeResizeHandle,
  languages,
  childConstraints,
  components,
  cellSpacing,
}: Options) => {
  // see https://github.com/react-page/react-page/issues/918#issuecomment-801457987
  // minimize unnecessary rerenders by forcing shallow comparison of "components" object
  const componentWithNulls: Required<Options['components']> = {
    BottomToolbar: null,
    CellPluginMissing: null,
    ...(components ?? {}),
  };
  const componentDeps = [
    ...Object.keys(componentWithNulls),
    ...Object.values(componentWithNulls),
  ];
  return useMemo<Options>(() => {
    return {
      cellPlugins,
      pluginsWillChange,
      allowMoveInEditMode,
      allowResizeInEditMode,
      editModeResizeHandle,
      languages,
      childConstraints,
      components,
      cellSpacing,
    };
  }, [
    pluginsWillChange && cellPlugins,
    allowMoveInEditMode,
    allowResizeInEditMode,
    editModeResizeHandle,
    languages,
    JSON.stringify(childConstraints ?? {}), // its an object, we prevent unnecessary rerenders by stringify it
    JSON.stringify(cellSpacing ?? []),
    ...componentDeps,
  ]);
};
