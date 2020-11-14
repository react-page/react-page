import { CellPlugin } from './plugins';
import has from 'lodash.has';
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
  return has(node, 'cells');
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

export type EditableType = {
  id: string;
  rows: Row[];
  version: number;
};

export type Editables = {
  past: EditableType[];
  present: EditableType[];
  future: EditableType[];
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

export type Options = {
  plugins: CellPlugin[];
  languages?: Languages;
  pluginsWillChange?: boolean;
} & SimplifiedModesProps;
