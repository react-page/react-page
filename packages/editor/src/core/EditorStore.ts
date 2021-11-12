import type { Middleware, Store } from 'redux';

import createStore from './store';
import type { Value } from './types/node';
import type { RootState } from './types/state';
import { setLang } from './actions/setting';
import { findNodeInState } from './selector/editable';
import { createContext } from 'react';
import { createId } from './utils/createId';
import { CURRENT_EDITABLE_VERSION } from './migrations/EDITABLE_MIGRATIONS';

export const EditorContext = createContext<EditorStore | null>(null);

export type Languages = Array<{
  lang: string;
  label: string;
}>;
export interface CoreEditorProps<T extends RootState = RootState> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  middleware?: Middleware[];

  store?: Store<T> | null;
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

export const createEmptyState: () => Value = () =>
  ({ id: createId(), rows: [], version: CURRENT_EDITABLE_VERSION } as Value);

export default EditorStore;
