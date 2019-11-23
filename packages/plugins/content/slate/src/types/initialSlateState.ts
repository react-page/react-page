import { SlatePluginOrFactory } from './SlatePlugin';

export type SlatePluginNode = {
  plugin: SlatePluginOrFactory;
  children?: SlateDefNode[];
  data?: object;
};

export type SlateDefNode = SlatePluginNode | string;
export type InitialSlateStateDef = {
  children: SlateDefNode[];
};
