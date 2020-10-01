import { DragSource, DropTarget } from 'react-dnd';
import { BackendFactory } from 'dnd-core';

import { Actions } from './actions';
import Editable from './components/Editable';
import Editor, { createEmptyState, CoreEditorProps, Languages } from './Editor';
import { InitialChildrenDef } from './helper/createInitialChildren';
import lazyLoad from './helper/lazyLoad';
import sanitizeInitialChildren from './helper/sanitizeInitialChildren';
import Provider from './Provider';
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
export * from './components/hooks';
import {
  Cell,
  Content,
  EditableType,
  Layout,
  NativeFactory,
  Row,
  SimplifiedModesProps,
} from './types/editable';
import { RootState } from './types/state';
import { setAllSizesAndOptimize } from './reducer/editable/helper/setAllSizesAndOptimize';
import { DisplayModes } from './actions/display';
export { BackendFactory as DndBackend, DropTarget, DragSource };
export {
  setAllSizesAndOptimize,
  Migration,
  createEmptyState,
  CoreEditorProps,
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
  editableReducer, // deprecated
  ReduxProvider,
  connect,
  ReduxContext,
  Languages,
  SimplifiedModesProps,
  DisplayModes,
};
// newer api
export { Provider, Editable, lazyLoad };

export default Editor;
