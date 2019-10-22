import {
  RenderMarkProps,
  RenderBlockProps,
  RenderInlineProps
} from 'slate-react';
import { Editor } from 'slate';
import { NextType } from './next';
import {
  PluginButtonProps,
  SlateNodeObjectType,
  SlatePluginDefinition
} from './slatePluginDefinitions';

/**
 * this is a more low level plugin
 */
export default interface SlatePlugin {
  /**
   * @member a default node
   */
  DEFAULT_NODE?: string;

  /**
   * @member pluginDefintion is only used in createInitialSlateState to simplify creating initial slate state
   */
  // tslint:disable-next-line:no-any
  pluginDefintion?: SlatePluginDefinition<any>;

  /**
   * @member serialize a plugin's state to html
   */
  serialize?: (
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
  deserialize?: (el: Element, next: Function) => any;

  /**
   * @member the buttons to be added to the hover menu
   */
  hoverButtons?: React.ComponentType<PluginButtonProps>[];

  /**
   * @member the buttons to be added to the global toolbar
   */
  toolbarButtons?: React.ComponentType<PluginButtonProps>[];

  /**
   * @member the function that renders marks
   */
  // tslint:disable-next-line:no-any
  renderMark?: (
    props: RenderMarkProps,
    editor: Editor,
    next: NextType
  ) => // tslint:disable-next-line:no-any
  any;

  /**
   * @member the function that renders nodes
   */
  // tslint:disable-next-line:no-any
  renderBlock?: (
    props: RenderBlockProps,
    editor: Editor,
    next: NextType
  ) => // tslint:disable-next-line:no-any
  any;

  renderInline?: (
    props: RenderInlineProps,
    editor: Editor,
    next: NextType
  ) => // tslint:disable-next-line:no-any
  any;

  /**
   * This handler is called when any key is pressed
   *
   * @param e the keydown event
   * @param data utilities for hotkey logic
   * @param state the current editor state
   * @returns the new editor state if the plugin handles the hotkey
   */
  onKeyDown?: (
    e: KeyboardEvent | Event,
    editor: Editor,
    // tslint:disable-next-line:no-any
    next: NextType | any
  ) => void;
}

export type SlatePluginOrListOfPlugins = SlatePlugin | SlatePlugin[];

export type SlatePluginOrFactory =
  // tslint:disable-next-line:no-any
  ((...args: any) => SlatePluginOrListOfPlugins) | SlatePluginOrListOfPlugins;
export type SlatePluginCollection = {
  [group: string]: {
    [key: string]: SlatePluginOrFactory;
  };
};
