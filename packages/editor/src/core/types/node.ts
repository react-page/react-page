export type I18nField<T> = {
  [lang: string]: T;
};

type NodeBase = {
  id: string;
};
export type Cell = NodeBase & {
  rows?: Row[] | null;
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
  isRoot?: boolean;
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
  rows?: PartialRow[] | null;
  plugin?: Cell['plugin'] | string;
  /**set data in default lang */
  data?: Record<string, unknown>;
};

export const isRow = (node: Partial<Node> | null): node is Row => {
  return node ? Object.prototype.hasOwnProperty.call(node, 'cells') : false;
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

export type InsertNewCell = PartialCell;

/**
 * The value of the Editor. Don't worry too much about the internals as this might change in future versions.
 */
export type Value = {
  id: string;
  rows: Row[];
  version: number;
};

export type ValueWithHistory = {
  past: Value[];
  present: Value | null;
  future: Value[];
};

export type NewIds = {
  item: string;
  cell: string;
  others: [string, string, string];
};

// DND

export type CellDrag = {
  cell: PartialCell | null;
};
