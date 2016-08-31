// @flow
/* eslint no-empty-function: ["off"] */

/**
 * Plugin is the base class for content and layout plugins.
 */
export class Plugin {
  name: string
  version: string
  Component: Object

  serialize = (raw: Object): Object => raw
  unserialize = (state: Object): Object => state
}

export type ContentPluginProps = {
  id: string,
  readOnly: boolean,
  focused: boolean,
  state: Object,
  onChange(state: Object): void
}

/**
 * ContentPlugin is the base class for content plugins.
 */
export class ContentPlugin extends Plugin {
  inlineable: boolean

  createInitialState = (): Object => ({})

  onRemoveHotKey = (_: Event, __: ContentPluginProps): boolean => true
  onFocusNextHotKey = (_: Event, __: ContentPluginProps): boolean => true
  onFocusPreviousHotKey = (_: Event, __: ContentPluginProps): boolean => true

  onFocus = (_: ContentPluginProps): void => {}
  onBlur = (_: ContentPluginProps): void => {}
}

export type LayoutPluginProps = {
  id: string,
  readOnly: boolean,
  focused: boolean,
  state: Object,
  onChange(state: Object): void
}

/**
 * ContentPlugin is the base class for layout plugins.
 */
export class LayoutPlugin extends Plugin {
  createInitialState = (): Object => ({})
  createInitialChildren = (): Object => ({})

  onRemoveHotKey = (_: Event, __: LayoutPluginProps): boolean => true
  onFocusNextHotKey = (_: Event, __: LayoutPluginProps): boolean => true
  onFocusPreviousHotKey = (_: Event, __: LayoutPluginProps): boolean => true

  onFocus = (_: LayoutPluginProps): void => {}
  onBlur = (_: LayoutPluginProps): void => {}
}
