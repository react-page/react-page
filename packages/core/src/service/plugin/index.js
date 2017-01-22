// @flow
import uuid from 'uuid'
import { satisfies } from 'semver'
import { ContentPlugin, LayoutPlugin, Plugin } from './classes'
import defaultPlugin from './default'
import missing from './missing'

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
  constructor({ content = [], layout = [] }: { content: [], layout: []} = {}) {
    this.plugins = {
      content: [defaultPlugin, ...content].map((config: any) => new ContentPlugin(config)),
      layout: layout.map((config: any) => new LayoutPlugin(config)),
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
    return plugin || new ContentPlugin(missing({ name, version }))
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
      inline,
      size,
      id
    } = state
    const newState: Object = { id, inline, size }

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

  serialize = (state: Object): Object => {
    const {
      rows = [],
      cells = [],
      content,
      layout,
      inline,
      size,
      id
    } = state

    const newState: Object = { id, inline, size }
    if (content && content.plugin) {
      newState.content = {
        plugin: { name: content.plugin.name, version: content.plugin.version },
        state: content.plugin.serialize(content.state)
      }
    }

    if (layout && layout.plugin) {
      newState.layout = {
        plugin: { name: layout.plugin.name, version: layout.plugin.version },
        state: layout.plugin.serialize(layout.state)
      }
    }

    if (rows.length) {
      newState.rows = rows.map(this.serialize)
    }

    if (cells.length) {
      newState.cells = cells.map(this.serialize)
    }

    return newState
  }
}
