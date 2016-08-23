// @flow

/**
 * Plugin is the base class for content and layout plugins.
 */
export class Plugin {
  name: string
  version: string
  Component: Object
  state: Object

  serialize = (raw: Object): Object => raw
  unserialize = (state: Object): Object => state
}

/**
 * ContentPlugin is the base class for content plugins.
 */
export class ContentPlugin extends Plugin {
  inlineable: boolean
  createInitialState = (): Object => ({})
}

/**
 * ContentPlugin is the base class for layout plugins.
 */
export class LayoutPlugin extends Plugin {
  createInitialState = (): Object => ({})
}
