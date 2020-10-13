// TODO: get rid of this class
import { Middleware, Store } from 'redux';
import { v4 } from 'uuid';
import { selectors } from './selector';
import { PluginBase, Plugins } from './service/plugin/classes';
import pluginDefault from './service/plugin/default';
import createStore from './store';
import { EditableType } from './types/editable';
import { RootState } from './types/state';
import { setLang } from './actions/setting';
import { findNodeInState } from './selector/editable';
import { createContext } from 'react';
import { updateEditable } from './actions/editables';
import { migrateEditable } from './migrations/migrate';

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
  plugins?: PluginBase[];
  middleware?: [];
  editables?: EditableType[];
  defaultPlugin?: PluginBase;

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
  plugins: PluginBase[];
  middleware: Middleware[];

  defaultPlugin: PluginBase;

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
    this.plugins = plugins;
    this.middleware = middleware;
    this.query = selectors(this.store);
    this.defaultPlugin = defaultPlugin;

    this.languages = languages;

    editables.forEach((editable) => this.update(editable));
  }

  update(editable: EditableType) {
    const data = migrateEditable(editable, this.plugins);

    this.store.dispatch(updateEditable(data));
  }

  public setLang(lang: string) {
    this.store.dispatch(setLang(lang));
  }

  public getNode = (editableId: string, nodeId: string) => {
    // FIXME: this is inefficient
    return findNodeInState(this.store.getState(), editableId, nodeId);
  };
}

export const createEmptyState: () => EditableType = () =>
  ({ id: v4(), cells: [] } as EditableType);

export default Editor;
