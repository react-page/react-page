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
import Plugin from '../Plugin';
import Paragraph from './node';
import { RenderNodeProps } from 'slate-react';
import { Block, Editor } from 'slate';
import { NextType } from '../../types/next';

export const P = 'PARAGRAPH/PARAGRAPH';

export default class ParagraphPlugin extends Plugin {
  name = 'paragraph';

  /*schema = {
    nodes: { [P]: Paragraph },
  };*/

  // tslint:disable-next-line:no-any
  deserialize = (el: any, next: any) => {
    switch (el.tagName.toLowerCase()) {
      case 'p':
        return {
          object: 'block',
          type: P,
          nodes: next(el.childNodes),
          // data: Data.create({ textAlign: el.attr('styles')['text-align'] })
        };
      default:
        return;
    }
  }

  serialize = (
    // tslint:disable-next-line:no-any
    object: { type: string; object: string; data: any },
    // tslint:disable-next-line:no-any
    children: any
  ) => {
    if (object.object !== 'block') {
      return;
    }
    switch (object.type) {
      case P:
        return (
          <p style={{ textAlign: object.data.get('align') }}>{children}</p>
        );
      default:
        return;
    }
  }

  renderNode = (props: RenderNodeProps, editor: Editor, next: NextType) => {
    // tslint:disable-next-line:no-any
    switch (((props as any).node as Block).type) {
      case P: {
        return <Paragraph {...props} />;
      }
      default:
        return next();
    }
  }
}
