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
  LayoutPlugin,
  Migration,
  PluginProps,
  PluginBase,
  Plugins,
} from './service/plugin/classes';
export * from './components/hooks';
import {
  Cell,
  Content,
  EditableType,
  Layout,
  Row,
  SimplifiedModesProps,
  isRow,
} from './types/editable';
import { RootState } from './types/state';
import { setAllSizesAndOptimize } from './reducer/editable/helper/setAllSizesAndOptimize';
import { DisplayModes } from './actions/display';
import deepEquals from './utils/deepEquals';
export { BackendFactory as DndBackend, DropTarget, DragSource };
export {
  deepEquals,
  isRow,
  setAllSizesAndOptimize,
  Migration,
  createEmptyState,
  CoreEditorProps,
  PluginBase,
  Plugins,
  Cell,
  Content,
  EditableType,
  Layout,
  Row,
  PluginProps,
  ContentPlugin,
  LayoutPlugin,
  Actions,
  Selectors,
  RootState,
  i18n,
  InitialChildrenDef,
  sanitizeInitialChildren,
  PluginService,
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
