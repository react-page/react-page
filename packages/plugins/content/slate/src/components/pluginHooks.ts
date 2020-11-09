import { DependencyList, useMemo } from 'react';
import { SlatePlugin } from '../types/SlatePlugin';
import { SlateComponentPluginDefinition } from '../types/slatePluginDefinitions';

export const useComponentNodePlugins = (
  { plugins }: { plugins: SlatePlugin[] },
  deps: DependencyList
) =>
  useMemo(
    () =>
      plugins.filter(
        (plugin) =>
          plugin.pluginType === 'component' && plugin.object !== 'mark'
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ) as SlateComponentPluginDefinition<any>[],
    deps
  );

export const useComponentMarkPlugins = (
  { plugins }: { plugins: SlatePlugin[] },
  deps: DependencyList
) =>
  useMemo(
    () =>
      plugins.filter(
        (plugin) =>
          plugin.pluginType === 'component' && plugin.object === 'mark'
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ) as SlateComponentPluginDefinition<any>[],
    deps
  );
