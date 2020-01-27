import {
  Cell,
  Content,
  editableReducer,
  EditableType,
  Layout,
  Plugins,
  PluginService,
  Row
} from '@react-page/core';
import classNames from 'classnames';
import * as React from 'react';

const gridClass = (size: number = 12): string =>
  `ory-cell-sm-${size} ory-cell-xs-12`;

const HTMLRow: React.SFC<Partial<Row>> = React.memo(
  ({ cells = [], className, hasInlineChildren }) => (
    <div
      className={classNames('ory-row', className, {
        'ory-row-has-floating-children': hasInlineChildren,
      })}
    >
      {cells.map(c => (
        <HTMLCell key={c.id} {...c} />
      ))}
    </div>
  )
);

// eslint-disable-next-line no-empty-function
const noop = () => {
  return;
};

const HTMLCell: React.SFC<Cell> = React.memo(props => {
  const {
    rows = [],
    layout = {} as Layout,
    content = {} as Content,
    hasInlineNeighbour,
    inline,
    size,
    id,
    isDraft,
  } = props;
  const cn = classNames('ory-cell', gridClass(size), {
    'ory-cell-has-inline-neighbour': hasInlineNeighbour,
    [`ory-cell-inline-${inline || ''}`]: inline,
  });

  if (isDraft) {
    return null;
  }
  if (layout.plugin) {
    const {
      state,
      plugin: { Component, name, version },
    } = layout;

    return (
      <div className={cn}>
        <div className="ory-cell-inner">
          <Component
            readOnly={true}
            state={state}
            onChange={noop}
            id={id}
            name={name}
            focused={false}
            version={version}
          >
            {rows.map((r: Row) => (
              <HTMLRow key={r.id} {...r} className="ory-cell-inner" />
            ))}
          </Component>
        </div>
      </div>
    );
  } else if (content.plugin) {
    const {
      state,
      plugin: { Component, name, version },
    } = content;

    return (
      <div className={cn}>
        <div className="ory-cell-inner ory-cell-leaf">
          <Component
            isPreviewMode={true}
            readOnly={true}
            state={state}
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
          <HTMLRow key={r.id} {...r} className="ory-cell-inner" />
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
}

export const HTMLRenderer: React.SFC<HTMLRendererProps> = React.memo(
  ({ state, plugins }) => {
    const service = new PluginService(plugins);
    const props = editableReducer(service.unserialize(state), {
      type: 'renderer/noop',
    });

    return <HTMLRow {...props} />;
  }
);
