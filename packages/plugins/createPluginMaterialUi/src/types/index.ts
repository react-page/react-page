import { JSONSchema7 } from 'json-schema';
import {
  ContentPluginProps,
  ContentPluginConfig,
  LayoutPluginConfig,
  LayoutPluginProps,
  PluginProps
} from '@react-page/core/lib/service/plugin/classes';

type CommonProps = {
  schema: JSONSchema7;
};

type CommonContentPluginProps<T> = {
  Renderer: React.ComponentType<ContentPluginProps<T>>;
};
type CommonLayoutPluginProps<T> = {
  Renderer: React.ComponentType<LayoutPluginProps<T>>;
};

export type ControlProps<T> = CommonProps & {
  Renderer: React.ComponentType<PluginProps<T>>;
} & PluginProps<T>;

export type CreateContentPluginConfig<T> = CommonProps &
  CommonContentPluginProps<T> &
  ContentPluginConfig<T>;

export type CreateLayoutPluginConfig<T> = CommonProps &
  CommonLayoutPluginProps<T> &
  LayoutPluginConfig<T>;
