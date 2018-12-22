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

import Droppable from '../Droppable';
import Draggable from '../Draggable';
import Rows from '../Rows';
import Layout from '../Layout';
import Content from '../Content';
import Empty from '../Empty';

import { ComponetizedCell } from '../../../types/editable';

class Inner extends React.PureComponent<ComponetizedCell> {
  render() {
    const {
      node: {
        rows = [],
        layout: {
          plugin: {
            Component: LayoutComponent = undefined,
            name: layoutType = undefined,
            text: layoutTitle = undefined,
          } = {},
        } = {},
        content: {
          plugin: {
            Component: ContentComponent = undefined,
            name: contentType = undefined,
            text: contentTitle = undefined,
          } = {},
        } = {},
      },
      config: { whitelist = [] },
    } = this.props;

    if (rows.length && LayoutComponent) {
      return (
        <Droppable {...this.props} dropTypes={whitelist}>
          <Draggable
            {...this.props}
            dragType={layoutType}
            name={layoutTitle || layoutType}
          >
            <Layout {...this.props} />
          </Draggable>
        </Droppable>
      );
    } else if (rows.length) {
      return (
        <Droppable {...this.props} dropTypes={whitelist}>
          <Rows {...this.props} />
        </Droppable>
      );
    } else if (ContentComponent) {
      return (
        <Droppable {...this.props} isLeaf={true} dropTypes={whitelist}>
          <Draggable
            {...this.props}
            isLeaf={true}
            dragType={contentType}
            name={contentTitle || contentType}
          >
            <Content {...this.props} />
          </Draggable>
        </Droppable>
      );
    }

    return <Empty {...this.props} />;
  }
}

export default Inner;
