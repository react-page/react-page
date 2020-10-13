// TODO: get rid of this class
import { Middleware, Store } from 'redux';
import { v4 } from 'uuid';

import { CellPlugin, Plugins } from './service/plugin/classes';

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
  plugins?: CellPlugin[];
  middleware?: [];
  editables?: EditableType[];
  defaultPlugin?: CellPlugin;

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
  middleware: Middleware[];

  constructor({
    middleware = [],

    store,

    lang,
  }: CoreEditorProps<T> = {}) {
    this.store = store || createStore(initialState({ lang: lang }), middleware);
    this.middleware = middleware;
  }

  update(editable: EditableType, { plugins }: { plugins: CellPlugin[] }) {
    const data = migrateEditable(editable, {
      plugins,
      lang: this.store.getState().reactPage.settings.lang,
    });

    this.store.dispatch(updateEditable(data));
  }

  public setLang(lang: string) {
    this.store.dispatch(setLang(lang));
  }

  public getNodeWithAncestors = (editableId: string, nodeId: string) => {
    return findNodeInState(this.store.getState(), editableId, nodeId);
  };

  public getNode = (editableId: string, nodeId: string) => {
    return findNodeInState(this.store.getState(), editableId, nodeId)?.node;
  };
}

export const createEmptyState: () => EditableType = () =>
  ({ id: v4(), cells: [] } as EditableType);

export default Editor;
