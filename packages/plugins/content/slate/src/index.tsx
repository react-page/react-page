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
import { compose, flatten, map, prop, pathOr } from 'ramda';
import Html from 'slate-html-serializer';
import * as React from 'react';
import { ActionTypes } from 'redux-undo';
import Component, { SlateProps } from './Component';
import Plugin from './plugins/Plugin';
import * as hooks from './hooks';
import parse5 from 'parse5';
import v002 from './migrations/v002';
import { Value } from 'slate';
import { AnyAction } from 'redux';
import { PluginButtonProps } from './plugins/Plugin';
import { ContentPluginConfig } from 'ory-editor-core/lib/service/plugin/classes';
import { SlateState } from './types/state';

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

export default (plugins: Plugin[] = hooks.defaultPlugins): ContentPluginConfig<SlateState> => {
  // tslint:disable-next-line:no-any
  let props: any = {};
  props.plugins = (plugins ? plugins : []).concat(createPlugins(plugins));
  props.onKeyDown = (
    e: Event,
    data: { key: string; isMod: boolean; isShift: boolean },
    state: Value
  ) => {
    // we need to prevent slate from handling undo and redo
    if (data.isMod && (data.key === 'z' || data.key === 'y')) {
      return state;
    }

    if (data.isShift && data.key === 'enter') {
      return state.change().insertText('\n').value;
    }

    for (let i = 0; i < plugins.length; i++) {
      const { onKeyDown } = plugins[i];
      const newState = onKeyDown && onKeyDown(e, data, state);

      if (newState) {
        return newState;
      }
    }

    return;
  };

  const HoverButtons = ({
    editorState,
    onChange,
    focus,
  }: PluginButtonProps) => (
    <div>
      {plugins &&
        plugins.map(
          (plugin: Plugin, i: number) =>
            plugin.hoverButtons &&
            plugin.hoverButtons.map((Button, j: number) => (
              <Button
                key={`${i}-${j}`}
                editorState={editorState}
                onChange={onChange}
                focus={focus}
              />
            ))
        )}
    </div>
  );

  props.HoverButtons = HoverButtons;

  const ToolbarButtons = ({
    editorState,
    onChange,
    focus,
  }: PluginButtonProps) => (
    <div>
      {plugins &&
        plugins.map(
          (plugin: Plugin, i: number) =>
            plugin.toolbarButtons &&
            plugin.toolbarButtons.map((Button, j: number) => (
              <Button
                key={`${i}-${j}`}
                editorState={editorState}
                onChange={onChange}
                focus={focus}
              />
            ))
        )}
    </div>
  );
  props.ToolbarButtons = ToolbarButtons;

  const Slate = (cellProps: SlateProps) => (
    <Component {...cellProps} {...props} />
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
    text: 'Text',
    description: 'An advanced rich text area.',

    allowInlineNeighbours: true,

    handleFocus: (_props: SlateProps, source: string) => {
      if (source === 'onMouseDown') {
        return;
      } else if (_props.state.editorState.isFocused) {
        return;
      }

      setTimeout(() => {
        _props.state.editorState.change().focus();
      }, 0);
    },

    handleBlur: (_props: SlateProps) => {
      if (!_props.state.editorState.isFocused) {
        return;
      }

      _props.onChange({
        editorState: _props.state.editorState.change().blur().value,
      });
    },

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
