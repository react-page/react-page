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
import Component from './Component/index';
import { defaultSettings } from './default/settings';
import { ImageSettings } from './types/settings';
import { ImageState } from './types/state';

const createPlugin = (
  settings?: ImageSettings
): ContentPluginConfig<ImageState> => {
  const mergedSettings = { ...defaultSettings, ...settings };
  return {
    Component: (props: ContentPluginProps<ImageState>) => (
      <Component {...props} {...mergedSettings} />
    ),

    name: 'ory/editor/core/content/image',
    version: '0.0.1',
    IconComponent: mergedSettings.IconComponent,
    text: mergedSettings.translations.pluginName,
    isInlineable: true,
    description: mergedSettings.translations.pluginDescription,

    handleRemoveHotKey: (_: Event, __: ContentPluginProps): Promise<void> =>
      Promise.reject(),
    handleFocusPreviousHotKey: (
      _: Event,
      __: ContentPluginProps
    ): Promise<void> => Promise.reject(),
    handleFocusNextHotKey: (_: Event, __: ContentPluginProps): Promise<void> =>
      Promise.reject(),

    // We need this because otherwise we lose hotkey focus on elements like spoilers.
    // This could probably be solved in an easier way by listening to window.document?

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleFocus: (props: any, source: any, ref: HTMLElement) => {
      if (!ref) {
        return;
      }
      setTimeout(() => ref.focus());
    },
  };
};
export default createPlugin;
