import classNames from 'classnames';
import React from 'react';
import NoopProvider from '../core/components/Cell/NoopProvider';
import { migrateValue } from '../core/migrations/migrate';
import { optimizeRows } from '../core/reducer/value/helper/optimize';
import { setAllSizesAndOptimize } from '../core/reducer/value/helper/setAllSizesAndOptimize';
import type {
  Cell,
  CellPluginList,
  CellSpacing,
  RenderOptions,
  Row,
  ValueWithLegacy,
} from '../core/types';
import { getChildCellPlugins } from '../core/utils/getAvailablePlugins';
import { getCellData } from '../core/utils/getCellData';
import {
  getPluginCellSpacing,
  normalizeCellSpacing,
} from '../core/utils/getCellSpacing';
import {
  getCellInnerDivStylingProps,
  getCellOuterDivClassName,
} from '../core/utils/getCellStylingProps';

const rowHasInlineChildren = ({ cells }: { cells: Cell[] }) =>
  Boolean(cells.length === 2 && Boolean(cells[0].inline));

const HTMLRow: React.FC<
  Partial<Row> & {
    lang: string;
    className?: string;
    cellPlugins: CellPluginList;
    cellSpacing: CellSpacing;
  }
> = React.memo(({ cells = [], className, lang, cellPlugins, cellSpacing }) => (
  <div
    className={classNames('react-page-row', className, {
      'react-page-row-has-floating-children': rowHasInlineChildren({ cells }),
    })}
    style={{
      margin: cellSpacing.x > 0 ? `0 ${-cellSpacing.x / 2}px` : undefined,
    }}
  >
    {cells.map((c) => (
      <HTMLCell
        key={c.id}
        {...c}
        lang={lang}
        cellPlugins={cellPlugins ?? []}
        cellSpacing={cellSpacing}
      />
    ))}
  </div>
));

// eslint-disable-next-line no-empty-function
const noop = () => {
  return;
};

const HTMLCell: React.FC<
  Cell & {
    lang?: string;
    cellPlugins: CellPluginList;
    cellSpacing: CellSpacing;
  }
> = React.memo((props) => {
  const { lang = 'default', cellPlugins, cellSpacing, ...cell } = props;
  const { size, hasInlineNeighbour, inline, isDraftI18n, isDraft } = cell;
  const hasChildren = (cell.rows?.length ?? 0) > 0;

  if (isDraftI18n?.[lang] ?? isDraft) {
    return null;
  }
  const data = getCellData(cell, lang) ?? {};
  const plugin = cell.plugin
    ? cellPlugins.find((p) => p.id === cell.plugin?.id)
    : null;
  const outerClasses = getCellOuterDivClassName({
    hasChildren,
    size,
    hasInlineNeighbour,
    inline,
  });

  if (plugin) {
    const { Renderer } = plugin;

    const Provider =
      plugin.Provider && !plugin.disableProviderInReadOnly
        ? plugin.Provider
        : NoopProvider;

    const pluginCellSpacing = getPluginCellSpacing(plugin, data);

    const normCellSpacing = pluginCellSpacing
      ? normalizeCellSpacing(pluginCellSpacing)
      : cellSpacing;

    const props = {
      readOnly: true,
      lang: lang,
      nodeId: cell.id,
      data: data,
      onChange: noop,
      pluginConfig: plugin,
      focused: false,
      isPreviewMode: false,
      isEditMode: false,
    };
    const childCellPlugins = getChildCellPlugins(cellPlugins, {
      data,
      pluginId: plugin?.id,
    });

    const cellOuterStyle =
      cellSpacing.y !== 0 || cellSpacing.x !== 0
        ? {
            padding: `${cellSpacing.y / 2}px ${cellSpacing.x / 2}px`,
          }
        : undefined;
    const innerStylingProps = getCellInnerDivStylingProps(cell, plugin, data);

    return (
      <Provider {...props}>
        <div className={outerClasses} style={cellOuterStyle}>
          <div {...innerStylingProps}>
            <div
              style={
                hasInlineNeighbour
                  ? undefined
                  : {
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                    }
              }
            >
              <Renderer {...props}>
                {cell.rows?.length ? (
                  <div
                    style={{
                      margin:
                        normCellSpacing.y > 0
                          ? `${-normCellSpacing.y / 2}px 0`
                          : undefined,
                    }}
                  >
                    {cell.rows?.map((r: Row) => (
                      <HTMLRow
                        key={r.id}
                        {...r}
                        cellPlugins={childCellPlugins}
                        cellSpacing={normCellSpacing}
                        lang={lang}
                      />
                    ))}
                  </div>
                ) : null}
              </Renderer>
            </div>
          </div>
        </div>
      </Provider>
    );
  } else if ((cell.rows?.length ?? 0) > 0) {
    return (
      <div
        className={outerClasses}
        style={{
          padding: cellSpacing.x > 0 ? `0 ${cellSpacing.x / 2}px` : undefined,
        }}
      >
        {cell.rows?.map((r: Row) => (
          <HTMLRow
            key={r.id}
            {...r}
            lang={lang}
            cellPlugins={cellPlugins}
            cellSpacing={cellSpacing}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={outerClasses}>
      <div className="react-page-cell-inner" />
    </div>
  );
});

export type HTMLRendererProps = {
  value: ValueWithLegacy | null;

  lang?: string;
} & RenderOptions;

export const HTMLRenderer: React.FC<HTMLRendererProps> = React.memo(
  ({ value, cellPlugins, cellSpacing, lang = 'default' }) => {
    const data = migrateValue(value, { cellPlugins, lang });
    const normCellSpacing = normalizeCellSpacing(cellSpacing);

    if (!data) {
      return null;
    }
    const { rows } = data;
    const optRows = optimizeRows(rows);
    return (
      <div
        style={{
          margin:
            optRows?.length && normCellSpacing.x > 0
              ? `${-normCellSpacing.y / 2}px 0`
              : undefined,
        }}
      >
        {setAllSizesAndOptimize(optRows).map((row) => (
          <HTMLRow
            key={row.id}
            cellPlugins={cellPlugins}
            lang={lang}
            cellSpacing={normCellSpacing}
            {...row}
          />
        ))}
      </div>
    );
  }
);
