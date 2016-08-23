// @flow
import { satisfies } from 'semver'
import { ContentPlugin, LayoutPlugin, Plugin } from './classes'
import MissingPlugin from 'src/editor/plugins/content/missing'
import SlatePlugin from 'src/editor/plugins/content/slate'
import ImagePlugin from 'src/editor/plugins/content/image'
import PlaceholderPlugin from 'src/editor/plugins/content/placeholder'
import SpacerPlugin from 'src/editor/plugins/content/spacer'
import SpoilerPlugin from 'src/editor/plugins/layout/spoiler'
import AlertPlugin from 'src/editor/plugins/layout/alert'

/**
 * A list of content plugins that are being loaded by default.
 */
export const defaultContentPlugins: Array<ContentPlugin> = [
  new MissingPlugin(),
  new ImagePlugin(),
  new SpacerPlugin(),
  new SlatePlugin(),
  new PlaceholderPlugin()
]

/**
 * A list of layout plugins that are being loaded by default.
 */
export const defaultLayoutPlugins: Array<LayoutPlugin> = [new SpoilerPlugin(), new AlertPlugin()]

const find = (name: string, version: string = '*') => (plugin: Plugin): boolean => plugin.name === name && satisfies(plugin.version, version)

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
    return plugin || new MissingPlugin()
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
