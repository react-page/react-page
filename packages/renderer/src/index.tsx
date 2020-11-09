import {
  Cell,
  EditableType,
  getCellData,
  CellPlugin,
  Row,
  setAllSizesAndOptimize,
} from '@react-page/core';
import { migrateEditable } from '@react-page/core/lib/migrations/migrate';
import classNames from 'classnames';
import * as React from 'react';

const gridClass = (size = 12): string =>
  `react-page-cell-sm-${size} react-page-cell-xs-12`;

const rowHasInlineChildren = ({ cells }) =>
  Boolean(cells.length === 2 && Boolean(cells[0].inline));

const HTMLRow: React.FC<Partial<
  Row & { lang: string; className?: string; plugins: CellPlugin[] }
>> = React.memo(({ cells = [], className, lang, plugins }) => (
  <div
    className={classNames('react-page-row', className, {
      'react-page-row-has-floating-children': rowHasInlineChildren({ cells }),
    })}
  >
    {cells.map((c, index) => (
      <HTMLCell key={c.id} {...c} lang={lang} plugins={plugins} />
    ))}
  </div>
));

// eslint-disable-next-line no-empty-function
const noop = () => {
  return;
};

const HTMLCell: React.FC<
  Cell & { lang: string; plugins: CellPlugin[] }
> = React.memo((props) => {
  const { lang, plugins, ...cell } = props;
  const { size, hasInlineNeighbour, inline, isDraftI18n, isDraft } = cell;
  const cn = classNames('react-page-cell', gridClass(size), {
    'react-page-cell-has-inline-neighbour': hasInlineNeighbour,
    [`react-page-cell-inline-${inline || ''}`]: inline,
  });

  if (isDraftI18n?.[lang] ?? isDraft) {
    return null;
  }

  const plugin = cell.plugin
    ? plugins.find((p) => p.id === cell.plugin.id)
    : null;
  if (plugin) {
    const { Component } = plugin;
    const data = getCellData(cell, lang);
    return (
      <div className={cn}>
        <div
          className={
            'react-page-cell-inner' +
            (cell.rows?.length > 0 ? '' : ' react-page-cell-leaf')
          }
        >
          <Component
            readOnly={true}
            lang={lang}
            nodeId={cell.id}
            state={data}
            data={data}
            onChange={noop}
            pluginConfig={plugin}
            focused={false}
            isPreviewMode={false}
            isEditMode={false}
          >
            {cell.rows?.map((r: Row, index) => (
              <HTMLRow
                key={r.id}
                {...r}
                plugins={plugins}
                lang={lang}
                className="react-page-cell-inner"
              />
            ))}
          </Component>
        </div>
      </div>
    );
  } else if (cell.rows?.length > 0) {
    return (
      <div className={cn}>
        {cell.rows.map((r: Row) => (
          <HTMLRow
            key={r.id}
            {...r}
            lang={lang}
            className="react-page-cell-inner"
            plugins={plugins}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={cn}>
      <div className="react-page-cell-inner" />
    </div>
  );
});

export interface HTMLRendererProps {
  state: EditableType;
  plugins?: CellPlugin[];
  lang?: string;
}

export const HTMLRenderer: React.FC<HTMLRendererProps> = React.memo(
  ({ state, plugins, lang = 'default' }) => {
    const data = migrateEditable(state, { plugins, lang });

    if (!data) {
      return null;
    }
    const { rows, ...props } = data;
    return (
      <>
        {setAllSizesAndOptimize(rows).map((row) => (
          <HTMLRow
            key={row.id}
            plugins={plugins}
            lang={lang}
            cells={row.cells}
            {...props}
          />
        ))}
      </>
    );
  }
);
