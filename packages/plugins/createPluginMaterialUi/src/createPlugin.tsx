import {
  CellPlugin,
  CellPluginComponentProps,
  lazyLoad,
} from '@react-page/core';
import * as React from 'react';
import { ControlsType, PluginWithSchemaDefinition } from './types';

type CustomizeFunction<T, CT> = (
  def: PluginWithSchemaDefinition<T>
) => PluginWithSchemaDefinition<T & CT>;

// eslint-disable-next-line @typescript-eslint/ban-types
function createPluginWithDef<T extends {}>({
  schema,
  Renderer,
  controlsLayout,
  ...pluginSettings
}: PluginWithSchemaDefinition<T>): CellPlugin<T> {
  const Controls = lazyLoad(
    () => (import('./Controls') as unknown) as Promise<ControlsType<T>>
  );

  return {
    Component: (props: CellPluginComponentProps<T>) => {
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

function createContentPlugin<T>(definition: PluginWithSchemaDefinition<T>) {
  return function <CT>(customize?: CustomizeFunction<T, CT>) {
    if (customize) {
      return createPluginWithDef<T & CT>(customize(definition));
    }
    return createPluginWithDef<T>(definition);
  };
}

export default createContentPlugin;
