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
  Options,
} from '../core/types';
import { getCellData } from '../core/utils/getCellData';
import { getCellStyle } from '../core/utils/getCellStyle';
import {
  getPluginCellSpacing,
  normalizeCellSpacing,
} from '../core/utils/getCellSpacing';
import NoopProvider from '../core/components/Cell/NoopProvider';
import { gridClass } from '../core/components/Cell/utils/gridClass';
import { getChildCellPlugins } from '../core/utils/getAvailablePlugins';

const rowHasInlineChildren = ({ cells }) =>
  Boolean(cells.length === 2 && Boolean(cells[0].inline));

export type HTMLRowProps = Partial<
  Row & {
    lang: string;
    className?: string;
    cellPlugins: CellPlugin[];
    cellSpacing: CellSpacing;
  }
>;

export const HTMLRow: React.FC<HTMLRowProps> = React.memo(
  ({ cells = [], className, lang, cellPlugins, cellSpacing }) => {
    const { HTMLCell: Cell } = React.useContext(ComponentsContext);

    return (
      <div
        className={classNames('react-page-row', className, {
          'react-page-row-has-floating-children': rowHasInlineChildren({
            cells,
          }),
        })}
        style={{ margin: `0 ${-cellSpacing.x / 2}px` }}
      >
        {cells.map((c) => (
          <Cell
            key={c.id}
            {...c}
            lang={lang}
            cellPlugins={cellPlugins}
            cellSpacing={cellSpacing}
          />
        ))}
      </div>
    );
  }
);

// eslint-disable-next-line no-empty-function
const noop = () => {
  return;
};

export type HTMLCellProps = Cell & {
  lang: string;
  className?: string;
  cellPlugins: CellPlugin[];
  cellSpacing: CellSpacing;
};

export const HTMLCell: React.FC<HTMLCellProps> = React.memo((props) => {
  const { lang, className, cellPlugins, cellSpacing, ...cell } = props;
  const { size, hasInlineNeighbour, inline, isDraftI18n, isDraft } = cell;
  const hasChildren = cell.rows?.length > 0;

  const cnOuter = classNames(gridClass(size), className, {
    'react-page-cell-has-inline-neighbour': hasInlineNeighbour,
    [`react-page-cell-inline-${inline || ''}`]: inline,
  });
  const cnInner = classNames('react-page-cell', {
    'react-page-cell-leaf': !hasChildren,
  });

  if (isDraftI18n?.[lang] ?? isDraft) {
    return null;
  }

  const { HTMLRow: Row } = React.useContext(ComponentsContext);
  const data = getCellData(cell, lang) ?? {};

  const plugin = cell.plugin
    ? cellPlugins.find((p) => p.id === cell.plugin.id)
    : null;
  if (plugin) {
    const { Renderer } = plugin;

    const cellStyle = getCellStyle(plugin, data);
    const Provider = plugin.Provider ?? NoopProvider;

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
    const childCellPlugins = getChildCellPlugins(cellPlugins, {
      data,
      pluginId: plugin?.id,
    });
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
                        height: '100%',
                      }
                }
              >
                <Renderer {...props}>
                  {cell.rows?.length ? (
                    <div style={{ margin: `${-pluginCellSpacing.y / 2}px 0` }}>
                      {cell.rows?.map((r: Row) => (
                        <Row
                          key={r.id}
                          {...r}
                          cellPlugins={childCellPlugins}
                          cellSpacing={pluginCellSpacing as CellSpacing}
                          lang={lang}
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
            <Row
              key={r.id}
              {...r}
              lang={lang}
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

const ComponentsContext = React.createContext<{
  HTMLRow: React.ComponentType<HTMLRowProps>;
  HTMLCell: React.ComponentType<HTMLCellProps>;
}>(null);

export interface HTMLRendererProps {
  value: ValueWithLegacy;
  cellPlugins?: CellPlugin[];
  lang?: string;
  cellSpacing?: Options['cellSpacing'];
  components?: Options['components'];
}

export const HTMLRenderer: React.FC<HTMLRendererProps> = React.memo(
  ({ value, cellPlugins, cellSpacing, components, lang = 'default' }) => {
    const data = migrateValue(value, { cellPlugins, lang });
    const normCellSpacing = normalizeCellSpacing(cellSpacing);

    if (!data) {
      return null;
    }
    const { rows } = data;
    const optRows = optimizeRows(rows);
    const Row = components?.HTMLRow ?? HTMLRow;
    return (
      <div
        style={{
          margin: optRows?.length ? `${-normCellSpacing.y / 2}px 0` : null,
        }}
      >
        <ComponentsContext.Provider
          value={{
            HTMLRow: Row,
            HTMLCell: components?.HTMLCell ?? HTMLCell,
          }}
        >
          {setAllSizesAndOptimize(optRows).map((row) => (
            <Row
              key={row.id}
              cellPlugins={cellPlugins}
              lang={lang}
              cellSpacing={normCellSpacing}
              {...row}
            />
          ))}
        </ComponentsContext.Provider>
      </div>
    );
  }
);
