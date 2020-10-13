export type { BackendFactory as DndBackend } from 'dnd-core';
export { DropTarget, DragSource } from 'react-dnd';
import { Actions } from './actions';
import Editable from './components/Editable';
import Editor, { createEmptyState, CoreEditorProps, Languages } from './Editor';
import { InitialChildrenDef } from './helper/createInitialChildren';
import lazyLoad from './helper/lazyLoad';
import Provider from './Provider';
import { reducer } from './reducer';

import { connect, ReduxContext, ReduxProvider } from './reduxConnect';
import { Selectors } from './selector';
import i18n from './service/i18n';
import { PluginProps, PluginBase, Plugins } from './service/plugin/classes';
export * from './components/hooks';
import {
  Cell,
  EditableType,
  Row,
  SimplifiedModesProps,
  isRow,
} from './types/editable';
import { RootState } from './types/state';
import { setAllSizesAndOptimize } from './reducer/editable/helper/setAllSizesAndOptimize';
import { DisplayModes } from './actions/display';
import deepEquals from './utils/deepEquals';
import { Migration } from './migrations/Migration';

export {
  deepEquals,
  isRow,
  setAllSizesAndOptimize,
  Migration,
  createEmptyState,
  CoreEditorProps,
  Plugins,
  Cell,
  EditableType,
  Row,
  PluginProps,
  PluginBase,
  /**
   * @deprecated
   */
  Actions,
  Selectors,
  RootState,
  i18n,
  InitialChildrenDef,
  Editor,
  reducer,
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
