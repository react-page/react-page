import { CellPlugin } from './plugins';

import { Languages } from '../EditorStore';
import { ChildConstraints } from './constraints';
import { Components } from './components';

export type CellSpacing = {
  x: number;
  y: number;
};

/**
 * This are the options of the editor. Basically anything that isn't the value or a callback.
 */
export type Options = {
  /**
   * an array of cell plugins. These plugins can be added as cells and usually render a component and a control.
   * @see CellPlugin
   */
  cellPlugins: CellPlugin[];
  /**
   * all languages that can be selected for the content
   */
  languages?: Languages;

  /**
   * defines constraints about the nodes that the editor can have
   */
  childConstraints?: ChildConstraints;

  /**
   * Experimental.
   * indicates whether the plugins might change while the Editor is mounted. Make sure that you only change the references to the plugins,
   * when you actually want to change a plugin.
   * Leave this to false if you don't want to change plugins while editor is mounted.
   */
  pluginsWillChange?: boolean;

  /**
   * Internal component overrides.
   */
  components?: Components;

  /**
   * Sets the size of the cell grid gutters in pixels.
   */
  cellSpacing?: number | CellSpacing;

  /**
   * whether its possible to resize in edit mode
   */
  allowResizeInEditMode?: boolean;
  /**
   * whether its possible to drag cells around in edit mode
   */
  allowMoveInEditMode?: boolean;

  /**
   * Use this function to replace labels for i18n support.
   * @param key the key of the translation (currently the english translation)
   */
  uiTranslator?: (key: string) => string | null;
};
