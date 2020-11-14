/* eslint-disable @typescript-eslint/ban-types */

import { AnyAction } from 'redux';

import type { Migration } from '../migrations/Migration';
import { Cell, PartialCell, PartialRow } from './editable';
import { JsonSchema } from './jsonSchema';

export type Plugin = CellPlugin;
export type Plugins = Plugin[];

export type CellPluginComponentProps<DataT> = {
  nodeId: string;
  data: DataT;
  /**
   * Should be called with the new data if the plugin's data changes.
   */
  onChange: DataT extends Record<string, unknown>
    ? (data: Partial<DataT>, options?: { notUndoable: boolean }) => void
    : (data: unknown, options?: { notUndoable: boolean }) => void;
  remove?: () => void; // removes the plugin
  pluginConfig: CellPlugin<DataT>;

  /**
   * if the cell is currently in readOnly mode.
   */
  readOnly: boolean;

  /**
   * if true, the cell is currently focused.
   */
  focused: boolean;

  lang?: string;

  isPreviewMode: boolean;
  isEditMode: boolean;
};

export type AutoformControlsDef<DataT> = {
  /**
   * a JSONSchema. this will auto-generate a form for the plugin
   */

  schema?: DataT extends Record<string, unknown> ? JsonSchema<DataT> : unknown;
  columnCount?: number;

  type: 'autoform';
};

export type CellPluginCustomControlsComonent<DataT> = React.ComponentType<
  CellPluginComponentProps<DataT>
>;
export type CustomControlsDef<DataT> = {
  Component: CellPluginCustomControlsComonent<DataT>;

  type: 'custom';
};

export type CellPluginRenderer<DataT> = React.ComponentType<
  CellPluginComponentProps<DataT> & {
    children?: React.ReactNode;
  }
>;
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

  controls?: ControlsDef<DataT>;

  Renderer: CellPluginRenderer<DataT>;

  /**
   * pass a Reactcomponent as provider if you need to have some context that is shared between the controls and the renderer
   */
  Provider?: React.ComponentType<CellPluginComponentProps<DataT>>;

  IconComponent?: React.ReactNode;

  hideInMenu?: boolean;

  isInlineable?: boolean;
  allowInlineNeighbours?: boolean;

  /**
   * wether to not allow to drop another cell plugin in the same row as this plugin
   * is always true if not defined
   */
  allowNeighbour?: (item: Cell) => boolean;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  serialize?: (data: DataT) => DataSerializedT;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  unserialize?: (raw: DataSerializedT) => DataT;
  handleRemoveHotKey?: (e: Event, node: Cell) => Promise<void>;
  handleFocusNextHotKey?: (e: Event, node: Cell) => Promise<void>;
  handleFocusPreviousHotKey?: (e: Event, node: Cell) => Promise<void>;

  reducer?: (data: DataT, action: AnyAction) => DataT;
  migrations?: Migration[];

  /**
   * called when a cell with this plugin is added
   */
  createInitialData?: (cell: PartialCell) => DataT;

  /**
   * @deprecated, use createInitialData instead
   */
  createInitialState?: (cell: PartialCell) => DataT;

  createInitialChildren?: () => PartialRow[];
};
