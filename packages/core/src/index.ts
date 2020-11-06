export type { BackendFactory as DndBackend } from 'dnd-core';
export { DropTarget, DragSource } from 'react-dnd';
import { Actions } from './actions';
import Editable from './components/Editable';
import EditorStore, {
  createEmptyState,
  CoreEditorProps,
  Languages,
} from './EditorStore';

import lazyLoad from './helper/lazyLoad';
import Provider from './Provider';
import { reducer } from './reducer';

import { connect, ReduxContext, ReduxProvider } from './reduxConnect';
import { Selectors } from './selector';
import i18n from './service/i18n';
import {
  CellPluginComponentProps,
  CellPlugin,
  Plugins,
  Plugin,
} from './service/plugin/classes';
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

const Editor = EditorStore;
export {
  deepEquals,
  isRow,
  setAllSizesAndOptimize,
  Migration,
  createEmptyState,
  CoreEditorProps,
  Plugins,
  Plugin,
  Cell,
  EditableType,
  Row,
  CellPluginComponentProps,
  CellPlugin,
  /**
   * @deprecated
   */
  Actions,
  Selectors,
  RootState,
  i18n,
  /**
   * @deprecated Editor was renamed to EditorStore
   */
  Editor,
  EditorStore,
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
