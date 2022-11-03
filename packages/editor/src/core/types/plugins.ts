import type { Migration } from '../migrations/Migration';
import type { Cell, PartialCell, PartialRow } from './node';
import type { JsonSchema } from './jsonSchema';
import type { ChildConstraints } from './constraints';
import type { CellSpacing } from './renderOptions';
import type { PropsWithChildren } from 'react';

export type DataTType = Record<string, unknown>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DataTAny = any;

export type CellPluginOnChangeOptions = {
  /**
   * force the language to update the data.
   * If not set, will use the current language
   */
  lang?: string;
  /**
   * whether to push the change to the undo-queue
   */
  notUndoable?: boolean;
};

export type CellPluginComponentProps<DataT extends DataTType = DataTAny> = {
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
  onChange: (data: Partial<DataT>, options?: CellPluginOnChangeOptions) => void;

  /**
   * call this to remove the cell
   */
  remove?: () => void; // removes the plugin
  /**
   * the configuration of the plugins
   */
  pluginConfig?: CellPlugin<DataT> | null;

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

export type CellPluginMissingProps = Omit<
  CellPluginComponentProps,
  'pluginConfig'
> & {
  pluginId: string;
};

export type CellPluginRenderer<DataT extends DataTType = DataTAny> =
  React.ComponentType<
    CellPluginComponentProps<DataT> & {
      children?: React.ReactNode;
    }
  >;

export type CellPluginCustomControlsComonent<DataT extends DataTType> =
  React.ComponentType<CellPluginComponentProps<DataT>>;

export type CellPluginAutoformControlsContent<DataT extends DataTType> =
  React.ComponentType<
    {
      columnCount?: number;
    } & CellPluginComponentProps<DataT>
  >;

/**
 * controls where you can provide a custom component to render the controls.
 */
export type CustomControlsDef<DataT extends DataTType> = {
  Component: CellPluginCustomControlsComonent<DataT>;
  type: 'custom';
};

/**
 * autoform control type automatically generates a form for you.
 */
export type AutoformControlsDef<DataT extends DataTType> = {
  /**
   * a JSONSchema. this will auto-generate a form for the plugin
   */
  schema?: JsonSchema<DataT>;
  /**
   * how many columns should be used for the form
   */
  columnCount?: number;
  /**
   * autoform type automatically generates a form for you.
   */
  type: 'autoform';

  /**
   * You can customize the form content by passing a custom component. It will be rendered inside the Autoform.
   * This can be used to adjust the layout of the form using `<Autofield />`
   */
  Content?: CellPluginAutoformControlsContent<DataT>;
};

export type SubControlsDef<T extends DataTType = DataTAny> = {
  title: string;
  controls: ControlsDef<T>;
};

export type ControlsDefList<DataT extends DataTType = DataTAny> = Array<
  SubControlsDef<Partial<DataT>>
>;

/**
 * All available type of controls
 */
export type ControlsDef<DataT extends DataTType = DataTAny> =
  | AutoformControlsDef<DataT>
  | CustomControlsDef<DataT>
  | ControlsDefList<DataT>;

export type PluginHandler = (
  e: Event,
  node?: Cell | null
) => void | Promise<void>;

export type CellPlugin<
  DataT extends DataTType = DataTAny,
  DataSerializedT = DataT
> = {
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
   * The Component to render both in readOnly and in edit mode. It will receive the current data to display among other props (@see CellPluginRenderer)
   * Don't use any internal hooks that we provide in the Renderer, as these hooks don't work in readOnly mode.
   */
  Renderer: CellPluginRenderer<DataT>;

  /**
   * pass a Reactcomponent as provider if you need to have some context that is shared between the controls and the renderer
   */
  Provider?: React.ComponentType<
    PropsWithChildren<CellPluginComponentProps<DataT>>
  >;

  /**
   * by default, Provider is also rendered in readOnly. You can disable that by setting disableProviderInReadOnly to true
   *
   */
  disableProviderInReadOnly?: boolean;

  /**
   * the icon to show for this plugin
   */
  icon?: React.ReactNode;

  hideInMenu?: boolean;

  isInlineable?: boolean;
  allowInlineNeighbours?: boolean;

  /**
   * additional style for the inner cell
   */
  cellStyle?: React.CSSProperties | ((data: DataT) => React.CSSProperties);

  /**
   * additional classname(s) for the inner cell
   */
  cellClassName?: string | ((data: DataT) => string);

  /**
   * cell spacing setting for the internal layout (nested cells) if any
   */
  cellSpacing?:
    | number
    | CellSpacing
    | ((data: DataT) => number | CellSpacing | null);

  /**
   * defines constraint about the children that can be added to this Cell.
   * Only useful if you render children in your Component
   *
   */
  childConstraints?: ChildConstraints;

  /**
   * define or constrain the plugins that can be added as children to this plugin
   */
  cellPlugins?:
    | CellPluginList
    | ((cellPlugins: CellPluginList, data: DataT) => CellPluginList);

  /**
   * allowClickInside defines whether it accepts clicks in edit mode.
   * Its disabled by default because some components like iframes or so prevent us from selecting a cell
   */
  allowClickInside?: boolean;

  /**
   * wether to not allow to drop another cell plugin in the same row as this plugin
   * is always true if not defined
   */
  allowNeighbour?: (item: PartialCell) => boolean;

  /**
   * if your cell has an internal layout (--> child rows), you can define initial rows to add, when a cell with this plugin is added
   */
  createInitialChildren?: () => PartialRow[];

  handleRemoveHotKey?: PluginHandler;
  handleFocusNextHotKey?: PluginHandler;
  handleFocusPreviousHotKey?: PluginHandler;

  // all data related properties
  /**
   * controls define how the user can interact with this cell. @see ControlsDef
   */
  controls?: ControlsDef<DataT>;

  /**
   * called when a cell with this plugin is added
   */
  createInitialData?: (cell: PartialCell) => DataT;

  /**
   * @deprecated, use createInitialData instead
   */
  createInitialState?: (cell: PartialCell) => DataT;

  serialize?: (data: DataT) => DataSerializedT;
  unserialize?: (raw: DataSerializedT) => DataT;
  /**
   * how to extract raw text from this plugin (e.g. for search indexing)
   */
  getTextContents?: (data: DataT) => string[];
};

export type CellPluginList = CellPlugin[];
