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
  Plugins,
} from './service/plugin/classes';
import pluginDefault from './service/plugin/default';
import createStore from './store';
import { EditableType } from './types/editable';
import { RootState } from './types/state';
import { setLang } from './actions/setting';
import { findNodeInState } from './selector/editable';
import { createContext } from 'react';

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);
};

export type Languages = Array<{
  lang: string;
  label: string;
}>;
export interface CoreEditorProps<T extends RootState = RootState> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  plugins?: Plugins;
  middleware?: [];
  editables?: EditableType[];
  defaultPlugin?: ContentPluginConfig | LayoutPluginConfig;

  store?: Store<T>;
  languages?: Languages;
  lang?: string;
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
    this.trigger = actions(this.store.dispatch);
    this.query = selectors(this.store);
    this.defaultPlugin = defaultPlugin;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.trigger.editable.add = update(this) as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.trigger.editable.update = update(this) as any;

    this.languages = languages;

    editables.forEach(this.trigger.editable.add);
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
      this.trigger.editable.update(this.plugins.serialize(editable));
    });
  };

  public getNode = (editableId: string, nodeId: string) => {
    return findNodeInState(this.store.getState(), editableId, nodeId);
  };
}

export const createEmptyState: () => EditableType = () =>
  ({ id: v4(), cells: [] } as EditableType);

export default Editor;
