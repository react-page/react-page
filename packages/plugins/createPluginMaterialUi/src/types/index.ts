import {
  CellPluginComponentProps,
  CellPlugin,
  JsonSchema,
} from '@react-page/editor';
import React from 'react';

export type ControlsType<T> = React.ComponentType<ControlProps<T>>;

export type ControlsLayout = {
  columnCount: number;
};
// eslint-disable-next-line @typescript-eslint/ban-types
type CommonConfig<T> = {
  schema?: T extends Record<string, unknown> ? JsonSchema<T> : unknown;
  controlsLayout?: ControlsLayout;
  Renderer: React.ComponentType<CellPluginComponentProps<T>>;
};

export type ControlProps<T> = CellPluginComponentProps<T> & CommonConfig<T>;

export type PluginWithSchemaDefinition<T> = CommonConfig<T> & CellPlugin<T>;
