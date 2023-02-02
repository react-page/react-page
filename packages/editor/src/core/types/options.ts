import type { Theme } from '@mui/material';
import type { BackendFactory } from 'dnd-core';
import type { Middleware, Store } from 'redux';
import type { DisplayModes } from '../actions/display';
import type { Languages } from '../EditorStore';
import type { RootState } from '../types';
import type { Components } from './components';
import type { ChildConstraints } from './constraints';

/**
 * This are the options of the editor
 */
export type Options = {
  /**
   * all languages that can be selected for the content
   */
  languages?: Languages;

  /**
   * defines constraints about the nodes that the editor can have
   */
  childConstraints?: ChildConstraints;

  /**
   * Internal component overrides.
   */
  components?: Components;

  /**
   * whether its possible to resize in edit mode
   */
  allowResizeInEditMode?: boolean;
  /**
   * whether its possible to drag cells around in edit mode
   */
  allowMoveInEditMode?: boolean;

  /**
   * enable zoom function
   */
  zoomEnabled?: boolean;

  /**
   * enable undo redo option
   */
  undoRedoEnabled?: boolean;

  /**
   * enable edit option
   */
  editEnabled?: boolean;

  /**
   * enable insert option
   */
  insertEnabled?: boolean;

  /**
   * enable layout option
   */
  layoutEnabled?: boolean;

  /**
   * enable resize option
   */
  resizeEnabled?: boolean;

  /**
   * enable preview option
   */
  previewEnabled?: boolean;

  /**
   * set the zoom factors. Defaults to [1, 0.75, 0.5, 0.25]
   */
  zoomFactors?: number[];

  /**
   * whether to show move buttons in layout mode
   */
  showMoveButtonsInLayoutMode?: boolean;

  /**
   * whether to show move buttons in bottom toolbar
   */
  showMoveButtonsInBottomToolbar?: boolean;

  /**
   * Use this function to replace labels for i18n support.
   * @param key the key of the translation (currently the english translation)
   */
  uiTranslator?: ((key?: string | null) => string | null) | null;

  /**
   * Use this to override the default html backend for react-dnd
   */
  dndBackend?: BackendFactory;
  /**
   * disable blur all
   */
  blurGateDisabled?: boolean;
  /**
   * when blur all, change to this mode
   */
  blurGateDefaultMode?: DisplayModes;
  /**
   * pass custom redux store:. Might get deprecated in the future
   */
  store?: Store<RootState> | null;
  /**
   * pass custom redux middleware:. Might get deprecated in the future
   */
  middleware?: Middleware[];

  /**
   * set the position of the sidebar. Possible values:
   * - rightAbsolute (default): position it right on the screen absolutly
   * - rightRelative: immediatly right of the content
   * - leftRelative: immediatly left of the content
   *
   * Possible, but does not yet work proplery:
   * - leftAbsolute: left absolute on the screen
   */
  sidebarPosition?:
    | 'rightAbsolute'
    | 'rightRelative'
    | 'leftAbsolute'
    | 'leftRelative';
  /**
   * hide the editor sidebar
   */
  hideEditorSidebar?: boolean;

  customOptions?: React.ComponentType[];
  /**
   * pass a custom theme to the ui (mui)
   */
  uiTheme?: Theme;
  /**
   * whether to show errors in cells or swallow them. It will log them to the console
   */
  shouldShowErrorInCells?: boolean;
};
