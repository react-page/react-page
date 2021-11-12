import type { Cell, Value, Row } from '../../types';
import { createId } from '../../utils/createId';

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
  rows?: Row[] | null;

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

/**
 * @deprecated this Value_v0 will not be removed as it represents an old version.
 * It will automatically be converted to Value
 */
export type Value_v0 = {
  id: string;
  cells: CellOld[];
};

export default new Migration<Value_v0, Value>({
  fromVersion: 0 as const,
  toVersion: 1 as const,
  migrate({ cells, id }, { lang }) {
    const migrateRow = ({ cells, ...rowRest }: RowOld): Row => {
      return {
        ...rowRest,
        id: createId(),
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
        contentOrLayout?.stateI18n ??
        (contentOrLayout?.state
          ? {
              [lang]: contentOrLayout.state ?? null,
            }
          : undefined);

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
        id: createId(), // override old ids with new ones
      });
    };
    const migratedCells = cells?.map(migrateCell) ?? [];

    // check if is the only one cell with only rows, then we cann omit that
    const rootRows =
      migratedCells.length === 1 && !migratedCells[0].plugin
        ? migratedCells[0].rows ?? []
        : [
            {
              id: createId(),
              cells: migratedCells,
            },
          ];

    return {
      id,
      rows: rootRows,
      version: 0, // will be overridden later
    };
  },
});
