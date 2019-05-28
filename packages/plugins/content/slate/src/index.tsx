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

import Subject from '@material-ui/icons/Subject';
import { compose, flatten, map, prop } from 'ramda';
import Html from 'slate-html-serializer';
import * as React from 'react';
import Component from './Component';
import Plugin from './plugins/Plugin';
import * as hooks from './hooks';
import parse5 from 'parse5';
import v002 from './migrations/v002';
import { Value } from 'slate';
import { PluginButtonProps } from './plugins/Plugin';
import { ContentPluginConfig } from '@react-page/core/lib/service/plugin/classes';
import { SlateState } from './types/state';
import { SlateProps } from './types/component';
import { SlateSettings } from './types/settings';
import { pathOr } from 'ramda/src/pathOr';
import { ActionTypes } from 'redux-undo';
import { AnyAction } from 'redux';
import { defaultSettings, defaultTranslations } from './default/settings';

const createPlugins = compose(
  flatten,
  map(prop('plugins'))
);

export const createInitialState = hooks.createInitialState;

export const html = new Html({
  rules: [...hooks.defaultPlugins, hooks.lineBreakSerializer],
  parseHtml: parse5.parseFragment,
});

export const defaultPlugins = hooks.defaultPlugins;

export default (
  plugins: Plugin[] = hooks.defaultPlugins,
  translations = defaultTranslations
): ContentPluginConfig<SlateState> => {
  let settings: SlateSettings = {};
  settings.plugins = (plugins ? plugins : []).concat(createPlugins(plugins));

  const HoverButtons = ({
    editorState,
    editor,
  }: PluginButtonProps) => (
    <div>
      {plugins &&
        plugins.map(
          (plugin: Plugin, i: number) =>
            plugin.hoverButtons &&
            plugin.hoverButtons.map((Button, j: number) => (
              <Button
                translations={translations}
                key={`${i}-${j}`}
                editorState={editorState}
                editor={editor}
              />
            ))
        )}
    </div>
  );

  settings.HoverButtons = HoverButtons;

  const ToolbarButtons = ({
    editorState,
    editor,
  }: PluginButtonProps) => (
    <div>
      {plugins &&
        plugins.map(
          (plugin: Plugin, i: number) =>
            plugin.toolbarButtons &&
            plugin.toolbarButtons.map((Button, j: number) => (
              <Button
                translations={translations}
                key={`${i}-${j}`}
                editorState={editorState}
                editor={editor}
              />
            ))
        )}
    </div>
  );
  settings.ToolbarButtons = ToolbarButtons;
  const mergedSettings = { ...defaultSettings, ...settings };
  const Slate: React.SFC<SlateProps> = cellProps => (
    <Component {...cellProps} {...mergedSettings} />
  );
  const StaticComponent = ({
    state: { editorState = {} as Value } = {},
  }: SlateProps) => (
    <div
      className="ory-plugins-content-slate-container"
      dangerouslySetInnerHTML={{ __html: html.serialize(editorState) }}
    />
  );
  return {
    Component: Slate,
    StaticComponent,

    name: 'ory/editor/core/content/slate',
    version: '0.0.2',
    IconComponent: <Subject />,
    text: mergedSettings.translations.pluginName,
    description: mergedSettings.translations.pluginDescription,

    allowInlineNeighbours: true,

    /*handleFocus: (_props: SlateProps, source: string) => {
      if (source === 'onMouseDown') {
        return;
      } else if (_props.state.editorState.selection.isFocused) {
        return;
      }

      setTimeout(() => {
        _props.state.editor && _props.state.editor.focus();
      }, 0);
    },

    handleBlur: (_props: SlateProps) => {
      if (!_props.state.editorState.selection.isFocused) {
        return;
      }
      _props.onChange({
        editorState: _props.state.editor && _props.state.editor.blur().value,
      });
    },*/

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

    createInitialState: hooks.createInitialState,
    serialize: hooks.serialize,
    unserialize: hooks.unserialize,

    // TODO this is disabled because of #207
    // merge = hooks.merge
    // split = hooks.split

    migrations: [v002],
  };
};
