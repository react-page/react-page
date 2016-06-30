export const defaultPlugins = []

const matchesVersion = (needle, match) => {}

const find = (name = '', version = '') => (plugin) => plugin.getName() === name && matchesVersion(version, plugin.getVersion())

export default class PluginRepository {
  constructor(plugins = defaultPlugins, layoutBlocks = []) {
    this.plugins = plugins
    this.layoutBlocks = layoutBlocks
  }

  findPlugin(name = '', version = '*') {
    return this.plugins.find(find(name, version))
  }

  findLayoutBlock(name = '', version = '*') {
    return this.layoutBlocks.find(find(name, version))
  }

  unserialize({
    rows = [],
    cells = [],
    plugin: {
      name: pluginName = null,
      version: pluginVersion = null
    },
    layout: {
      name: layoutName = null,
      version: layoutVersion = null
    },
    ...props
  }) {
    if (pluginName) {
      props.plugin = this.findPlugin(pluginName, pluginVersion)
    }

    if (layoutName) {
      props.wrap = this.findLayoutBlock(layoutName, layoutVersion)
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
        name: plugin.getName(),
        version: plugin.getVersion()
      }
    }

    if (layout) {
      props.layout = {
        name: layout.getName(),
        version: layout.getVersion()
      }
    }

    return {
      ...props,
      rows: rows.map(this.unserialize),
      cells: cells.map(this.unserialize)
    }
  }
}
