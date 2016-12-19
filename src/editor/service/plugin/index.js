// @flow
import uuid from 'uuid'
import path from 'ramda/src/path'
import { satisfies } from 'semver'
import { ContentPlugin, LayoutPlugin, Plugin } from './classes'
import MissingPlugin from 'src/editor/plugins/content/missing'
import slatePluginCreator from 'src/editor/plugins/content/slate'
import ImagePlugin from 'src/editor/plugins/content/image'
import VideoPlugin from 'src/editor/plugins/content/video'
import SpacerPlugin from 'src/editor/plugins/content/spacer'
import DividerPlugin from 'src/editor/plugins/content/divider'
import SpoilerPlugin from 'src/editor/plugins/layout/spoiler'

/**
 * A list of content plugins that are being loaded by default.
 */
export const defaultContentPlugins: [] = [
  MissingPlugin,
  ImagePlugin,
  SpacerPlugin,
  slatePluginCreator(),
  VideoPlugin,
  DividerPlugin
]

/**
 * A list of layout plugins that are being loaded by default.
 */
export const defaultLayoutPlugins: [] = [
  SpoilerPlugin
]

const find = (name: string, version: string = '*') => (plugin: Plugin): boolean => plugin.name === name && satisfies(plugin.version, version)

/**
 * Iterate through an editable content tree and generate ids where missing.
 */
export const generateMissingIds = (props: Object): Object => {
  const { rows, cells, id } = props

  if ((rows || []).length > 0) {
    props.rows = rows.map(generateMissingIds)
  } else if ((cells || []).length > 0) {
    props.cells = cells.map(generateMissingIds)
  }

  return { ...props, id: id || uuid.v4() }
}

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
  constructor(contentPlugins: [] = defaultContentPlugins, layoutPlugins: [] = defaultLayoutPlugins) {
    this.plugins = {
      content: contentPlugins.map((config: any) => new ContentPlugin(config)),
      layout: layoutPlugins.map((config: any) => new LayoutPlugin(config)),
    }
  }

  /**
   * Finds a layout plugin based on its name and version.
   */
  findLayoutPlugin(name: string, version: string): LayoutPlugin {
    const plugin = this.plugins.layout.find(find(name, version))

    // TODO return a default layout plugin here instead
    if (!plugin) {
      throw new Error(`Plugin ${name} with version ${version} not found`)
    }

    return plugin
  }

  /**
   * Finds a content plugin based on its name and version.
   */
  findContentPlugin(name: string, version: string): ContentPlugin {
    const plugin = this.plugins.content.find(find(name, version))
    return plugin || new ContentPlugin(MissingPlugin)
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

  unserialize = (state: any): Object => {
    const {
      rows = [],
      cells = [],
      content = {},
      layout = {},
      id
    } = state
    const newState = { id }

    const { plugin: { name: contentName = null, version: contentVersion = '*' } = {}, state: contentState } = content || {}
    const { plugin: { name: layoutName = null, version: layoutVersion = '*' } = {}, state: layoutState } = layout || {}

    if (contentName) {
      const plugin = this.findContentPlugin(contentName, contentVersion)
      newState.content = {
        plugin,
        state: plugin.unserialize(contentState)
      }
    }

    if (layoutName) {
      const plugin = this.findLayoutPlugin(layoutName, layoutVersion)
      newState.layout = {
        plugin,
        state: plugin.unserialize(layoutState)
      }
    }

    if ((rows || []).length) {
      newState.rows = rows.map(this.unserialize)
    }

    if ((cells || []).length) {
      newState.cells = cells.map(this.unserialize)
    }

    return generateMissingIds(newState)
  }

  serialize = (state: {
    rows: Object[],
    cells: Object[],
    content: {
      plugin: ContentPlugin,
      state: Object
    },
    layout: {
      plugin: LayoutPlugin,
      state: Object
    },
    props: any
  }): Object => {
    const {
      rows,
      cells,
      content,
      layout,
      id
    } = state

    const newState = { id }
    if (content) {
      newState.content = {
        plugin: { name: content.plugin.name, version: content.plugin.version },
        state: content.plugin.serialize(content.state)
      }
    }

    if (layout) {
      newState.layout = {
        plugin: { name: layout.plugin.name, version: layout.plugin.version },
        state: layout.plugin.serialize(layout.state)
      }
    }

    if ((rows || []).length) {
      newState.rows = rows.map(this.serialize)
    }

    if ((cells || []).length) {
      newState.cells = cells.map(this.serialize)
    }

    return newState
  }
}
