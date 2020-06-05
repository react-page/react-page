import {
  ContentPluginConfig,
  ContentPluginProps,
  lazyLoad,
} from '@react-page/core';
import * as React from 'react';
import { ContentPluginDefinition, ControlsType } from './types';

type CustomizeFunction<T, CT> = (
  def: ContentPluginDefinition<T>
) => ContentPluginDefinition<T & CT>;

// eslint-disable-next-line @typescript-eslint/ban-types
function createPluginWithDef<T extends {}>({
  schema,
  Renderer,
  controlsLayout,
  ...pluginSettings
}: ContentPluginDefinition<T>): ContentPluginConfig<T> {
  const Controls = lazyLoad(
    () => (import('./Controls') as unknown) as Promise<ControlsType<T>>
  );

  return {
    Component: (props: ContentPluginProps<T>) => {
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

function createContentPlugin<T>(definition: ContentPluginDefinition<T>) {
  return function <CT>(customize?: CustomizeFunction<T, CT>) {
    if (customize) {
      return createPluginWithDef<T & CT>(customize(definition));
    }
    return createPluginWithDef<T>(definition);
  };
}

export default createContentPlugin;
