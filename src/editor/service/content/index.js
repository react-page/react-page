// @flow
import { AbstractAdapter, LocalStoreAdapter, DebugStorageAdapter } from './adapter'
import uuid from 'node-uuid'
import { path } from 'ramda'

import PluginService from 'src/editor/service/plugin'

const localStorageAdapter = new LocalStoreAdapter()
const debugStorageAdapter = new DebugStorageAdapter()
const defaultPluginService = new PluginService()

/**
 * Iterate through an editable content tree and generate ids where missing.
 */
export const hydrate = ({ rows = [], cells = [], id = uuid.v4(), ...props }: Object): Object => {
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
  plugins: PluginService
  adapters: Array<AbstractAdapter>

  /**
   * Pass a list of adapters to use.
   */
  constructor(adapters: Array<AbstractAdapter> = [localStorageAdapter, debugStorageAdapter], plugins: PluginService = defaultPluginService) {
    this.adapters = adapters
    this.plugins = plugins

    this.unserialize = this.unserialize.bind(this)
    this.serialize = this.serialize.bind(this)
    this.fetch = this.fetch.bind(this)
  }

  /**
   * Pass a DOM entity and fetch it's content tree.
   *
   * @param domEntity a DOM entity returned by, for example, document.getElementById()
   */
  fetch(domEntity: Object): Promise {
    return new Promise((res: Function) => {
      const found = this.adapters.map((adapter: AbstractAdapter) => adapter.fetch(domEntity)).reduce((p: Object, n: Object) => p || n)

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
   */
  store(state: Object = {}) {
    return new Promise((res: Function) => {
      this.adapters.forEach((adapter: AbstractAdapter) => adapter.store(state))
      res()
    })
  }

  unserialize({
    rows = [],
    cells = [],
    content = {},
    layout = {},
    ...props
  }: Object): Object {
    const { plugin: { name: contentName = null, version: contentVersion = '*' } = {} } = content
    const { plugin: { name: layoutName = null, version: layoutVersion = '*' } = {} } = layout

    if (contentName) {
      props.content = { plugin: this.plugins.findContentPlugin(contentName, contentVersion) }
    }

    if (layoutName) {
      props.layout = { plugin: this.plugins.findLayoutPlugin(layoutName, layoutVersion) }
    }

    if (rows.length) {
      props.rows = rows.map(this.unserialize)
    }

    if (cells.length) {
      props.cells = cells.map(this.unserialize)
    }

    const unserializeProps = path(['content', 'plugin', 'hooks', 'unserialize'], props)
    if (unserializeProps) {
      props.content.state = unserializeProps(content.state)
    }

    return { ...props }
  }

  serialize({
    rows = [],
    cells = [],
    content = null,
    layout = null,
    ...props
  }: Object): Object {
    const serializeProps = path(['content', 'plugin', 'hooks', 'serialize'], props)
    if (serializeProps) {
      props.content.state = serializeProps(content.state)
    }

    if (content) {
      props.content = { plugin: { name: content.plugin.name, version: content.plugin.version } }
    }

    if (layout) {
      props.layout = { plugin: { name: layout.plugin.name, version: layout.plugin.version } }
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
