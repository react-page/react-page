import classNames from 'classnames';
import React from 'react';
import { migrateValue } from '../core/migrations/migrate';
import { setAllSizesAndOptimize } from '../core/reducer/value/helper/setAllSizesAndOptimize';
import { optimizeRows } from '../core/reducer/value/helper/optimize';
import type {
  Cell,
  CellPlugin,
  Row,
  ValueWithLegacy,
  CellSpacing,
} from '../core/types';
import { getCellData } from '../core/utils/getCellData';
import { getCellStyle } from '../core/utils/getCellStyle';
import {
  getPluginCellSpacing,
  normalizeCellSpacing,
} from '../core/utils/getCellSpacing';
import NoopProvider from '../core/components/Cell/NoopProvider';

const gridClass = (size = 12): string =>
  `react-page-cell-sm-${size} react-page-cell-xs-12`;

const rowHasInlineChildren = ({ cells }) =>
  Boolean(cells.length === 2 && Boolean(cells[0].inline));

const HTMLRow: React.FC<
  Partial<
    Row & {
      lang: string;
      className?: string;
      cellPlugins: CellPlugin[];
      cellSpacing: CellSpacing;
    }
  >
> = React.memo(({ cells = [], className, lang, cellPlugins, cellSpacing }) => (
  <div
    className={classNames('react-page-row', className, {
      'react-page-row-has-floating-children': rowHasInlineChildren({ cells }),
    })}
    style={{ margin: `0 ${-cellSpacing.x / 2}px` }}
  >
    {cells.map((c, index) => (
      <HTMLCell
        key={c.id}
        {...c}
        lang={lang}
        cellPlugins={cellPlugins}
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
    lang: string;
    cellPlugins: CellPlugin[];
    cellSpacing: CellSpacing;
  }
> = React.memo((props) => {
  const { lang, cellPlugins, cellSpacing, ...cell } = props;
  const { size, hasInlineNeighbour, inline, isDraftI18n, isDraft } = cell;
  const hasChildren = cell.rows?.length > 0;
  const cnOuter = classNames(gridClass(size), {
    'react-page-cell-has-inline-neighbour': hasInlineNeighbour,
    [`react-page-cell-inline-${inline || ''}`]: inline,
  });
  const cnInner = classNames('react-page-cell', {
    'react-page-cell-leaf': !hasChildren,
  });

  if (isDraftI18n?.[lang] ?? isDraft) {
    return null;
  }

  const plugin = cell.plugin
    ? cellPlugins.find((p) => p.id === cell.plugin.id)
    : null;
  if (plugin) {
    const { Renderer } = plugin;
    const cellStyle = getCellStyle(plugin);
    const Provider = plugin.Provider ?? NoopProvider;
    const data = getCellData(cell, lang);

    let pluginCellSpacing = getPluginCellSpacing(plugin, data);
    if (typeof pluginCellSpacing === 'undefined' || pluginCellSpacing == null) {
      pluginCellSpacing = cellSpacing;
    } else {
      pluginCellSpacing = normalizeCellSpacing(pluginCellSpacing);
    }

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
    return (
      <Provider {...props}>
        <div
          className={cnOuter}
          style={{ padding: `${cellSpacing.y / 2}px ${cellSpacing.x / 2}px` }}
        >
          <div className={cnInner}>
            <div
              style={cellStyle}
              className={
                'react-page-cell-inner' +
                (cell.rows?.length > 0 ? '' : ' react-page-cell-inner-leaf')
              }
            >
              <div
                style={
                  hasInlineNeighbour
                    ? null
                    : {
                        display: 'flex',
                        flexDirection: 'column',
                      }
                }
              >
                <Renderer {...props}>
                  {cell.rows?.length ? (
                    <div style={{ margin: `${-pluginCellSpacing.y / 2}px 0` }}>
                      {cell.rows?.map((r: Row) => (
                        <HTMLRow
                          key={r.id}
                          {...r}
                          cellPlugins={cellPlugins}
                          cellSpacing={pluginCellSpacing as CellSpacing}
                          lang={lang}
                          className="react-page-cell-inner"
                        />
                      ))}
                    </div>
                  ) : null}
                </Renderer>
              </div>
            </div>
          </div>
        </div>
      </Provider>
    );
  } else if (cell.rows?.length > 0) {
    return (
      <div className={cnOuter} style={{ padding: `0 ${cellSpacing.x / 2}px` }}>
        <div className={cnInner}>
          {cell.rows.map((r: Row) => (
            <HTMLRow
              key={r.id}
              {...r}
              lang={lang}
              className="react-page-cell-inner"
              cellPlugins={cellPlugins}
              cellSpacing={cellSpacing}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cnOuter}>
      <div className={cnInner}>
        <div className="react-page-cell-inner" />
      </div>
    </div>
  );
});

export interface HTMLRendererProps {
  value: ValueWithLegacy;
  cellPlugins?: CellPlugin[];
  lang?: string;
  cellSpacing?: number | CellSpacing;
}

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
          margin: optRows?.length ? `${-normCellSpacing.y / 2}px 0` : null,
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
