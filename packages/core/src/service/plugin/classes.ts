/* eslint-disable @typescript-eslint/ban-types */

import { AnyAction } from 'redux';

import { Migration } from '../../migrations/Migration';
import {
  Cell,
  CellDrag,
  PartialCell,
  PartialRow,
  Row,
} from '../../types/editable';

export type Plugin = CellPlugin;
export type Plugins = Plugin[];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CellPlugin<DataT = any, DataSerializedT = DataT> = {
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

  Component?: PluginComponentType<CellPluginComponentProps<DataT>>;

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PluginComponentType<T = any> = React.ComponentType<T>;

export type CellPluginComponentProps<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  DataT = any
> = {
  /**
   * node id
   */
  nodeId: string;

  /**
   * if the cell is currently in readOnly mode.
   */
  readOnly: boolean;

  /**
   * if true, the cell is currently focused.
   */
  focused: boolean;

  data: DataT;
  /**
   * @deprecated use data instead (its the same, just renamed)
   */
  state: DataT;

  lang?: string;

  editable?: string;
  remove?: () => void; // removes the plugin

  /**
   * Should be called with the new data if the plugin's data changes.
   */
  onChange(data: Partial<DataT>, options?: { notUndoable: boolean }): void;

  isPreviewMode: boolean;
  isEditMode: boolean;
  pluginConfig: CellPlugin<DataT>;
};
