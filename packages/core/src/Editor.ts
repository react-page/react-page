// TODO: get rid of this class
import { Middleware, Store } from 'redux';
import { v4 } from 'uuid';
import { isProduction } from './const';
import { selectors } from './selector';
import PluginService from './service/plugin';
import { ContentPlugin, LayoutPlugin, Plugins } from './service/plugin/classes';
import pluginDefault from './service/plugin/default';
import createStore from './store';
import { EditableType } from './types/editable';
import { RootState } from './types/state';
import { setLang } from './actions/setting';
import { findNodeInState } from './selector/editable';
import { createContext } from 'react';
import { updateEditable } from './actions/editables';

export const EditorContext = createContext<Editor>(null);

const initialState = ({ lang }) => ({
  reactPage: {
    settings: {
      lang,
    },
    editables: {
      past: [],
      present: [],
      future: [],
    },
  },
});

export type Languages = Array<{
  lang: string;
  label: string;
}>;
export interface CoreEditorProps<T extends RootState = RootState> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  plugins?: Plugins;
  middleware?: [];
  editables?: EditableType[];
  defaultPlugin?: ContentPlugin | LayoutPlugin;

  store?: Store<T>;
  languages?: Languages;
  lang?: string;
}

/**
 * Editor is the core interface for dealing with the editor.
 * TODO: remove and focus on hook api
 */
class Editor<T extends RootState = RootState> {
  store: Store<RootState>;
  plugins: PluginService;
  middleware: Middleware[];

  defaultPlugin: ContentPlugin | LayoutPlugin;

  query = {};
  languages?: Languages;

  constructor({
    plugins,
    middleware = [],
    editables = [],
    defaultPlugin = pluginDefault,
    store,
    languages = [],
    lang,
  }: CoreEditorProps<T> = {}) {
    this.store =
      store ||
      createStore(initialState({ lang: lang || languages[0] }), middleware);
    this.plugins = new PluginService(plugins);
    this.middleware = middleware;
    this.query = selectors(this.store);
    this.defaultPlugin = defaultPlugin;

    this.languages = languages;

    editables.forEach((editable) => this.update(editable));
  }

  update(editable: EditableType) {
    const state = this.plugins.unserialize(editable) as EditableType;
    this.store.dispatch(updateEditable(state));
  }

  public setLang(lang: string) {
    this.store.dispatch(setLang(lang));
  }

  /**
   * @deprecated in order to reduce api surface, this api gets removed in the future. Please file an issue with your use case if you still need it
   */
  public refreshEditables = () => {
    this.store.getState().reactPage.editables.present?.forEach((editable) => {
      if (!isProduction) {
        // tslint:disable-next-line:no-console
        console.log(this.plugins.serialize(editable));
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.update(this.plugins.serialize(editable));
    });
  };

  public getNode = (editableId: string, nodeId: string) => {
    // FIXME: this is inefficient
    return findNodeInState(this.store.getState(), editableId, nodeId);
  };
}

export const createEmptyState: () => EditableType = () =>
  ({ id: v4(), cells: [] } as EditableType);

export default Editor;
