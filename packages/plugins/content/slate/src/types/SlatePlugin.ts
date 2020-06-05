import { SlatePluginDefinition } from './slatePluginDefinitions';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SlatePlugin = SlatePluginDefinition<any>;

export type SlatePluginOrListOfPlugins = SlatePlugin | SlatePlugin[];

export type SlatePluginOrFactory =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | {
      toPlugin: () => SlatePluginOrListOfPlugins;
    }
  | SlatePluginOrListOfPlugins;
export type SlatePluginCollection = {
  [group: string]: {
    [key: string]: SlatePluginOrFactory;
  };
};
