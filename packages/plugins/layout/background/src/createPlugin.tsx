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

import { LayoutPluginConfig } from '@react-page/core/lib/service/plugin/classes';
import { BackgroundSettings } from './types/settings';
import { BackgroundState } from './types/state';
import { BackgroundProps } from './types/component';
import BackgroundComponent from './Component';
import { defaultSettings } from './default/settings';

const createPlugin = (settings: BackgroundSettings) => {
  const mergedSettings = { ...defaultSettings, ...settings};
  const plugin: LayoutPluginConfig<BackgroundState> = {
    Component: (props: BackgroundProps) => (
      <BackgroundComponent {...props} {...mergedSettings} />
    ),
    name: 'ory/editor/core/layout/background',
    version: '0.0.1',

    text: mergedSettings.translations.pluginName,
    description: mergedSettings.translations.pluginDescription,
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
  };
  return plugin;
};

export default createPlugin;