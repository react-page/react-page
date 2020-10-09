import { ContentPlugin, PluginProps, LayoutPlugin } from '@react-page/core';
import { JsonSchema } from './jsonSchema';

export type ControlsType<T> = React.ComponentType<ControlProps<T>>;

export type ControlsLayout = {
  columnCount: number;
};
// eslint-disable-next-line @typescript-eslint/ban-types
type CommonConfig<T extends {}> = {
  schema?: Omit<JsonSchema<T>, 'type'>;
  controlsLayout?: ControlsLayout;
  Renderer: React.ComponentType<PluginProps<T>>;
};

export type ControlProps<T> = PluginProps<T> & CommonConfig<T>;

export type ContentPluginDefinition<T> = CommonConfig<T> & ContentPlugin<T>;

export type LayoutPluginDefinition<T> = CommonConfig<T> & LayoutPlugin<T>;
