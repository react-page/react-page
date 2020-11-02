import { CellPluginComponentProps, CellPlugin } from '@react-page/core';
import { JsonSchema } from './jsonSchema';

export type ControlsType<T> = React.ComponentType<ControlProps<T>>;

export type ControlsLayout = {
  columnCount: number;
};
// eslint-disable-next-line @typescript-eslint/ban-types
type CommonConfig<T extends {}> = {
  schema?: Omit<JsonSchema<T>, 'type'>;
  controlsLayout?: ControlsLayout;
  Renderer: React.ComponentType<CellPluginComponentProps<T>>;
};

export type ControlProps<T> = CellPluginComponentProps<T> & CommonConfig<T>;

export type PluginWithSchemaDefinition<T> = CommonConfig<T> & CellPlugin<T>;
