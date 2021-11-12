import type { CellPluginList } from '.';

export type CellSpacing = {
  x: number;
  y: number;
};
export type RenderOptions = {
  /**
   * an array of cell plugins. These plugins can be added as cells and usually render a component and a control.
   * @see CellPlugin
   */
  cellPlugins: CellPluginList;

  /**
   * Sets the size of the cell grid gutters in pixels.
   */
  cellSpacing?: number | CellSpacing | null;
};
