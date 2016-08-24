// @flow
/* eslint no-invalid-this: "off" */
import { AbstractAdapter, LocalStoreAdapter, DebugStorageAdapter } from './adapter'
import uuid from 'node-uuid'
import { path } from 'ramda'
import PluginService from 'src/editor/service/plugin'
import { LayoutPlugin, ContentPlugin } from 'src/editor/service/plugin/classes'

const localStorageAdapter = new LocalStoreAdapter()
const debugStorageAdapter = new DebugStorageAdapter()
const defaultPluginService = new PluginService()

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
 * ContentService is an abstraction layer for fetching and storing editable content trees.
 */
class ContentService {
  plugins:PluginService
  adapters:Array<AbstractAdapter>

  /**
   * Pass a list of adapters to use.
   */
  constructor(adapters: Array<AbstractAdapter> = [localStorageAdapter, debugStorageAdapter], plugins: PluginService = defaultPluginService) {
    this.adapters = adapters
    this.plugins = plugins
  }

  /**
   * Pass a DOM entity and fetch it's content tree.
   *
   * @param domEntity a DOM entity returned by, for example, document.getElementById()
   */
  fetch = (domEntity: Object) => new Promise((res: Function) => {
    const found = this.adapters.map((adapter: AbstractAdapter) => adapter.fetch(domEntity)).reduce((p: Object, n: Object) => p || n)

    if (!found) {
      console.error('No content state found for DOM entity:', domEntity)
      return res({ id: uuid.v4(), cells: [] })
    }

    const { cells = [], id = uuid.v4() } = found
    return res(this.unserialize({
      ...found,
      id,
      cells: cells.map(generateMissingIds)
    }))
  })

  /**
   * Persist a DOM entity's content tree.
   */
  store = (state : Object = {}) => new Promise((res: Function) => {
    this.adapters.forEach((adapter: AbstractAdapter) => adapter.store(state))
    res()
  })

  unserialize = ({
    rows,
    cells,
    content,
    layout,
    ...props
  }: {
    rows: Object[],
    cells: Object[],
    content: {
      plugin: {
        name: string,
        version: string
      },
      state: Object
    },
    layout: {
      plugin: {
        name: string,
        version: string
      },
      state: Object
    },
    props: any
  }): Object => {
    const { plugin: { name: contentName = null, version: contentVersion = '*' } = {}, state: contentState } = content || {}
    const { plugin: { name: layoutName = null, version: layoutVersion = '*' } = {}, state: layoutState } = layout || {}

    if (contentName) {
      const plugin = this.plugins.findContentPlugin(contentName, contentVersion)
      props.content = {
        plugin,
        state: plugin.unserialize(contentState)
      }
    }

    if (layoutName) {
      const plugin = this.plugins.findLayoutPlugin(layoutName, layoutVersion)
      props.layout = {
        plugin,
        state: plugin.unserialize(layoutState)
      }
    }

    if ((rows || []).length) {
      props.rows = rows.map(this.unserialize)
    }

    if ((cells || []).length) {
      props.cells = cells.map(this.unserialize)
    }

    return { ...props }
  }

  serialize = ({
    rows,
    cells,
    content,
    layout,
    ...props
  }: {
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
    const serializeProps = path(['content', 'plugin', 'hooks', 'serialize'], props)
    if (serializeProps) {
      props.content.state = serializeProps(content.state)
    }

    if (content) {
      props.content = {
        plugin: { name: content.plugin.name, version: content.plugin.version },
        state: content.plugin.serialize(content.state)
      }
    }

    if (layout) {
      props.layout = {
        plugin: { name: layout.plugin.name, version: layout.plugin.version },
        state: layout.plugin.serialize(layout.state)
      }
    }

    if ((rows || []).length) {
      props.rows = rows.map(this.serialize)
    }

    if ((cells || []).length) {
      props.cells = cells.map(this.serialize)
    }

    return { ...props }
  }
}

export default ContentService
