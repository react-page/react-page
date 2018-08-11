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

import React, { Component } from 'react'
import { Placeholder } from 'slate'
import { placeholder } from '../../const.js'
import shallowEqual from 'fbjs/lib/shallowEqual'

class Paragraph extends Component {
  shouldComponentUpdate(nextProps) {
    return !shallowEqual(this.props, nextProps)
  }

  props: {
    children: any,
    state: any,
    node: any,
    attributes: any
  }

  render() {
    const { node, state, children, attributes } = this.props
    const align = this.props.node.data.get('align')
    return (
      <p {...attributes} style={{ textAlign: align }}>
        <Placeholder
          className="ory-plugins-content-slate-paragraph-placeholder"
          node={node}
          parent={state.document}
          state={state}
          style={{ top: 'auto', bottom: 'auto', left: 'auto', right: 'auto' }}
        >
          {placeholder}
        </Placeholder>
        {children}
      </p>
    )
  }
}

export default Paragraph
