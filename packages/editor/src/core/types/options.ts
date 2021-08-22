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
   * set the zoom factors. Defaults to [1, 0.75, 0.5, 0.25]
   */
  zoomFactors?: number[];

  /**
   * Use this function to replace labels for i18n support.
   * @param key the key of the translation (currently the english translation)
   */
  uiTranslator?: (key: string) => string | null;

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
  store?: Store<RootState>;
  /**
   * pass custom redux middleware:. Might get deprecated in the future
   */
  middleware?: Middleware[];

  /**
   *
   */
  hideEditorSidebar?: boolean;
};
