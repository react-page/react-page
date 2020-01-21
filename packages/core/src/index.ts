import { BackendFactory } from 'dnd-core';
import { DragSource, DropTarget } from 'react-dnd';
import { Actions } from './actions';
import Editable from './components/Editable';
import Editor, { createEmptyState, EditorProps } from './Editor';
import { InitialChildrenDef } from './helper/createInitialChildren';
import lazyLoad from './helper/lazyLoad';
import sanitizeInitialChildren from './helper/sanitizeInitialChildren';
import { shouldPureComponentUpdate } from './helper/shouldComponentUpdate';
import Provider, { useEditor } from './Provider';
import { reducer } from './reducer';
import { connect, ReduxContext, ReduxProvider } from './reduxConnect';
import { Selectors } from './selector';
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
import { EditableType, NativeFactory } from './types/editable';
import { RootState } from './types/state';

export { BackendFactory as DndBackend, DropTarget, DragSource };
export {
  shouldPureComponentUpdate,
  createEmptyState,
  EditorProps,
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
  Editor,
  reducer,
  ReduxProvider,
  connect,
  ReduxContext
};
// newer api
export { Provider, Editable, useEditor, lazyLoad };

export default Editor;
