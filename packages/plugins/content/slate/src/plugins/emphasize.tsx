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
import BoldIcon from '@material-ui/icons/FormatBold';
import ItalicIcon from '@material-ui/icons/FormatItalic';
import UnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import { ToolbarButton } from '../helpers';
import { PluginButtonProps, Plugin, PluginGetComponent } from './Plugin';
import { RenderMarkProps } from 'slate-react';
import { Mark, MarkProperties, Editor } from 'slate';
import { NextType } from '../types/next';
import isHotkey from 'is-hotkey';
import { SlatePluginSettings } from 'src/types/plugin';

export const STRONG = 'EMPHASIZE/STRONG';
export const EM = 'EMPHASIZE/EM';
export const U = 'EMPHASIZE/U';

const ALLOWED_TYPES = [STRONG, EM, U];
const DEFAULT_MAPPING = {
  [STRONG]: 'strong',
  [EM]: 'em',
  [U]: 'u',
};

const defaultGetComponent: PluginGetComponent = ({ type }) =>
  DEFAULT_MAPPING[type];

// eslint-disable-next-line react/display-name
const createButton: (
  type: Mark | MarkProperties | string,
  icon: JSX.Element
) => React.SFC<PluginButtonProps> = (type, icon) => ({
  editor,
  editorState,
}) => {
  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    editor.toggleMark(type);
  };

  const isActive =
    editorState && editorState.activeMarks.some(mark => mark.type === type);

  return <ToolbarButton onClick={onClick} isActive={isActive} icon={icon} />;
};

export default class EmphasizePlugin extends Plugin {
  name = 'emphasize';

  hoverButtons = [
    createButton(STRONG, <BoldIcon />),
    createButton(EM, <ItalicIcon />),
    createButton(U, <UnderlinedIcon />),
  ];

  constructor(props: SlatePluginSettings = {}) {
    super();
    this.getComponent = props.getComponent || defaultGetComponent;
  }

  onKeyDown = (e: KeyboardEvent, editor: Editor, next: NextType): boolean => {
    let mark: string;
    if (isHotkey('mod+b', e)) {
      mark = STRONG;
    }
    if (isHotkey('mod+i', e)) {
      mark = EM;
    }
    if (isHotkey('mod+u', e)) {
      mark = U;
    }
    if (mark) {
      editor.toggleMark(mark);
      e.preventDefault();
      return true;
    } else {
      return next();
    }
  }

  deserialize = (el, next) => {
    switch (el.tagName.toLowerCase()) {
      case 'strong':
      case 'b':
        return {
          object: 'mark',
          type: STRONG,
          nodes: next(el.childNodes),
        };
      case 'em':
      case 'i':
        return {
          object: 'mark',
          type: EM,
          nodes: next(el.childNodes),
        };
      case 'u':
        return {
          object: 'mark',
          type: U,
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
    if (object.object !== 'mark') {
      return;
    }
    if (!ALLOWED_TYPES.includes(object.type)) {
      return;
    }
    const Component = this.getComponent({
      type: object.type,
      data: object.data,
      object: 'mark',
    });

    if (Component) {
      return <Component>{children}</Component>;
    }

    return;
  }

  renderMark = (props: RenderMarkProps, editor: Editor, next: NextType) => {
    const { children, mark, attributes } = props;

    if (!ALLOWED_TYPES.includes(mark.type)) {
      return next();
    }
    const Component = this.getComponent({ type: mark.type, object: 'mark' });
    if (Component) {
      return <Component {...attributes}>{children}</Component>;
    }
    return next();
  }
}
