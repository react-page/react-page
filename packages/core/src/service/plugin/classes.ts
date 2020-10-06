/* eslint-disable @typescript-eslint/ban-types */

import { AnyAction } from 'redux';
import semver from 'semver';
import { InitialChildrenDef } from '../../helper/createInitialChildren';
import { Cell } from '../../types/editable';

export type Plugins = {
  layout?: LayoutPluginConfig[];
  content?: ContentPluginConfig[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PluginConfig<StateT = {}> = {
  /**
   * the plugin's name
   */
  name: string;

  /**
   * The Human readable title of the plugin
   */
  text?: string;

  /**
   * The description appearing below text in the menu
   */
  description?: string;

  /**
   * the plugin's version
   */
  version: string;

  Component?: PluginComponentType<PluginProps<StateT>>;

  IconComponent?: React.ReactNode;

  hideInMenu?: boolean;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  serialize?: (state: StateT) => any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  unserialize?: (raw: any) => StateT;
  handleRemoveHotKey?: (e: Event, node: Cell) => Promise<void>;
  handleFocusNextHotKey?: (e: Event, node: Cell) => Promise<void>;
  handleFocusPreviousHotKey?: (e: Event, node: Cell) => Promise<void>;

  reducer?: (state: StateT, action: AnyAction) => StateT;
  migrations?: Migration[];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createInitialState?: (...args: any[]) => StateT;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ContentPluginConfig<T = any> = PluginConfig<T> & {
  allowInlineNeighbours?: boolean;

  isInlineable?: boolean;

  Component?: PluginComponentType<ContentPluginProps<T>>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type LayoutPluginConfig<T = any> = PluginConfig<T> & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createInitialChildren?: () => InitialChildrenDef;
  Component?: PluginComponentType<LayoutPluginProps<T>>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PluginComponentType<T = any> = React.ComponentType<T>;

export type PluginProps<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  StateT = any
> = {
  /**
   * cell
   */
  cell: Cell;

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

  /**
   * the plugin's state. (already translated)
   */
  state: StateT;

  lang?: string;

  editable?: string;
  remove?: () => void; // removes the plugin

  /**
   * Should be called with the new state if the plugin's state changes.
   */
  onChange(state: Partial<StateT>): void;

  isPreviewMode: boolean;
  isEditMode: boolean;
  pluginConfig: PluginConfig<StateT>;
};

export type ContentPluginProps<T = any> = PluginProps<T> & {
  pluginConfig: ContentPluginConfig<T>;
};

export type LayoutPluginProps<T = any> = PluginProps<T> & {
  pluginConfig: LayoutPluginConfig<T>;
};

export interface MigrationConfig {
  toVersion: string;
  fromVersionRange: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  migrate: (state: any) => any;
}

/**
 * @class the class used to migrate plugin content between toVersion
 */
export class Migration {
  fromVersionRange: string;
  toVersion: string;
  constructor(config: MigrationConfig) {
    const { toVersion, migrate, fromVersionRange } = config;

    if (
      !migrate ||
      !toVersion ||
      !fromVersionRange ||
      semver.valid(toVersion) === null ||
      semver.validRange(fromVersionRange) === null
    ) {
      throw new Error(
        `A migration toVersion, fromVersionRange and migrate function must be defined, got ${JSON.stringify(
          config
        )}`
      );
    }
    this.toVersion = toVersion;
    this.migrate = migrate;
    this.fromVersionRange = fromVersionRange;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  migrate = (state: any): any => state;
}
