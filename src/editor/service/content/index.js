import { LocalStoreAdapter, DebugStorageAdapter } from './adapter'
import uuid from 'node-uuid'
import { path } from 'ramda'

import PluginService from 'src/editor/service/plugin'

const localStorageAdapter = new LocalStoreAdapter()
const debugStorageAdapter = new DebugStorageAdapter()
const defaultPluginService = new PluginService()

/**
 * Iterate through an editable content tree and generate ids where missing.
 *
 * @param {[]} rows
 * @param {[]} cells
 * @param {string} id
 * @param {{}} props
 */
export const hydrate = ({ rows = [], cells = [], id = uuid.v4(), ...props }) => {
  if (rows.length) {
    props.rows = rows.map(hydrate)
  } else if (cells.length) {
    props.cells = cells.map(hydrate)
  }

  return ({ ...props, id })
}

/**
 * ContentService is an abstraction layer for fetching and storing editable content trees.
 */
class ContentService {
  /**
   * Pass a list of adapters to use.
   *
   * @param {[]} adapters
   * @param {PluginService} plugins
   */
  constructor(adapters = [localStorageAdapter, debugStorageAdapter], plugins = defaultPluginService) {
    this.adapters = adapters
    this.plugins = plugins

    this.unserialize = this.unserialize.bind(this)
    this.serialize = this.serialize.bind(this)
    this.fetch = this.fetch.bind(this)
  }

  /**
   * Pass a DOM entity and fetch it's content tree.
   *
   * @param {{}} domEntity a DOM entity returned by, for example, document.getElementById()
   * @returns {Promise}
   */
  fetch(domEntity) {
    return new Promise((res) => {
      const found = this.adapters.map((adapter) => adapter.fetch(domEntity)).reduce((p, n) => p || n)

      if (!found) {
        console.error('No content state found for DOM entity:', domEntity)
        return res({ id: uuid.v4(), cells: [] })
      }

      const { cells = [], id = uuid.v4() } = found
      return res(this.unserialize({
        ...found,
        id,
        cells: cells.map(hydrate)
      }))
    })
  }

  /**
   * Persist a DOM entity's content tree.
   *
   * @param state
   */
  store(state = {}) {
    return new Promise((res) => {
      this.adapters.forEach((adapter) => adapter.store(state))
      res()
    })
  }

  unserialize({
    rows = [],
    cells = [],
    plugin = {},
    layout = {},
    ...props
  }) {
    const { name: pluginName = null, version: pluginVersion = '*' } = plugin
    const { name: layoutName = null, version: layoutVersion = '*' } = layout

    if (pluginName) {
      props.plugin = this.plugins.findContentPlugin(pluginName, pluginVersion)
    }

    if (layoutName) {
      props.layout = this.plugins.findLayoutPlugin(layoutName, layoutVersion)
    }

    if (rows.length) {
      props.rows = rows.map(this.unserialize)
    }

    if (cells.length) {
      props.cells = cells.map(this.unserialize)
    }

    const unserializeProps = path(['plugin', 'hooks', 'unserialize'], props)

    if (unserializeProps) {
      props.props = unserializeProps(props.props)
    }

    return { ...props }
  }

  serialize({
    rows = [],
    cells = [],
    plugin = null,
    layout = null,
    ...props
  }) {
    const serializeProps = path(['plugin', 'hooks', 'serialize'], props)

    if (serializeProps) {
      props.props = serializeProps(props.props)
    }

    if (plugin) {
      props.plugin = { name: plugin.name, version: plugin.version }
    }

    if (layout) {
      props.layout = { name: layout.name, version: layout.version }
    }

    if (rows.length) {
      props.rows = rows.map(this.serialize)
    }

    if (cells.length) {
      props.cells = cells.map(this.serialize)
    }

    return { ...props }
  }
}

export default ContentService
