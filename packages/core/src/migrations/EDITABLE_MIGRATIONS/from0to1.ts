import { v4 } from 'uuid';
import { Cell, EditableType, Row } from '../..';
import { removeUndefinedProps } from '../../utils/removeUndefinedProps';
import { Migration, sanitizeVersion } from '../Migration';
type I18nField<T> = {
  [lang: string]: T;
};

type PluginOld = {
  name: string;
  version: number | string;
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
};

export type OldEditableType = AbstractEditable<CellOld>;

export default new Migration<OldEditableType, EditableType>({
  fromVersion: 0 as const,
  toVersion: 1 as const,
  migrate({ cells, id }, { lang }) {
    const migrateRow = ({ cells, ...rowRest }: RowOld): Row => {
      return {
        ...rowRest,
        cells: cells?.map(migrateCell) ?? [],
      };
    };

    const migrateCell = ({
      content,
      layout,
      rows,
      ...cellRest
    }: CellOld): Cell => {
      const contentOrLayout = layout ?? content;
      const dataI18n =
        contentOrLayout?.stateI18n ?? contentOrLayout?.state
          ? {
              [lang]: contentOrLayout.state ?? null,
            }
          : undefined;

      const plugin = contentOrLayout
        ? {
            id: contentOrLayout.plugin.name,
            version: sanitizeVersion(contentOrLayout.plugin.version),
          }
        : undefined;
      return removeUndefinedProps({
        ...cellRest,
        rows: rows?.map(migrateRow),
        plugin,
        dataI18n,
        id: cellRest.id ? cellRest.id : v4(),
      });
    };

    return {
      id,
      cells: cells?.map(migrateCell) ?? [],
      version: 0, // will be overridden later
    };
  },
});
