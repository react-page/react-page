import * as React from 'react';

import { lazyLoad } from '@react-page/core';
import {
  LayoutPluginConfig,
  LayoutPluginProps
} from '@react-page/core/lib/service/plugin/classes';
import { LayoutPluginDefinition, ControlsType } from './types';

type CustomizeFunction<T, CT> = (
  def: LayoutPluginDefinition<T>
) => LayoutPluginDefinition<T & CT>;

function createPluginWithDef<T extends {}>({
  schema,
  controlsLayout,
  Renderer,
  ...pluginSettings
}: LayoutPluginDefinition<T>): LayoutPluginConfig<T> {
  const Controls = lazyLoad(
    () => (import('./Controls') as unknown) as Promise<ControlsType<T>>
  );

  return {
    Component: (props: LayoutPluginProps<T>) => {
      return (
        <>
          {!props.readOnly ? (
            <Controls
              controlsLayout={controlsLayout}
              schema={schema}
              Renderer={Renderer}
              {...props}
            />
          ) : (
            <Renderer {...props} />
          )}
        </>
      );
    },
    ...pluginSettings,
  };
}

function createContentPlugin<T>(definition: LayoutPluginDefinition<T>) {
  return function<CT>(customize?: CustomizeFunction<T, CT>) {
    if (customize) {
      return createPluginWithDef<T & CT>(customize(definition));
    }
    return createPluginWithDef<T>(definition);
  };
}

export default createContentPlugin;
