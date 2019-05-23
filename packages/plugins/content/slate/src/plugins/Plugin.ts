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
import { RenderMarkProps, RenderNodeProps } from 'slate-react';
import { Value, Editor } from 'slate';
import { NextType } from '../types/next';
import { Translations } from '../types/translations';

export class PluginButtonProps {
  editor: Editor;
  editorState: Value;
  translations: Partial<Translations>;
}

/**
 * @class this is the base class for slate plugins
 */
export default class Plugin {
  /**
   * @member a default node
   */
  public DEFAULT_NODE: string;

  /**
   * @member a unique identifier of the plugin
   */
  public name: string;

  /**
   * @member the schema that is automatically collected from all plugins
   */
  public schema: {
    // tslint:disable-next-line:no-any
    document?: { [key: string]: any };
    // tslint:disable-next-line:no-any
    blocks?: { [key: string]: any };
    // tslint:disable-next-line:no-any
    inlines?: { [key: string]: any };
    rules?: [];
  };

  /**
   * @member the slate plugins added to the editor
   */
  // tslint:disable-next-line:no-any
  plugins: any[] = [];

  /**
   * @member serialize a plugin's state to html
   */
  serialize: (
    // tslint:disable-next-line:no-any
    object: { object: string; type: string; data: any },
    // tslint:disable-next-line:no-any
    children: any[]
  ) => // tslint:disable-next-line:no-any
  any;

  /**
   * @member serialize a plugin's state from html
   */
  // tslint:disable-next-line:no-any
  deserialize: (el: Element, next: Function) => any;

  /**
   * @member the buttons to be added to the hover menu
   */
  public hoverButtons: React.ComponentType<PluginButtonProps>[];

  /**
   * @member the buttons to be added to the global toolbar
   */
  public toolbarButtons: React.ComponentType<PluginButtonProps>[];

  /**
   * @member the function that renders marks
   */
  // tslint:disable-next-line:no-any
  public renderMark: (
    props: RenderMarkProps,
    editor: Editor,
    next: NextType
  // tslint:disable-next-line:no-any
  ) => any;

  /**
   * @member the function that renders nodes
   */
  // tslint:disable-next-line:no-any
  public renderNode: (
    props: RenderNodeProps,
    editor: Editor,
    next: NextType
  // tslint:disable-next-line:no-any
  ) => any;

  /**
   * This handler is called when any key is pressed
   *
   * @param e the keydown event
   * @param data utilities for hotkey logic
   * @param state the current editor state
   * @returns the new editor state if the plugin handles the hotkey
   */
  public onKeyDown: (
    e: KeyboardEvent,
    editor: Editor,
    next: NextType
  ) => boolean;
}
