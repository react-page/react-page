import { LayoutPlugin, lazyLoad, PluginProps } from '@react-page/core';
import * as React from 'react';
import { ControlsType, LayoutPluginDefinition } from './types';

type CustomizeFunction<T, CT> = (
  def: LayoutPluginDefinition<T>
) => LayoutPluginDefinition<T & CT>;
// eslint-disable-next-line @typescript-eslint/ban-types
function createPluginWithDef<T extends {}>({
  schema,
  controlsLayout,
  Renderer,
  ...pluginSettings
}: LayoutPluginDefinition<T>): LayoutPlugin<T> {
  const Controls = lazyLoad(
    () => (import('./Controls') as unknown) as Promise<ControlsType<T>>
  );

  return {
    Component: (props: PluginProps<T>) => {
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
  return function <CT>(customize?: CustomizeFunction<T, CT>) {
    if (customize) {
      return createPluginWithDef<T & CT>(customize(definition));
    }
    return createPluginWithDef<T>(definition);
  };
}

export default createContentPlugin;
