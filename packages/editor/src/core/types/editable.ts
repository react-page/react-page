import { CellPlugin } from './plugins';

import { Languages } from '../EditorStore';
export type I18nField<T> = {
  [lang: string]: T;
};

type NodeBase = {
  id: string;
};
export type Cell = NodeBase & {
  rows?: Row[];
  plugin?: {
    id: string;
    version: number;
  };

  dataI18n?: I18nField<Record<string, unknown>>;

  /**
   * with of the cell relative to the parent row in units of 1/12. 12 means full width, 6 means half. and so on.
   */
  size?: number;

  inline?: string | null;

  isDraft?: boolean;
  isDraftI18n?: I18nField<boolean>;

  hasInlineNeighbour?: string;
};

/**
 * simpler definition for Row, used to create a new row,
 * can also be just an array of PartialCell
 */
export type PartialRow =
  | PartialCell[]
  | (Omit<Partial<Row>, 'cells'> & {
      cells?: PartialCell[];
    });

/**
 * simpler definition for Cell, used to create a new row
 */
export type PartialCell = Omit<Partial<Cell>, 'rows' | 'plugin'> & {
  rows?: PartialRow[];
  plugin?: Cell['plugin'] | string;
  /**set data in default lang */
  data?: Record<string, unknown>;
};

export const isRow = (node: Node): node is Row => {
  return Object.prototype.hasOwnProperty.call(node, 'cells');
};

export type NodeWithAncestors = {
  node: Node;
  ancestors: Node[];
};

export type Row = NodeBase & {
  cells: Cell[];
};

export type Node = Row | Cell;

export type Levels = {
  left: number;
  right: number;
  above: number;
  below: number;
};

/**
 * The value of the Editor. Don't worry too much about the internals as this might change in future versions.
 */
export type Value = {
  id: string;
  rows: Row[];
  version: number;
};

export type Editables = {
  past: Value[];
  present: Value[];
  future: Value[];
};

export type NewIds = {
  item: string;
  cell: string;
  others: [string, string, string];
};

export type SimplifiedModesProps = {
  allowResizeInEditMode?: boolean;
  editModeResizeHandle?: JSX.Element;
  allowMoveInEditMode?: boolean;
};

// DND

export type CellDrag = {
  type: 'cell';
  cell: Cell;
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
   * Experimental.
   * indicates whether the plugins might change while the Editor is mounted. Make sure that you only change the references to the plugins,
   * when you actually want to change a plugin.
   * Leave this to false if you don't want to change plugins while editor is mounted.
   */
  pluginsWillChange?: boolean;
} & SimplifiedModesProps;
