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

import { ContentPluginConfig, ContentPluginProps } from '@react-page/core';
import * as React from 'react';
import Html5Video from './Component';
import { defaultSettings } from './default/settings';
import { Html5VideoProps } from './types/component';
import { Html5VideoSettings } from './types/settings';
import { Html5VideoState } from './types/state';

export type Props = ContentPluginProps;

const rejectPromise: (e: Event, props: Props) => Promise<void> = (
  e: Event,
  props: Props
) => Promise.reject();

const createPlugin: (
  settings: Html5VideoSettings
) => ContentPluginConfig<Html5VideoState> = settings => {
  const mergedSettings = { ...defaultSettings, ...settings };
  const WrappedComponent: React.SFC<Html5VideoProps> = props => (
    <Html5Video {...props} {...mergedSettings} />
  );
  return {
    Component: WrappedComponent,
    name: 'ory/sites/plugin/content/html5-video',
    version: '0.0.1',
    text: mergedSettings.translations.pluginName,
    description: mergedSettings.translations.pluginDescription,
    IconComponent: mergedSettings.IconComponent,
    handleFocusNextHotKey: rejectPromise,
    handleFocusPreviousHotKey: rejectPromise,
    createInitialState: () => ({
      url: '',
    }),
  };
};

export default createPlugin;
