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

import { lazyLoad } from '@react-page/core';
import { ContentPluginConfig } from '@react-page/core/lib/service/plugin/classes';
import { pathOr } from 'ramda/src/pathOr';
import * as React from 'react';
import { AnyAction } from 'redux';
import { ActionTypes } from 'redux-undo';
import Component from './Component';
import { defaultTranslations } from './default/settings';
import * as hooks from './hooks';
import v002 from './migrations/v002';
import v003 from './migrations/v003';
import * as pluginFactories from './pluginFactories/index';
import * as defaultPlugins from './plugins/index';
import Renderer from './Renderer';
import serialization from './serialization';
import { SlateProps } from './types/component';
import { SlateControlsProps } from './types/controls';
import { InitialSlateStateDef } from './types/initialSlateState';
import { SlateRendererProps } from './types/renderer';
import { SlatePluginCollection } from './types/SlatePlugin';
import { SlateState } from './types/state';
import makeSlatePluginsFromDef from './utils/makeSlatePluginsFromDef';
import transformInitialSlateState from './utils/transformInitialSlateState';

const slatePlugins = defaultPlugins;
export { defaultPlugins, slatePlugins, pluginFactories };
const Subject = lazyLoad(() => import('@material-ui/icons/Subject'));
const Controls = lazyLoad(() => import('./Controls/'));

const migrations = [v002, v003];
type SlateDefinition<TPlugins extends SlatePluginCollection> = {
  icon: JSX.Element;
  plugins: TPlugins;
  Renderer: React.ComponentType<SlateRendererProps>;
  Controls: React.ComponentType<SlateControlsProps>;
  name: string;
  version: string;
  translations: typeof defaultTranslations;
  migrations: typeof migrations;
  allowInlineNeighbours: boolean;
  hideInMenu?: boolean;
};
type DefaultPlugins = typeof defaultPlugins;
type DefaultSlateDefinition = SlateDefinition<DefaultPlugins>;
export type CreateInitialStateCustomizer<TPlugins> = (
  { plugins }: { plugins: TPlugins }
) => InitialSlateStateDef;

const defaultConfig: DefaultSlateDefinition = {
  icon: <Subject />,
  plugins: defaultPlugins,
  Renderer,
  Controls,
  name: 'ory/editor/core/content/slate',
  version: '0.0.3',
  translations: defaultTranslations,
  migrations,

  allowInlineNeighbours: true,
};

type CreateInitialSlateState<TPlugins> = (
  custom?: CreateInitialStateCustomizer<TPlugins>
) => // tslint:disable-next-line:no-any
{ editorState: any };
export type SlatePlugin<TPlugins> = ContentPluginConfig<SlateState> & {
  createInitialSlateState: CreateInitialSlateState<TPlugins>;
};
export type SlateCustomizeFunction<TPlugins extends SlatePluginCollection> = (
  def: DefaultSlateDefinition
) => SlateDefinition<TPlugins>;

function plugin<TPlugins extends SlatePluginCollection = DefaultPlugins>(
  customize?: SlateCustomizeFunction<TPlugins>
): SlatePlugin<TPlugins> {
  const settings = (customize
    ? customize(defaultConfig)
    : defaultConfig) as SlateDefinition<TPlugins>;

  const createInitialState = (
    customizeInitialSlateState?: CreateInitialStateCustomizer<TPlugins>
  ) => {
    const defaultInitialState = ({
      plugins: cplugins,
    }: {
      plugins: TPlugins;
    }) => ({
      children: [
        {
          plugin: cplugins.paragraphs.paragraph,
          children: [''],
        },
      ],
    });
    const func = customizeInitialSlateState
      ? customizeInitialSlateState
      : defaultInitialState;

    return transformInitialSlateState(func({ plugins: settings.plugins }));
  };

  // plugins should be flatten
  // NEW: to make it easier to manage and group plugins,
  // they now need to be an object of object with group and keys, see type SlatePluginCollection
  const plugins = makeSlatePluginsFromDef(settings.plugins);
  const serializeFunctions = serialization({
    createInitialState,
    plugins,
  });

  return {
    Component: (props: SlateProps) => (
      <Component
        Renderer={settings.Renderer}
        Controls={settings.Controls}
        plugins={plugins}
        translations={settings.translations}
        serializeFunctions={serializeFunctions}
        {...props}
      />
    ),

    name: settings.name,
    version: settings.version,
    IconComponent: settings.icon,
    text: settings.translations.pluginName,
    description: settings.translations.pluginDescription,
    hideInMenu: settings.hideInMenu,
    allowInlineNeighbours: settings.allowInlineNeighbours,

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
    createInitialSlateState: createInitialState,
    serialize: serializeFunctions.serialize,
    unserialize: serializeFunctions.unserialize,

    // TODO this is disabled because of #207
    // merge = hooks.merge
    // split = hooks.split

    migrations: settings.migrations,
  };
}

export default plugin;
