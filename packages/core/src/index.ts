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

// @flow
/* eslint-disable no-use-before-define, no-underscore-dangle */
import { v4 } from 'uuid';
import Editable from './components/Editable';
import createStore from './store';
import { actions, ActionsTypes } from './actions';
import { selectors } from './selector';
import PluginService from './service/plugin';
import pluginDefault from './service/plugin/default';
import { Editable as EditableType } from './types/editable';
import forEach from 'ramda/src/forEach';
import HTML5Backend, { NativeTypes } from 'react-dnd-html5-backend';
import { DragDropContext as dragDropContext } from 'react-dnd';
import { oryReducer } from './reducer';
import { Store } from 'redux';
import { RootState } from './types/state';

let instance: Editor;

const initialState = () => ({
  ory: {
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

/**
 * Editor is the core interface for dealing with the editor.
 */
class Editor {
  store: Store<RootState>;
  plugins: PluginService;
  middleware: [];

  // tslint:disable-next-line:no-any
  dragDropContext: any;
  // tslint:disable-next-line:no-any
  defaultPlugin: any;

  trigger: ActionsTypes;
  query = {};

  constructor({
    plugins,
    middleware = [],
    editables = [],
    defaultPlugin = pluginDefault,
    dragDropBackend,
    store,
  }: {
    // tslint:disable-next-line:no-any
    plugins?: { content: [], layout: [], native?: any },
    middleware?: [],
    editables?: EditableType[],
    // tslint:disable-next-line:no-any
    defaultPlugin?: any,
    // tslint:disable-next-line:no-any
    dragDropBackend?: any,
    store?: Store<RootState>
  } = {}) {
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

  refreshEditables = () => {
    // tslint:disable-next-line:no-any
    forEach((editable: any) => {
      // tslint:disable-next-line:no-console
      console.log(this.plugins.serialize(editable));
      // tslint:disable-next-line:no-any
      this.trigger.editable.update(this.plugins.serialize(editable) as any);
    }, this.store.getState().ory.editables.present);
  }

  // tslint:disable-next-line:no-any
  setLayoutPlugins = (plugins: Array<any> = []) => {
    this.plugins.setLayoutPlugins(plugins);
    this.refreshEditables();
  }

  // tslint:disable-next-line:no-any
  addLayoutPlugin = (config: any) => {
    this.plugins.addLayoutPlugin(config);
    this.refreshEditables();
  }

  removeLayoutPlugin = (name: string) => {
    this.plugins.removeLayoutPlugin(name);
    this.refreshEditables();
  }

  // tslint:disable-next-line:no-any
  setContentPlugins = (plugins: Array<any> = []) => {
    this.plugins.setContentPlugins(plugins);
    this.refreshEditables();
  }

  // tslint:disable-next-line:no-any
  addContentPlugin = (config: any) => {
    this.plugins.addContentPlugin(config);
    this.refreshEditables();
  }

  removeContentPlugin = (name: string) => {
    this.plugins.removeContentPlugin(name);
    this.refreshEditables();
  }
}

export { PluginService, Editable, Editor, oryReducer };

export const createEmptyState = () => ({ id: v4(), cells: [] });

export default Editor;
