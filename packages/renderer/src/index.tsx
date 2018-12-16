/*
 * This file is part of ORY Editor.
 *
 * ORY Editor is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * ORY Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with ORY Editor.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @license LGPL-3.0
 * @copyright 2016-2018 Aeneas Rekkas
 * @author Aeneas Rekkas <aeneas+oss@aeneas.io>
 *
 */

import * as React from 'react';
import classNames from 'classnames';
import PluginService from 'ory-editor-core/lib/service/plugin';
import { editable as reducer } from 'ory-editor-core/lib/reducer/editable';
import { Cell, Row, Layout, Content } from 'ory-editor-core/lib/types/editable';
import { Plugins } from 'ory-editor-core/lib/service/plugin/classes';
import { EditableType } from 'ory-editor-core/lib/types/editable';

const gridClass = (size: number = 12): string =>
  `ory-cell-sm-${size} ory-cell-xs-12`;

const HTMLRow: React.SFC<Partial<Row>> = ({
  cells = [],
  className,
  hasInlineChildren,
}) => (
  <div
    className={classNames('ory-row', className, {
      'ory-row-has-floating-children': hasInlineChildren,
    })}
  >
    {cells.map((c: Cell) => (
      <HTMLCell key={c.id} {...c} />
    ))}
  </div>
);

// eslint-disable-next-line no-empty-function
const noop = () => {
  return;
};

const HTMLCell: React.SFC<Cell> = props => {
  const {
    rows = [],
    layout = {} as Layout,
    content = {} as Content,
    hasInlineNeighbour,
    inline,
    size,
    id,
  } = props;
  const cn = classNames('ory-cell', gridClass(size), {
    'ory-cell-has-inline-neighbour': hasInlineNeighbour,
    [`ory-cell-inline-${inline || ''}`]: inline,
  });

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
      plugin: { Component, StaticComponent, name, version },
    } = content;
    const Renderer = StaticComponent || Component;

    return (
      <div className={cn}>
        <div className="ory-cell-inner ory-cell-leaf">
          <Renderer
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
};

export interface HTMLRendererProps {
  state: EditableType;
  plugins?: Plugins;
}

export const HTMLRenderer: React.SFC<HTMLRendererProps> = ({
  state,
  plugins,
}) => {
  const service = new PluginService(plugins);
  const props = reducer(service.unserialize(state), { type: 'renderer/noop' });

  return <HTMLRow {...props} />;
};
