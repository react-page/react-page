// @flow
/* eslint-disable no-empty-function, no-unused-vars */
import { Component } from 'react'

export type ContentPluginProps<T> = {
  /**
   * @member a unique identifier.
   */
  id: string,

  /**
   * @member if the cell is currently in readOnly mode.
   */
  readOnly: boolean,

  /**
   * @member if true, the cell is currently focused.
   */
  focused: boolean,

  /**
   * @member the plugin's state.
   */
  state: T,

  /**
   * Should be called with the new state if the plugin's state changes.
   *
   * @param state
   */
  onChange(state: Object): void
}

export type LayoutPluginProps<T> = {
  /**
   * @member a unique identifier.
   */
  id: string,

  /**
   * @member if the cell is currently in readOnly mode.
   */
  readOnly: boolean,

  /**
   * @member if true, the cell is currently focused.
   */
  focused: boolean,

  /**
   * @member the plugin's state.
   */
  state: T,

  /**
   * Should be called with the new state if the plugin's state changes.
   *
   * @param state
   */
  onChange(state: Object): void
}

/**
 * @class the abstract class for content and layout plugins. It will be instantiated once and used for every cell that is equipped with it.
 */
export class Plugin {
  /**
   * @member a unique identifier of the plugin
   */
  name: string

  /**
   * @member the semantic version (www.semver.org) of this plugin.
   */
  version: string

  /**
   * @member the icon that will be shown in the toolbar.
   */
  icon: Component

  /**
   * @member the text that will be shown alongside the icon in the toolbar.
   */
  text: string

  /**
   * @member the plugin's react component.
   */
  Component: Component

  /**
   * Serialize a the plugin state
   *
   * @param raw the raw state.
   * @returns the serialized state.
   */
  serialize = (raw: Object): Object => raw

  /**
   * Unserialize the plugin state.
   *
   * @param state the plugin state.
   * @returns the unserialized state.
   */
  unserialize = (state: Object): Object => state
}

/**
 * @class this is the base class for content plugins.
 */
export class ContentPlugin extends Plugin {
  /**
   * @member if inlineable is true, the plugin is allowed to be placed with floating to left or right.
   */
  inlineable: boolean

  /**
   * @member if true allows that inlineable elements may be placed "in" this plugin.
   */
  allowInline: boolean

  /**
   * Create the plugin's initial state.
   *
   * @returns the initial state.
   */
  createInitialState = (): Object => ({})

  /**
   * Will be called when the user presses the delete key. When returning a resolving promise,
   * the cell will be removed. If the promise is rejected, nothing happens.
   *
   * @param e
   * @param props
   * @returns a promise
   */
  handleRemoveHotKey = (e: Event, props: ContentPluginProps<*>): Promise<*> => Promise.resolve()

  /**
   * Will be called when the user presses the right or down key. When returning a resolving promise,
   * the next cell will be focused. If the promise is rejected, focus stays the same.
   *
   * @param e
   * @param props
   * @returns a promise
   */
  handleFocusNextHotKey = (e: Event, props: ContentPluginProps<*>): Promise<*> => Promise.resolve()

  /**
   * Will be called when the user presses the left or up key. When returning a resolving promise,
   * the next cell will be focused. If the promise is rejected, focus stays the same.
   *
   * @param e
   * @param props
   * @returns a promise
   */
  handleFocusPreviousHotKey = (e: Event, props: ContentPluginProps<*>): Promise<*> => Promise.resolve()

  /**
   * This function will be called when one of the plugin's cell is blurred.
   *
   * @param props
   */
  onFocus = (props: ContentPluginProps<*>): void => {}

  /**
   * This function will be called when one of the plugin's cell is focused.
   *
   * @param props
   */
  onBlur = (props: ContentPluginProps<*>): void => {}
}

/**
 * @class this is the base class for layout plugins.
 */
export class LayoutPlugin extends Plugin {
  /**
   * Create the plugin's initial state.
   *
   * @returns the initial state.
   */
  createInitialState = (): Object => ({})

  /**
   * Create the plugin's initial children (rows/cells).
   *
   * @returns the initial state.
   */
  createInitialChildren = (): Object => ({})

  /**
   * Will be called when the user presses the delete key. When returning a resolving promise,
   * the plugin's cell will be removed. If the promise is rejected, nothing happens.
   *
   * @param e
   * @param props
   * @returns a promise
   */
  handleRemoveHotKey = (e: Event, props: ContentPluginProps<*>): Promise<*> => Promise.resolve()

  /**
   * Will be called when the user presses the right or down key. When returning a resolving promise,
   * the next cell will be focused. If the promise is rejected, focus stays the same.
   *
   * @param e
   * @param props
   * @returns a promise
   */
  handleFocusNextHotKey = (e: Event, props: ContentPluginProps<*>): Promise<*> => Promise.resolve()

  /**
   * Will be called when the user presses the left or up key. When returning a resolving promise,
   * the next cell will be focused. If the promise is rejected, focus stays the same.
   *
   * @param e
   * @param props
   * @returns a promise
   */
  handleFocusPreviousHotKey = (e: Event, props: ContentPluginProps<*>): Promise<*> => Promise.resolve()

  /**
   * This function will be called when one of the plugin's cell is blurred.
   *
   * @param props
   */
  onFocus = (props: LayoutPluginProps<*>): void => {}

  /**
   * This function will be called when one of the plugin's cell is focused.
   *
   * @param props
   */
  onBlur = (props: LayoutPluginProps<*>): void => {}
}
