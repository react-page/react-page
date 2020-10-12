import { ContentPlugin, LayoutPlugin } from '../service/plugin/classes';
import has from 'lodash.has';
export type I18nField<T> = {
  [lang: string]: T;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Content<StateT = any> {
  plugin: ContentPlugin;
  state?: StateT;
  stateI18n?: I18nField<StateT>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Layout<StateT = any> {
  plugin: LayoutPlugin;
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
export const createCell = (): Cell => ({
  id: '',
  rows: [],
  size: 12,
  hoverPosition: null,
  inline: null,

  resizable: false,
  bounds: { left: 0, right: 0 },
  hasInlineNeighbour: null,

  levels: {
    above: 0,
    below: 0,
    right: 0,
    left: 0,
  },
});
export type Levels = {
  left: number;
  right: number;
  above: number;
  below: number;
};

export const createRow = (): Row => ({
  id: '',
  hoverPosition: null,
  cells: [],
});

export type AbstractEditable<T> = {
  id: string;
  cells: Array<T>;
  cellOrder?: Array<{ id: string; isLeaf: boolean }>;
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
