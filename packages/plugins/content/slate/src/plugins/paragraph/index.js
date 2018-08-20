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

// @flow
/* eslint-disable prefer-reflect, default-case, react/display-name */
import React from 'react'
import Plugin from '../Plugin'
import Paragraph from './node'

export const P = 'PARAGRAPH/PARAGRAPH'

export default class ParagraphPlugin extends Plugin {
  name = 'paragraph'

  schema = {
    nodes: { [P]: Paragraph }
  }

  deserialize = (el: any, next: any) => {
    switch (el.tagName.toLowerCase()) {
      case 'p':
        return {
          object: 'block',
          type: P,
          nodes: next(el.childNodes)
          // data: Data.create({ textAlign: el.attr('styles')['text-align'] })
        }
    }
  }

  serialize = (
    object: { type: string, object: string, data: any },
    children: any[]
  ) => {
    if (object.object !== 'block') {
      return
    }
    switch (object.type) {
      case P:
        return <p style={{ textAlign: object.data.get('align') }}>{children}</p>
    }
  }

  renderNode = (props: any) => {
    switch (props.node.type) {
      case P: {
        return <Paragraph {...props} />
      }
    }
  }
}
