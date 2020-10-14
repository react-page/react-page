import { v4 } from 'uuid';
import { Cell, EditableType, Row } from '../..';
import { Migration } from '../Migration';
type I18nField<T> = {
  [lang: string]: T;
};

type PluginOld = {
  name: string;
  version: string;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Content<StateT = any> = {
  plugin: PluginOld;
  state?: StateT;
  stateI18n?: I18nField<StateT>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Layout<StateT = any> = {
  plugin: PluginOld;
  state?: StateT;
  stateI18n?: I18nField<StateT>;
};

type NodeBase = {
  id: string;
  levels?: Levels;
  hoverPosition?: string;
};

type CellOld = NodeBase & {
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

type RowOld = NodeBase & {
  cells: CellOld[];
};

type Levels = {
  left: number;
  right: number;
  above: number;
  below: number;
};

type AbstractEditable<T> = {
  id: string;
  cells: Array<T>;
  cellOrder?: Array<{ id: string; isLeaf: boolean }>;
};

type OldEditableType = AbstractEditable<CellOld>;

export default new Migration<OldEditableType, EditableType>({
  fromVersionRange: '*',
  toVersion: '1.0.0',

  migrate({ cells, ...rest }) {
    const migrateRow = ({ cells, ...rest }: RowOld): Row => {
      return {
        ...rest,
        cells: cells?.map(migrateCell) ?? [],
      };
    };

    const migrateCell = ({ content, layout, rows, ...rest }: CellOld): Cell => {
      const contentOrLayout = layout ?? content;

      return {
        dataI18n: contentOrLayout.stateI18n ?? {
          default: contentOrLayout.state,
        },
        rows: rows ? rows.map(migrateRow) : [],
        plugin: contentOrLayout
          ? {
              id: contentOrLayout.plugin.name,
              version: contentOrLayout.plugin.version,
            }
          : null,
        ...rest,
        id: rest.id ? rest.id : v4(),
      };
    };
    return {
      cells: cells?.map(migrateCell) ?? [],
      ...rest,
      version: '*', // will be overridden later
    };
  },
});
