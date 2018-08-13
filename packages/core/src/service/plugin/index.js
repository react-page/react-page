/*
 * This file is part of ORY Editor.
 *
 * ORY Editor is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * ORY Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with ORY Editor.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @license LGPL-3.0
 * @copyright 2016-2018 Aeneas Rekkas
 * @author Aeneas Rekkas <aeneas+oss@aeneas.io>
 *
 */

// @flow
import uuid from 'uuid'
import semver, { satisfies } from 'semver'
import { ContentPlugin, LayoutPlugin, Plugin, NativePlugin } from './classes'
import type { ComponetizedCell, NativeFactory } from '../../types/editable'
import defaultPlugin from './default'
import { layoutMissing, contentMissing } from './missing'

const find = (name: string, version: string = '*') => (
  plugin: Plugin
): boolean => plugin.name === name && satisfies(plugin.version, version)

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
    native?: NativeFactory
  }

  /**
   * Instantiate a new PluginService instance. You can provide your own set of content and layout plugins here.
   */
  constructor(
    {
      content = [],
      layout = [],
      native
    }: { content: [], layout: [], native?: NativeFactory } = {}
  ) {
    this.plugins = {
      content: [defaultPlugin, ...content].map(
        (config: any) => new ContentPlugin(config)
      ),
      layout: layout.map((config: any) => new LayoutPlugin(config)),
      native
    }
  }

  hasNativePlugin = () => Boolean(this.plugins.native)

  getNativePlugin = () => this.plugins.native

  createNativePlugin = (
    hover: any,
    monitor: any,
    component: any
  ): ComponetizedCell => {
    const native = this.plugins.native

    if (!native) {
      const insert = new NativePlugin({})
      const cell: any = { node: insert, rawNode: () => insert }
      return cell
    }

    const plugin = new NativePlugin(native(hover, monitor, component))
    const initialState = plugin.createInitialState()
    let insert: any = { content: { plugin, state: initialState } }
    if (plugin === 'layout') {
      insert = { layout: { plugin, state: initialState } }
    }

    const cell: any = { node: insert, rawNode: () => insert }
    return cell
  }

  setLayoutPlugins = (plugins: Array<any> = []) => {
    this.plugins.layout = []
    plugins.forEach((plugin: any) => this.addLayoutPlugin(plugin))
  }

  addLayoutPlugin = (config: any) => {
    this.plugins.layout.push(new LayoutPlugin(config))
  }

  removeLayoutPlugin = (name: string) => {
    this.plugins.layout = this.plugins.layout.filter(
      (plugin: LayoutPlugin) => plugin.name !== name
    )
  }

  setContentPlugins = (plugins: Array<any> = []) => {
    this.plugins.content = []

      // semicolon is required to avoid syntax error
      ;[defaultPlugin, ...plugins].forEach((plugin: any) =>
        this.addContentPlugin(plugin)
      )
  }

  addContentPlugin = (config: any) => {
    this.plugins.content.push(new ContentPlugin(config))
  }

  removeContentPlugin = (name: string) => {
    this.plugins.content = this.plugins.content.filter(
      (plugin: ContentPlugin) => plugin.name !== name
    )
  }

  /**
   * Finds a layout plugin based on its name and version.
   */
  findLayoutPlugin = (name: string, version: string): LayoutPlugin => {
    const plugin = this.plugins.layout.find(find(name, version))
    let pluginWrongVersion = undefined
    if (!plugin) {
      pluginWrongVersion = this.plugins.layout.find(find(name, '*'))
    }
    return {
      plugin: plugin || new LayoutPlugin(layoutMissing({ name, version })),
      pluginWrongVersion
    }
  }

  /**
   * Finds a content plugin based on its name and version.
   */
  findContentPlugin = (name: string, version: string): { plugin: ContentPlugin, pluginWrongVersion: ContentPlugin } => {
    const plugin = this.plugins.content.find(find(name, version))
    let pluginWrongVersion = undefined
    if (!plugin) {
      pluginWrongVersion = this.plugins.content.find(find(name, '*'))
    }
    return {
      plugin: plugin || new ContentPlugin(contentMissing({ name, version })),
      pluginWrongVersion
    }
  }

  /**
   * Returns a list of all known plugin names.
   */
  getRegisteredNames = (): Array<string> => [
    ...this.plugins.content.map(({ name }: Plugin) => name),
    ...this.plugins.layout.map(({ name }: Plugin) => name)
  ]

  migratePluginState = (state: any, plugin: Plugin, dataVersion: string): Object => {
    if (!plugin || !dataVersion || !semver.valid(dataVersion)) {
      return state
    }
    const usedMigrations = plugin.migrations ? plugin.migrations.filter(m => semver.gt(m.version, dataVersion)) : []
    usedMigrations.sort((a, b) => semver.lt(a.version, b.version) ? 1 : -1)
    try {
      usedMigrations.forEach(m => {
        state = m.migrateFromPrevious(state)
      })
      return state
    } catch (e) {
      console.error('Exception in migration', e)
      return undefined
    }
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

    const {
      plugin: { name: contentName = null, version: contentVersion = '*' } = {},
      state: contentState
    } =
      content || {}
    const {
      plugin: { name: layoutName = null, version: layoutVersion = '*' } = {},
      state: layoutState
    } =
      layout || {}

    if (contentName) {
      const found = this.findContentPlugin(contentName, contentVersion)
      if (!found.pluginWrongVersion || semver.lt(found.pluginWrongVersion, contentVersion)) {
        // Standard case
        newState.content = {
          plugin: found.plugin,
          state: found.plugin.unserialize(contentState)
        }
      } else {
        // Attempt to migrate
        const migratedState = this.migratePluginState(contentState, found.pluginWrongVersion, contentVersion)
        if (migratedState) {
          newState.content = {
            plugin: found.pluginWrongVersion,
            state: found.pluginWrongVersion.unserialize(migratedState)
          }
        } else {
          // Unable to migrate, fallback to missing plugin
          newState.content = {
            plugin: found.plugin,
            state: found.plugin.unserialize(contentState)
          }
        }
      }
    }

    if (layoutName) {
      const found = this.findLayoutPlugin(layoutName, layoutVersion)
      if (!found.pluginWrongVersion || semver.lt(found.pluginWrongVersion, layoutVersion)) {
        // Standard case
        newState.layout = {
          plugin: found.plugin,
          state: found.plugin.unserialize(layoutState)
        }
      } else {
        // Attempt to migrate
        const migratedState = this.migratePluginState(layoutState, found.pluginWrongVersion, layoutVersion)
        if (migratedState) {
          newState.layout = {
            plugin: found.pluginWrongVersion,
            state: found.pluginWrongVersion.unserialize(migratedState)
          }
        } else {
          // Unable to migrate, fallback to missing plugin
          newState.layout = {
            plugin: found.plugin,
            state: found.plugin.unserialize(layoutState)
          }
        }
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
    const { rows = [], cells = [], content, layout, inline, size, id } = state

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
