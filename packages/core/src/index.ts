import { BackendFactory } from 'dnd-core';
import { DragSource, DropTarget } from 'react-dnd';
import { Actions } from './actions';
import Editable from './components/Editable';
import Editor, { createEmptyState, EditorProps } from './Editor';
import { InitialChildrenDef } from './helper/createInitialChildren';
import lazyLoad from './helper/lazyLoad';
import sanitizeInitialChildren from './helper/sanitizeInitialChildren';
import Provider, { useEditor } from './Provider';
import { reducer } from './reducer';
import { editable as editableReducer } from './reducer/editable';
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
  Migration,
  Plugin,
  PluginProps,
  Plugins,
} from './service/plugin/classes';
import {
  Cell,
  Content,
  EditableType,
  Layout,
  NativeFactory,
  Row,
} from './types/editable';
import { RootState } from './types/state';
export { BackendFactory as DndBackend, DropTarget, DragSource };
export {
  Migration,
  createEmptyState,
  EditorProps,
  Plugin,
  Plugins,
  NativeFactory,
  Cell,
  Content,
  EditableType,
  Layout,
  Row,
  PluginProps,
  ContentPluginConfig,
  ContentPluginProps,
  LayoutPluginConfig,
  LayoutPluginProps,
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
  editableReducer,
  ReduxProvider,
  connect,
  ReduxContext,
};
// newer api
export { Provider, Editable, useEditor, lazyLoad };

export default Editor;
