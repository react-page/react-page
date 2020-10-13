import { ContentPlugin, PluginBase } from '../service/plugin/classes';
import has from 'lodash.has';
export type I18nField<T> = {
  [lang: string]: T;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Content<StateT = any> {
  plugin: ContentPlugin;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Layout<StateT = any> {
  plugin: PluginBase;
  state?: StateT;
  stateI18n?: I18nField<StateT>;
}

type NodeBase = {
  id: string;
  levels?: Levels;
  hoverPosition?: string;
};
export type Cell = NodeBase & {
  rows?: Row[];
  plugin?: {
    id: string;
    version: string;
  };

  data?: unknown;
  dataI18n?: I18nField<unknown>;

  content?: Content;
  layout?: Layout;

  size?: number;

  inline?: string | null;

  isDraft?: boolean;
  isDraftI18n?: I18nField<boolean>;

  resizable?: boolean;
  bounds?: { left: number; right: number };
  hasInlineNeighbour?: string;
};

/**
 * simpler definition for Row, used to create a new row,
 * can also be just an array of PartialCell
 */
export type PartialRow = Partial<Row> | PartialCell[];

/**
 * simpler definition for Cell, used to create a new row
 */
export type PartialCell = Omit<Partial<Cell>, 'rows' | 'plugin'> & {
  rows?: PartialRow[];
  plugin?: Cell['plugin'] | string;
};

export const isRow = (node: Node): node is Row => {
  return has(node, 'cells');
};

export type CellWithAncestors = Cell & {
  ancestors: Node[];
};

export type RowWithAncestors = Row & {
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

export type AbstractEditable<T> = {
  id: string;
  cells: Array<T>;
  cellOrder?: Array<{ id: string; isLeaf: boolean }>;
  version: string;
};

export type EditableType = AbstractEditable<Cell>;

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
  cell: CellWithAncestors;
};

export type Options = {
  plugins: PluginBase[];
} & SimplifiedModesProps;
