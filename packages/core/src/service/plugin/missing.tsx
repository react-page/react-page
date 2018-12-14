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
import { ContentPluginProps, LayoutPluginProps } from './classes';

const ContentMissingComponent = (props: ContentPluginProps<{}>) => (
  <div
    style={{
      backgroundColor: 'red',
      padding: '8px',
      border: '1px solid black',
      margin: '2px',
      overflowX: 'scroll',
    }}
  >
    The requested content plugin could not be found.
    <pre>{JSON.stringify(props, null, 2)}</pre>
  </div>
);

export const contentMissing = (
  plugin: ContentPluginProps
): ContentPluginProps => ({
  Component: ContentMissingComponent,
  ...plugin,
});

const LayoutMissingComponent: React.SFC = ({ children, ...props }) => (
  <div>
    <div
      style={{
        backgroundColor: 'red',
        padding: '8px',
        border: '1px solid black',
        margin: '2px',
        overflowX: 'scroll',
      }}
    >
      The requested layout plugin could not be found.
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
    {children}
  </div>
);

export const layoutMissing = (plugin: LayoutPluginProps): LayoutPluginProps =>
  ({
    Component: LayoutMissingComponent,
    ...plugin,
  } as LayoutPluginProps);
