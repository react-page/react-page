import {
  Cell,
  Content,
  editableReducer,
  EditableType,
  Layout,
  Plugins,
  PluginService,
  Row,
} from '@react-page/core';
import classNames from 'classnames';
import * as React from 'react';

const getI18nState = ({
  stateI18n,
  state,
  lang,
}: {
  stateI18n: {
    [lang: string]: unknown;
  };
  state: unknown;
  lang?: string;
}) => {
  if (!stateI18n || !lang) {
    return state;
  }
  return (
    stateI18n?.[lang] ??
    // find first non-empty
    stateI18n?.[Object.keys(stateI18n).find((l) => stateI18n[l])] ??
    state
  );
};

const gridClass = (size = 12): string => `ory-cell-sm-${size} ory-cell-xs-12`;

const HTMLRow: React.SFC<Partial<Row & { lang: string }>> = React.memo(
  ({ cells = [], className, hasInlineChildren, lang }) => (
    <div
      className={classNames('ory-row', className, {
        'ory-row-has-floating-children': hasInlineChildren,
      })}
    >
      {cells.map((c) => (
        <HTMLCell key={c.id} {...c} lang={lang} />
      ))}
    </div>
  )
);

// eslint-disable-next-line no-empty-function
const noop = () => {
  return;
};

const HTMLCell: React.SFC<Cell & { lang: string }> = React.memo((props) => {
  const {
    rows = [],
    layout = {} as Layout,
    content = {} as Content,
    hasInlineNeighbour,
    inline,
    size,
    id,
    isDraft,
    isDraftI18n,
    lang,
  } = props;
  const cn = classNames('ory-cell', gridClass(size), {
    'ory-cell-has-inline-neighbour': hasInlineNeighbour,
    [`ory-cell-inline-${inline || ''}`]: inline,
  });

  if (isDraftI18n?.[lang] ?? isDraft) {
    return null;
  }
  if (layout.plugin) {
    const {
      state,
      stateI18n,
      plugin: { Component, name, version },
    } = layout;

    return (
      <div className={cn}>
        <div className="ory-cell-inner">
          <Component
            readOnly={true}
            lang={lang}
            state={getI18nState({ state, stateI18n, lang })}
            onChange={noop}
            id={id}
            name={name}
            focused={false}
            version={version}
          >
            {rows.map((r: Row) => (
              <HTMLRow
                key={r.id}
                {...r}
                lang={lang}
                className="ory-cell-inner"
              />
            ))}
          </Component>
        </div>
      </div>
    );
  } else if (content.plugin) {
    const {
      state,
      stateI18n,
      plugin: { Component, name, version },
    } = content;

    return (
      <div className={cn}>
        <div className="ory-cell-inner ory-cell-leaf">
          <Component
            isPreviewMode={true}
            readOnly={true}
            lang={lang}
            state={getI18nState({ state, stateI18n, lang })}
            onChange={noop}
            id={id}
            name={name}
            focused={false}
            version={version}
            isEditMode={false}
            isLayoutMode={false}
            isResizeMode={false}
            isInsertMode={false}
          />
        </div>
      </div>
    );
  } else if (rows.length > 0) {
    return (
      <div className={cn}>
        {rows.map((r: Row) => (
          <HTMLRow key={r.id} {...r} lang={lang} className="ory-cell-inner" />
        ))}
      </div>
    );
  }

  return (
    <div className={cn}>
      <div className="ory-cell-inner" />
    </div>
  );
});

export interface HTMLRendererProps {
  state: EditableType;
  plugins?: Plugins;
  lang?: string;
}

export const HTMLRenderer: React.SFC<HTMLRendererProps> = React.memo(
  ({ state, plugins, lang = null }) => {
    const service = new PluginService(plugins);
    const props = editableReducer(service.unserialize(state), {
      type: 'renderer/noop',
    });

    return <HTMLRow lang={lang} {...props} />;
  }
);
