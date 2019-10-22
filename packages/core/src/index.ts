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

import { v4 } from 'uuid';
import Editable from './components/Editable';
import createStore from './store';
import { actions, ActionsTypes, Actions } from './actions';
import { selectors, Selectors } from './selector';
import PluginService from './service/plugin';
import { ContentPlugin, LayoutPlugin } from './service/plugin/classes';
import pluginDefault from './service/plugin/default';
import { EditableType, NativeFactory } from './types/editable';
import forEach from 'ramda/src/forEach';
import HTML5Backend, { NativeTypes } from 'react-dnd-html5-backend';
import { DragDropContext as dragDropContext } from 'react-dnd';
import { reducer } from './reducer';
import { Store, Middleware } from 'redux';
import { RootState } from './types/state';
import lazyLoad from './helper/lazyLoad';
import {
  Plugins,
  Plugin,
  ContentPluginConfig,
  LayoutPluginConfig,
  ContentPluginProps,
  LayoutPluginProps
} from './service/plugin/classes';
import { isProduction } from './const';
import { shouldPureComponentUpdate } from './helper/shouldComponentUpdate';
export { shouldPureComponentUpdate };
import i18n from './service/i18n';
import { InitialChildrenDef } from './helper/createInitialChildren';
import sanitizeInitialChildren from './helper/sanitizeInitialChildren';
import DragDropContext from './components/DragDropContext';
export {
  Plugin,
  Plugins,
  ContentPluginConfig,
  ContentPluginProps,
  LayoutPluginConfig,
  LayoutPluginProps,
  NativeFactory,
  Actions,
  Selectors,
  RootState,
  i18n,
  DragDropContext,
  InitialChildrenDef,
  sanitizeInitialChildren,
  PluginService,
  ContentPlugin,
  LayoutPlugin,
  Editable,
  Editor,
  reducer,
  lazyLoad
};
let instance: Editor;

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

const dndBackend = HTML5Backend;

export interface EditorProps<T extends RootState = RootState> {
  // tslint:disable-next-line:no-any
  plugins?: Plugins;
  middleware?: [];
  editables?: EditableType[];
  defaultPlugin?: ContentPluginConfig;
  // tslint:disable-next-line:no-any
  dragDropBackend?: any;
  store?: Store<T>;
}

/**
 * Editor is the core interface for dealing with the editor.
 */
class Editor<T extends RootState = RootState> {
  store: Store<RootState>;
  plugins: PluginService;
  middleware: Middleware[];

  // tslint:disable-next-line:no-any
  dragDropContext: any;
  defaultPlugin: ContentPluginConfig;

  trigger: ActionsTypes;
  query = {};

  constructor({
    plugins,
    middleware = [],
    editables = [],
    defaultPlugin = pluginDefault,
    dragDropBackend,
    store,
  }: EditorProps<T> = {}) {
    if (instance) {
      console.warn(
        'You defined multiple instances of the Editor class, this can cause problems.'
      );
    }

    instance = this;
    this.store = store || createStore(initialState(), middleware);
    this.plugins = new PluginService(plugins);
    this.middleware = middleware;
    this.trigger = actions(this.store.dispatch);
    this.query = selectors(this.store);
    this.defaultPlugin = defaultPlugin;
    this.dragDropContext = dragDropContext(dragDropBackend || dndBackend);
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
