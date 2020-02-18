import {
  ContentPluginConfig,
  ContentPluginProps,
  LayoutPluginConfig,
  LayoutPluginProps,
  PluginProps
} from '@react-page/core';
import { JsonSchema } from './jsonSchema';

export type ControlsType<T> = React.ComponentType<ControlProps<T>>;

export type ControlsLayout = {
  columnCount: number;
};
type CommonProps<T extends {}> = {
  schema?: Omit<JsonSchema<T>, 'type'>;
  controlsLayout?: ControlsLayout;
};

type CommonContentPluginProps<T> = {
  Renderer: React.ComponentType<ContentPluginProps<T>>;
};
type CommonLayoutPluginProps<T> = {
  Renderer: React.ComponentType<LayoutPluginProps<T>>;
};

export type ControlProps<T> = CommonProps<T> & {
  Renderer: React.ComponentType<PluginProps<T>>;
} & PluginProps<T>;

export type ContentPluginDefinition<T> = CommonProps<T> &
  CommonContentPluginProps<T> &
  ContentPluginConfig<T>;

export type LayoutPluginDefinition<T> = CommonProps<T> &
  CommonLayoutPluginProps<T> &
  LayoutPluginConfig<T>;
