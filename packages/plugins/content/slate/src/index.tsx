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

import Component from './Component';
import Renderer from './Renderer';

import SlatePlugin, { SlatePluginOrCollection } from './types/SlatePlugin';
import * as hooks from './hooks';

import v002 from './migrations/v002';
import v003 from './migrations/v003';

import { ContentPluginConfig } from '@react-page/core/lib/service/plugin/classes';
import { SlateState } from './types/state';
import { SlateSettings } from './types/settings';
import { pathOr } from 'ramda/src/pathOr';
import { ActionTypes } from 'redux-undo';
import { AnyAction } from 'redux';
import { defaultSettings, defaultTranslations } from './default/settings';
import defaultPlugins from './plugins/defaultPlugins';
import * as slatePlugins from './plugins/index';
import * as pluginFactories from './pluginFactories/index';
import serialization from './serialization';
import { SlateProps } from './types/component';
import { lazyLoad } from '@react-page/core';
import createInitialState from './serialization/createInitialState';
import flattenDeep from './flattenDeep';

export { defaultPlugins, slatePlugins, pluginFactories };

const Subject = lazyLoad(() => import('@material-ui/icons/Subject'));
const Controls = lazyLoad(() => import('./Controls/'));

export default (
  unflattenedPlugins: SlatePluginOrCollection[] = defaultPlugins,
  translations = defaultTranslations
): ContentPluginConfig<SlateState> => {
  let settings: SlateSettings = {};
  // plugins should be flatten
  const plugins = flattenDeep<SlatePlugin>(unflattenedPlugins);

  settings.plugins = plugins;

  const serializeFunctions = serialization({
    plugins,
  });

  const mergedSettings = { ...defaultSettings, ...settings };

  return {
    Component: (props: SlateProps) => (
      <Component
        Renderer={Renderer}
        Controls={Controls}
        serializeFunctions={serializeFunctions}
        {...props}
        {...mergedSettings}
      />
    ),

    name: 'ory/editor/core/content/slate',
    version: '0.0.3',
    IconComponent: <Subject />,
    text: mergedSettings.translations.pluginName,
    description: mergedSettings.translations.pluginDescription,

    allowInlineNeighbours: true,

    // tslint:disable-next-line:no-any
    reducer: (state: any, action: AnyAction) => {
      if (
        (action.type === ActionTypes.UNDO ||
          action.type === ActionTypes.REDO) &&
        pathOr(false, ['content', 'state', 'editorState'], state)
      ) {
        return {
          ...state,
          content: {
            ...state.content,
            state: {
              ...state.content.state,
              editorState: state.content.state.editorState.merge({
                isNative: false,
              }),
            },
          },
        };
      }
      return state;
    },

    handleRemoveHotKey: hooks.handleRemoveHotKey,
    handleFocusPreviousHotKey: hooks.handleFocusPreviousHotKey,
    handleFocusNextHotKey: hooks.handleFocusNextHotKey,
    createInitialState: createInitialState,
    serialize: serializeFunctions.serialize,
    unserialize: serializeFunctions.unserialize,

    // TODO this is disabled because of #207
    // merge = hooks.merge
    // split = hooks.split

    migrations: [v002, v003],
  };
};
