import type { DependencyList } from 'react';
import { useMemo } from 'react';
import type { SlatePlugin } from '../types/SlatePlugin';
import type { SlateComponentPluginDefinition } from '../types/slatePluginDefinitions';

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
