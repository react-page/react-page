/*
 * This file is part of ORY Editor.
 *
 * ORY Editor is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * ORY Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with ORY Editor.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @license LGPL-3.0
 * @copyright 2016-2018 Aeneas Rekkas
 * @author Aeneas Rekkas <aeneas+oss@aeneas.io>
 *
 */

import forEach from 'ramda/src/forEach';
import { NativeTypes } from 'react-dnd-html5-backend-cjs';
import { Middleware, Store } from 'redux';
import { v4 } from 'uuid';
import { actions, Actions, ActionsTypes } from './actions';
import DragDropProvider from './components/DragDropProvider';
import Editable from './components/Editable';
import { isProduction } from './const';
import { InitialChildrenDef } from './helper/createInitialChildren';
import lazyLoad from './helper/lazyLoad';
import sanitizeInitialChildren from './helper/sanitizeInitialChildren';
import { shouldPureComponentUpdate } from './helper/shouldComponentUpdate';
import { reducer } from './reducer';
import { connect, ReduxContext, ReduxProvider } from './reduxConnect';
import { selectors, Selectors } from './selector';
import i18n from './service/i18n';
import PluginService from './service/plugin';
import {
  ContentPlugin,
  ContentPluginConfig,
  ContentPluginProps,
  LayoutPlugin,
  LayoutPluginConfig,
  LayoutPluginProps,
  Plugin,
  Plugins
} from './service/plugin/classes';
import pluginDefault from './service/plugin/default';
import createStore from './store';
import { EditableType, NativeFactory } from './types/editable';
import { RootState } from './types/state';

export { shouldPureComponentUpdate };
export {
  Plugin,
  Plugins,
  EditableType,
  ContentPluginConfig,
  ContentPluginProps,
  LayoutPluginConfig,
  LayoutPluginProps,
  NativeFactory,
  Actions,
  Selectors,
  RootState,
  i18n,
  InitialChildrenDef,
  sanitizeInitialChildren,
  PluginService,
  ContentPlugin,
  LayoutPlugin,
  Editable,
  Editor,
  reducer,
  lazyLoad,
  ReduxProvider,
  DragDropProvider,
  connect,
  ReduxContext
};

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
  defaultPlugin?: ContentPluginConfig;

  store?: Store<T>;
}

/**
 * Editor is the core interface for dealing with the editor.
 */
class Editor<T extends RootState = RootState> {
  store: Store<RootState>;
  plugins: PluginService;
  middleware: Middleware[];

  defaultPlugin: ContentPluginConfig;

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
