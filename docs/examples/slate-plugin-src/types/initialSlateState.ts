import type { SlatePluginOrFactory } from './SlatePlugin';

export type SlatePluginNode = {
  plugin: SlatePluginOrFactory;
  children?: SlateDefNode[];
  // eslint-disable-next-line @typescript-eslint/ban-types
  data?: object;
};

export type SlateDefNode = SlatePluginNode | string;
export type InitialSlateStateDef = {
  children: SlateDefNode[];
};
