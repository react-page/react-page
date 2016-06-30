import { satisfies } from 'semver'
import Missing from 'src/editor/plugins/content/missing'

export const defaultContentPlugins = []
export const defaultLayoutPlugins = []
export const missingContentPlugin = Missing

const find = (name = '', version = '') => (plugin) => plugin.name === name && satisfies(plugin.version, version)

export default class PluginRepository {
  constructor(contentPlugins = defaultContentPlugins, layoutPlugins = defaultLayoutPlugins) {
    this.plugins = {
      content: contentPlugins,
      layout: layoutPlugins
    }

    this.unserialize = this.unserialize.bind(this)
    this.serialize = this.serialize.bind(this)
  }

  find(plugins) {
    return (name, version) => plugins.find(find(name, version))
  }

  unserialize({
    rows = [],
    cells = [],
    plugin = {},
    layout = {},
    ...props
  }) {
    const { name: pluginName = null, version: pluginVersion = null } = plugin
    if (pluginName) {
      props.plugin = this.find(this.plugins.content)(pluginName, pluginVersion) || missingContentPlugin
    }

    const { name: layoutName = null, version: layoutVersion = null } = layout
    if (layoutName) {
      props.layout = this.find(this.plugins.layout)(layoutName, layoutVersion) || null
    }

    return {
      ...props,
      rows: rows.map(this.unserialize),
      cells: cells.map(this.unserialize)
    }
  }

  serialize({
    rows = [],
    cells = [],
    plugin = null,
    layout = null,
    ...props
  }) {
    if (plugin) {
      props.plugin = {
        name: plugin.name,
        version: plugin.version || '*'
      }
    }

    if (layout) {
      props.layout = {
        name: layout.name,
        version: layout.version || '*'
      }
    }

    return {
      ...props,
      rows: rows.map(this.serialize),
      cells: cells.map(this.serialize)
    }
  }
}
