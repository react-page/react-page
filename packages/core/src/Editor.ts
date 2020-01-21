import forEach from 'ramda/src/forEach';
import { NativeTypes } from 'react-dnd-html5-backend';
import { Middleware, Store } from 'redux';
import { v4 } from 'uuid';
import { actions, ActionsTypes } from './actions';
import { isProduction } from './const';
import { selectors } from './selector';
import PluginService from './service/plugin';
import {
  ContentPluginConfig,
  LayoutPluginConfig,
  Plugins
} from './service/plugin/classes';
import pluginDefault from './service/plugin/default';
import createStore from './store';
import { EditableType } from './types/editable';
import { RootState } from './types/state';

const initialState = () => ({
  reactPage: {
    editables: {
      past: [],
      present: [],
      future: [],
    },
  },
});

const nativeTypes = (editor: Editor) =>
  editor.plugins.hasNativePlugin()
    ? [NativeTypes.URL, NativeTypes.FILE, NativeTypes.TEXT]
    : [];

const update = (editor: Editor) => (editable: EditableType) => {
  const state = editor.plugins.unserialize(editable);
  actions(editor.store.dispatch).editable.update({
    ...state,
    config: {
      plugins: editor.plugins,
      whitelist: [
        ...editor.plugins.getRegisteredNames(),
        ...nativeTypes(editor),
      ],
    },
    // tslint:disable-next-line:no-any
  } as any);
};

export interface EditorProps<T extends RootState = RootState> {
  // tslint:disable-next-line:no-any
  plugins?: Plugins;
  middleware?: [];
  editables?: EditableType[];
  defaultPlugin?: ContentPluginConfig | LayoutPluginConfig;

  store?: Store<T>;
}

/**
 * Editor is the core interface for dealing with the editor.
 */
class Editor<T extends RootState = RootState> {
  store: Store<RootState>;
  plugins: PluginService;
  middleware: Middleware[];

  defaultPlugin: ContentPluginConfig | LayoutPluginConfig;

  trigger: ActionsTypes;
  query = {};

  constructor({
    plugins,
    middleware = [],
    editables = [],
    defaultPlugin = pluginDefault,

    store,
  }: EditorProps<T> = {}) {
    this.store = store || createStore(initialState(), middleware);
    this.plugins = new PluginService(plugins);
    this.middleware = middleware;
    this.trigger = actions(this.store.dispatch);
    this.query = selectors(this.store);
    this.defaultPlugin = defaultPlugin;
    // tslint:disable-next-line:no-any
    this.trigger.editable.add = update(this) as any;
    // tslint:disable-next-line:no-any
    this.trigger.editable.update = update(this) as any;

    editables.forEach(this.trigger.editable.add);
  }

  public refreshEditables = () => {
    forEach((editable: EditableType) => {
      if (!isProduction) {
        // tslint:disable-next-line:no-console
        console.log(this.plugins.serialize(editable));
      }
      // tslint:disable-next-line:no-any
      this.trigger.editable.update(this.plugins.serialize(editable) as any);
    }, this.store.getState().reactPage.editables.present);
  }

  /**
   * @deprecated in order to reduce the api surface, we will remove this method in the future
   */
  public setLayoutPlugins = (plugins: LayoutPluginConfig[] = []) => {
    console.warn(
      'in order to reduce the api surface, we will remove setLayoutPlugins in the future'
    );
    this.plugins.setLayoutPlugins(plugins);
    this.refreshEditables();
  }
  /**
   * @deprecated in order to reduce the api surface, we will remove this method in the future
   */
  public addLayoutPlugin = (config: LayoutPluginConfig) => {
    console.warn(
      'in order to reduce the api surface, we will remove addLayoutPlugin in the future'
    );
    this.plugins.addLayoutPlugin(config);
    this.refreshEditables();
  }
  /**
   * @deprecated in order to reduce the api surface, we will remove this method in the future
   */
  public removeLayoutPlugin = (name: string) => {
    console.warn(
      'in order to reduce the api surface, we will remove removeLayoutPlugin in the future'
    );
    this.plugins.removeLayoutPlugin(name);
    this.refreshEditables();
  }
  /**
   * @deprecated in order to reduce the api surface, we will remove this method in the future
   */
  public setContentPlugins = (plugins: ContentPluginConfig[] = []) => {
    console.warn(
      'in order to reduce the api surface, we will remove setContentPlugins in the future'
    );
    this.plugins.setContentPlugins(plugins);
    this.refreshEditables();
  }

  /**
   * @deprecated in order to reduce the api surface, we will remove this method in the future
   */
  public addContentPlugin = (config: ContentPluginConfig) => {
    console.warn(
      'in order to reduce the api surface, we will remove addContentPlugin in the future'
    );
    this.plugins.addContentPlugin(config);
    this.refreshEditables();
  }

  /**
   * @deprecated in order to reduce the api surface, we will remove this method in the future
   */
  public removeContentPlugin = (name: string) => {
    console.warn(
      'in order to reduce the api surface, we will remove removeContentPlugin in the future'
    );
    this.plugins.removeContentPlugin(name);
    this.refreshEditables();
  }
}

export const createEmptyState: () => EditableType = () =>
  ({ id: v4(), cells: [] } as EditableType);

export default Editor;
