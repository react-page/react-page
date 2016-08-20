// @flow
import { satisfies } from 'semver'
import missing from 'src/editor/plugins/content/missing'
import slate from 'src/editor/plugins/content/slate'
import draft from 'src/editor/plugins/content/draft-js'
import image from 'src/editor/plugins/content/image'
import placeholder from 'src/editor/plugins/content/placeholder'
import spacer from 'src/editor/plugins/content/spacer'
import spoiler from 'src/editor/plugins/layout/spoiler'
import alert from 'src/editor/plugins/layout/alert'

/**
 * Plugin is the base class for content and layout plugins.
 */
export class Plugin {
  name: string
  version: string
  Component: Object
  hooks: Object

  serialize(state: any) {
    return state
  }

  unserialize(state: any) {
    return state
  }
}

/**
 * ContentPlugin is the base class for content plugins.
 */
export class ContentPlugin extends Plugin {}

/**
 * ContentPlugin is the base class for layout plugins.
 */
export class LayoutPlugin extends Plugin {}

/**
 * A list of content plugins that are being loaded by default.
 */
export const defaultContentPlugins: Array<ContentPlugin> = [
  image,
  spacer,
  draft,
  slate,
  placeholder
]

/**
 * A list of layout plugins that are being loaded by default.
 */
export const defaultLayoutPlugins: Array<LayoutPlugin> = [spoiler, alert]

const find = (name: string, version: string) => (plugin: Plugin): boolean => plugin.name === name && satisfies(plugin.version, version)

/**
 * PluginService is a registry of all content and layout plugins known to the editor.
 */
export default class PluginService {
  plugins: {
    content: Array<ContentPlugin>,
    layout: Array<LayoutPlugin>,
  }

  /**
   * Instantiate a new PluginService instance. You can provide your own set of content and layout plugins here.
   */
  constructor(contentPlugins: Array<ContentPlugin> = defaultContentPlugins, layoutPlugins: Array<LayoutPlugin> = defaultLayoutPlugins) {
    this.plugins = {
      content: contentPlugins,
      layout: layoutPlugins
    }
  }

  /**
   * Finds a layout plugin based on its name and version.
   */
  findLayoutPlugin(name: string, version: string): LayoutPlugin {
    const plugin = this.plugins.layout.find(find(name, version))

    // TODO return a default layout plugin here instead
    if (!plugin) {
      throw new Error(`Plugin ${name} with version ${version} not found.`)
    }

    return plugin
  }

  /**
   * Finds a content plugin based on its name and version.
   */
  findContentPlugin(name: string, version: string): ContentPlugin {
    const plugin = this.plugins.content.find(find(name, version))
    return plugin || missing
  }

  /**
   * Returns a list of all known plugin names.
   */
  getRegisteredNames(): Array<string> {
    return [
      ...this.plugins.content.map(({ name }: Plugin) => name),
      ...this.plugins.layout.map(({ name }: Plugin) => name)
    ]
  }
}
