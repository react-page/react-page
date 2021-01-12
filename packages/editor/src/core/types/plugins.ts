/* eslint-disable @typescript-eslint/ban-types */

import { AnyAction } from 'redux';

import type { Migration } from '../migrations/Migration';
import { Cell, PartialCell, PartialRow } from './node';
import { JsonSchema } from './jsonSchema';
import { ChildConstraints } from './constraints';

export type CellPluginComponentProps<DataT> = {
  /**
   * the cells nodeId
   */
  nodeId: string;
  /**
   * the data to display for that cell
   */
  data: DataT;
  /**
   * Should be called with the new data if the plugin's data changes.
   */
  onChange: DataT extends Record<string, unknown>
    ? (data: Partial<DataT>, options?: { notUndoable: boolean }) => void
    : (data: unknown, options?: { notUndoable: boolean }) => void;

  /**
   * call this to remove the cell
   */
  remove?: () => void; // removes the plugin
  /**
   * the configuration of the plugins
   */
  pluginConfig: CellPlugin<DataT>;

  /**
   * if the cell is currently in readOnly mode.
   */
  readOnly: boolean;

  /**
   * if true, the cell is currently focused.
   */
  focused: boolean;

  /**
   * the current language of your editor
   */
  lang?: string;

  /**
   * whether the editor is in preview mode
   */
  isPreviewMode: boolean;
  /**
   * whether the editor is in edit mode
   */
  isEditMode: boolean;
};

export type CellPluginRenderer<DataT> = React.ComponentType<
  CellPluginComponentProps<DataT> & {
    children?: React.ReactNode;
  }
>;

export type CellPluginCustomControlsComonent<DataT> = React.ComponentType<
  CellPluginComponentProps<DataT>
>;
/**
 * controls where you can provide a custom component to render the controls.
 */
export type CustomControlsDef<DataT> = {
  Component: CellPluginCustomControlsComonent<DataT>;
  type: 'custom';
};

/**
 * autoform control type automatically generates a form for you.
 */
export type AutoformControlsDef<DataT> = {
  /**
   * a JSONSchema. this will auto-generate a form for the plugin
   */
  schema?: DataT extends Record<string, unknown> ? JsonSchema<DataT> : unknown;
  /**
   * how many columns should be used for the form
   */
  columnCount?: number;
  /**
   * autoform type automatically generates a form for you.
   */
  type: 'autoform';
};

/**
 * All available type of controls
 */
export type ControlsDef<DataT> = { dark?: boolean } & (
  | AutoformControlsDef<DataT>
  | CustomControlsDef<DataT>
);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CellPlugin<DataT = unknown, DataSerializedT = DataT> = {
  /**
   * the plugins unique id. Only one plugin with the same id may be used
   */
  id: string;

  /**
   * the plugins human readable title of the plugin
   */
  title?: string;

  /**
   * The description appearing below text in the menu
   */
  description?: string;

  /**
   * the plugin's name
   * @deprecated please set id
   */
  name?: string;

  /**
   * The Human readable title of the plugin
   * @deprecated please set title
   */
  text?: string;

  /**
   * the plugin's version
   */
  version: number;

  /**
   * migrations to run to update the data from the initial version to the current version.
   * You need to a add a migration if your data type changes. In this case, bump @see version
   */
  migrations?: Migration[];

  /**
   * controls define how the user can interact with this cell. @see ControlsDef
   */
  controls?: ControlsDef<DataT>;

  /**
   * The Component to render both in readOnly and in edit mode. It will receive the current data to display among other props (@see CellPluginRenderer)
   * Don't use any internal hooks that we provide in the Renderer, as these hooks don't work in readOnly mode.
   */
  Renderer: CellPluginRenderer<DataT>;

  /**
   * pass a Reactcomponent as provider if you need to have some context that is shared between the controls and the renderer
   */
  Provider?: React.ComponentType<CellPluginComponentProps<DataT>>;

  /**
   * the icon to show for this plugin
   */
  icon?: React.ReactNode;

  hideInMenu?: boolean;

  isInlineable?: boolean;
  allowInlineNeighbours?: boolean;

  /**
   * additional style for the wrapping cell
   */
  cellStyle?: React.CSSProperties | (() => React.CSSProperties);

  /**
   * defines constraint about the children that can be added to this Cell.
   * Only useful if you render children in your Component
   *
   */
  childConstraints?: ChildConstraints;

  /**
   * allowClickInside defines whether it accepts clicks in edit mode.
   * Its disabled by default because some components like iframes or so prevent us from selecting a cell
   */
  allowClickInside?: boolean;

  /**
   * wether to not allow to drop another cell plugin in the same row as this plugin
   * is always true if not defined
   */
  allowNeighbour?: (item: Cell) => boolean;

  reducer?: (data: DataT, action: AnyAction) => DataT;

  /**
   * called when a cell with this plugin is added
   */
  createInitialData?: (cell: PartialCell) => DataT;

  /**
   * @deprecated, use createInitialData instead
   */
  createInitialState?: (cell: PartialCell) => DataT;

  /**
   * if your cell has an internal layout (--> child rows), you can define initial rows to add, when a cell with this plugin is added
   */
  createInitialChildren?: () => PartialRow[];

  serialize?: (data: DataT) => DataSerializedT;
  unserialize?: (raw: DataSerializedT) => DataT;
  handleRemoveHotKey?: (e: Event, node: Cell) => Promise<void>;
  handleFocusNextHotKey?: (e: Event, node: Cell) => Promise<void>;
  handleFocusPreviousHotKey?: (e: Event, node: Cell) => Promise<void>;
};
