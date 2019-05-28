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
import { v4 } from 'uuid';
import Icon from '@material-ui/icons/CropLandscape';
import {
  LayoutPluginConfig
} from '@react-page/core/lib/service/plugin/classes';
import { ParallaxBackgroundSettings } from './types/settings';
import { ParallaxBackgroundState } from './types/state';
import { ContentPluginProps } from '@react-page/core/lib/service/plugin/classes';
import Component from './Component';

if (process.env.NODE_ENV !== 'production') {
  console.warn(
    // tslint:disable-next-line:max-line-length
    'WARNING! Obsolete plugin loaded. \'ory/editor/core/layout/parallax-background\' has been deprecated, please use the new \'ory/editor/core/layout/background\' plugin instead! Make sure to migrate your state manually by changing the plugin name before you switch.'
  );
}

const createPlugin: (settings: ParallaxBackgroundSettings) => LayoutPluginConfig<ParallaxBackgroundState> = settings => ({
  Component: (props: ContentPluginProps<ParallaxBackgroundState>) => (
    <Component {...props} {...settings} />
  ),
  name: 'ory/editor/core/layout/parallax-background',
  version: '0.0.1',

  text: 'Parallax Background (deprecated)',
  IconComponent: <Icon />,

  createInitialChildren: settings.getInitialChildren || (() => ({
    id: v4(),
    rows: [
      {
        id: v4(),
        cells: [
          {
            content: {
              plugin: settings.defaultPlugin,
              state: settings.defaultPlugin.createInitialState(),
            },
            id: v4(),
          },
        ],
      },
    ],
  })),

  handleFocusNextHotKey: () => Promise.reject(),
  handleFocusPreviousHotKey: () => Promise.reject(),
});

export default createPlugin;
