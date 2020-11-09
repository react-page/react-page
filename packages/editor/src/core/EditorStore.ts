// TODO: get rid of this class
import { Middleware, Store } from 'redux';
import { v4 } from 'uuid';

import createStore from './store';
import { EditableType } from './types/editable';
import { RootState } from './types/state';
import { setLang } from './actions/setting';
import { findNodeInState } from './selector/editable';
import { createContext } from 'react';

export const EditorContext = createContext<EditorStore>(null);

export type Languages = Array<{
  lang: string;
  label: string;
}>;
export interface CoreEditorProps<T extends RootState = RootState> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  middleware?: Middleware[];

  store?: Store<T>;
  initialState: RootState;
}

class EditorStore<T extends RootState = RootState> {
  store: Store<RootState>;
  middleware: Middleware[];

  constructor({ middleware = [], store, initialState }: CoreEditorProps<T>) {
    this.store = store || createStore(initialState, middleware);
    this.middleware = middleware;
  }

  public setLang(lang: string) {
    this.store.dispatch(setLang(lang));
  }

  public getNodeWithAncestors = (nodeId: string) => {
    return findNodeInState(this.store.getState(), nodeId);
  };

  public getNode = (nodeId: string) => {
    return findNodeInState(this.store.getState(), nodeId)?.node;
  };
}

export const createEmptyState: () => EditableType = () =>
  ({ id: v4(), rows: [] } as EditableType);

export default EditorStore;
