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

/* eslint-disable prefer-reflect, default-case, react/display-name */
import * as React from 'react';
import CodeIcon from '@material-ui/icons/Code';
import { Data } from 'slate';
import { makeTagMark, ToolbarButton } from '../../helpers';
import Plugin, { PluginButtonProps } from '../Plugin';
import Code from './node';
import { Props } from '../../types/props';

export const CODE = 'CODE/CODE';

export default class CodePlugin extends Plugin {
  props: Props;

  name = 'code';
  schema = {
    marks: { [CODE]: makeTagMark('code') },
    nodes: { [CODE]: Code },
  };

  constructor(props: Props) {
    super();
    this.hoverButtons = [this.createButton(CODE, <CodeIcon />)];
    this.toolbarButtons = [this.createNodeButton(CODE, <CodeIcon />)];
    this.DEFAULT_NODE = props.DEFAULT_NODE;
  }

  createButton = (
    type: string,
    icon: JSX.Element
  ): React.SFC<PluginButtonProps> => ({ editorState, onChange }) => {
    const onClick: React.MouseEventHandler = e => {
      e.preventDefault();

      onChange({
        value: editorState.change().toggleMark(type).value,
      });
    };

    const isActive =
      editorState && editorState.marks.some(mark => mark.type === type);

    return <ToolbarButton onClick={onClick} isActive={isActive} icon={icon} />;
  }

  createNodeButton: (
    type: string,
    icon: JSX.Element
  ) => React.SFC<PluginButtonProps> = (type, icon) => ({
    editorState,
    onChange,
  }) => {
    const onClick = e => {
      e.preventDefault();

      const _isActive = editorState.blocks.some(block => block.type === type);

      onChange({
        value: editorState
          .change()
          .setBlocks(_isActive ? this.DEFAULT_NODE : type).value,
      });
    };

    const isActive = editorState.blocks.some(block => block.type === type);

    return <ToolbarButton onClick={onClick} isActive={isActive} icon={icon} />;
  }

  deserialize = (el, next) => {
    switch (el.tagName.toLowerCase()) {
      case 'code':
        return {
          object: 'mark',
          type: CODE,
          data: Data.create({}),
          nodes: next(el.childNodes),
        };
      case 'pre':
        return {
          object: 'block',
          type: CODE,
          nodes: next(el.childNodes),
        };
      default:
        return;
    }
  }

  serialize = (
    // tslint:disable-next-line:no-any
    object: { type: string; object: string; data: any },
    // tslint:disable-next-line:no-any
    children: any[]
  ) => {
    if (object.object === 'mark') {
      switch (object.type) {
        case CODE:
          return (
            <code className="ory-plugins-content-slate-code">{children}</code>
          );
        default:
          return;
      }
    } else if (object.object === 'block') {
      switch (object.type) {
        case CODE:
          return (
            <pre style={{ overflow: 'scroll' }}>
              <code>{children}</code>
            </pre>
          );
        default:
          return;
      }
    }
  }

  renderMark = props => {
    const { children, mark, attributes } = props;

    switch (mark.type) {
      case CODE:
        return (
          <code {...attributes} className="ory-plugins-content-slate-code">
            {children}
          </code>
        );
      default:
        return;
    }
  }

  renderNode = props => {
    const { node } = props;

    switch (node.type) {
      case CODE:
        return <Code {...props} />;
      default:
        return;
    }
  }
}
