import { SlatePluginDefinition } from './slatePluginDefinitions';

// tslint:disable-next-line:no-any
export type SlatePlugin = SlatePluginDefinition<any>;

export type SlatePluginOrListOfPlugins = SlatePlugin | SlatePlugin[];

export type SlatePluginOrFactory =
  // tslint:disable-next-line:no-any
  | {
      toPlugin: () => SlatePluginOrListOfPlugins;
    }
  | SlatePluginOrListOfPlugins;
export type SlatePluginCollection = {
  [group: string]: {
    [key: string]: SlatePluginOrFactory;
  };
};
