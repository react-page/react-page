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
/* eslint-disable no-empty-function, no-unused-vars */
import React, { Component, Element } from 'react'
import semver from 'semver'

export type ContentPluginProps<T> = {
  /**
   * @member a unique identifier.
   */
  id: string,

  /**
   * @member if the cell is currently in readOnly mode.
   */
  readOnly: boolean,

  /**
   * @member the plugin's name
   */
  name: string,

  /**
   * @member the plugin's version
   */
  version: string,

  /**
   * @member if true, the cell is currently focused.
   */
  focused: boolean,

  /**
   * @member the plugin's state.
   */
  state: T,

  /**
   * Should be called with the new state if the plugin's state changes.
   *
   * @param state
   */
  onChange(state: Object): void
}

export type LayoutPluginProps<T> = {
  /**
   * @member a unique identifier.
   */
  id: string,

  /**
   * @member if the cell is currently in readOnly mode.
   */
  readOnly: boolean,

  /**
   * @member if true, the cell is currently focused.
   */
  focused: boolean,

  /**
   * @member the plugin's state.
   */
  state: T,

  /**
   * Should be called with the new state if the plugin's state changes.
   *
   * @param state
   */
  onChange(state: Object): void
}

/**
 * @class the class used to migrate plugin content between toVersion
 */
export class Migration {
  constructor(config: any) {
    const { toVersion, migrate, fromVersionRange } = config

    if (
      !migrate ||
      !toVersion ||
      !fromVersionRange ||
      semver.valid(toVersion) === null ||
      semver.validRange(fromVersionRange) === null
    ) {
      throw new Error(
        `A migration toVersion, fromVersionRange and migrate function must be defined, got ${JSON.stringify(
          config
        )}`
      )
    }
    this.toVersion = toVersion
    this.migrate = migrate
    this.fromVersionRange = fromVersionRange
  }
  fromVersionRange: string
  toVersion: string
  migrate = (state: any): any => state
}

/**
 * @class the abstract class for content and layout plugins. It will be instantiated once and used for every cell that is equipped with it.
 */
export class Plugin {
  constructor(config: any) {
    const {
      name,
      version,
      Component,
      IconComponent,
      text,
      StaticComponent,
      serialize,
      unserialize,
      description,
      handleRemoveHotKey,
      handleFocusNextHotKey,
      handleFocusPreviousHotKey,
      handleFocus,
      handleBlur,
      reducer,
      migrations
    } = config

    if (!name || !version || !Component) {
      throw new Error(
        `A plugin's version, name and Component must be defined, got ${JSON.stringify(
          config
        )}`
      )
    }

    this.name = name
    this.version = version
    this.Component = Component
    this.StaticComponent = StaticComponent
    this.IconComponent = IconComponent
    this.text = text
    this.description = description
    this.config = config
    this.migrations = migrations ? migrations : []

    this.serialize = serialize ? serialize.bind(this) : this.serialize
    this.unserialize = unserialize ? unserialize.bind(this) : this.unserialize
    this.handleRemoveHotKey = handleRemoveHotKey
      ? handleRemoveHotKey.bind(this)
      : this.handleRemoveHotKey
    this.handleFocusNextHotKey = handleFocusNextHotKey
      ? handleFocusNextHotKey.bind(this)
      : this.handleFocusNextHotKey
    this.handleFocusPreviousHotKey = handleFocusPreviousHotKey
      ? handleFocusPreviousHotKey.bind(this)
      : this.handleFocusPreviousHotKey
    this.handleFocus = handleFocus ? handleFocus.bind(this) : this.handleFocus
    this.handleBlur = handleBlur ? handleBlur.bind(this) : this.handleBlur
    this.reducer = reducer ? reducer.bind(this) : this.reducer
  }

  config: any

  /**
   * @member a unique identifier of the plugin.
   */
  name: string

  /**
   * @member describes the plugin in a few words.
   */
  description: string

  /**
   * @member migrations used to migrate plugin state from older version to new one
   */
  migrations: Migration[]

  /**
   * @member the semantic version (www.semver.org) of this plugin.
   */
  version: string

  /**
   * @member the icon that will be shown in the toolbar.
   */
  IconComponent: any
  // IconComponent: Element<*> | Component<*, *, *>

  /**
   * @member the plugin's react component.
   */
  Component: any
  // Component: Element<*> | Component<*, *, *> | (props: any) => Element<*>

  /**
   * @member the plugin's react component for rendering static content.
   */
  StaticComponent: any

  /**
   * @member the text that will be shown alongside the icon in the toolbar.
   */
  text: string

  /**
   * Serialize a the plugin state
   *
   * @param raw the raw state.
   * @returns the serialized state.
   */
  serialize = (raw: Object): Object => raw

  /**
   * Unserialize the plugin state.
   *
   * @param state the plugin state.
   * @returns the unserialized state.
   */
  unserialize = (state: Object): Object => state

  /**
   * Will be called when the user presses the delete key. When returning a resolving promise,
   * the cell will be removed. If the promise is rejected, nothing happens.
   *
   * @param e
   * @param props
   * @returns a promise
   */
  handleRemoveHotKey = (e: Event, props: ContentPluginProps<*>): Promise<*> =>
    Promise.reject()

  /**
   * Will be called when the user presses the right or down key. When returning a resolving promise,
   * the next cell will be focused. If the promise is rejected, focus stays the same.
   *
   * @param e
   * @param props
   * @returns a promise
   */
  handleFocusNextHotKey = (
    e: Event,
    props: ContentPluginProps<*>
  ): Promise<*> => Promise.resolve()

  /**
   * Will be called when the user presses the left or up key. When returning a resolving promise,
   * the next cell will be focused. If the promise is rejected, focus stays the same.
   *
   * @param e
   * @param props
   * @returns a promise
   */
  handleFocusPreviousHotKey = (
    e: Event,
    props: ContentPluginProps<*>
  ): Promise<*> => Promise.resolve()

  /**
   * This function will be called when one of the plugin's cell is blurred.
   *
   * @param props
   */
  handleFocus = (props: ContentPluginProps<*>): void => {}

  /**
   * This function will be called when one of the plugin's cell is focused.
   *
   * @param props
   */
  handleBlur = (props: ContentPluginProps<*>): void => {}

  /**
   * Specify a custom reducer for the plugin's cell.
   *
   * @param state
   * @param action
   */
  reducer = (state: any, action: any) => state
}

/**
 * @class this is the base class for content plugins.
 */
export class ContentPlugin extends Plugin {
  constructor(config: any) {
    super(config)
    const {
      createInitialState,
      allowInlineNeighbours = false,
      isInlineable = false
    } = config

    this.isInlineable = isInlineable
    this.allowInlineNeighbours = allowInlineNeighbours
    this.createInitialState = createInitialState
      ? createInitialState.bind(this)
      : this.createInitialState
  }

  /**
   * @member if isInlineable is true, the plugin is allowed to be placed with floating to left or right.
   */
  isInlineable: boolean

  /**
   * @member if true allows that isInlineable elements may be placed "in" this plugin.
   */
  allowInlineNeighbours: boolean

  /**
   * Create the plugin's initial state.
   *
   * @returns the initial state.
   */
  createInitialState = (): Object => ({})

  /**
   * Specify a custom reducer for the plugin's cell.
   *
   * @param state
   * @param action
   */
  reducer = (state: any, action: any) => state
}

/**
 * @class this is the base class for layout plugins.
 */
export class LayoutPlugin extends Plugin {
  constructor(config: any) {
    super(config)
    const { createInitialState, createInitialChildren } = config

    this.createInitialState = createInitialState
      ? createInitialState.bind(this)
      : this.createInitialState
    this.createInitialChildren = createInitialChildren
      ? createInitialChildren.bind(this)
      : this.createInitialChildren
  }

  /**
   * Create the plugin's initial state.
   *
   * @returns the initial state.
   */
  createInitialState = (): Object => ({})

  /**
   * Create the plugin's initial children (rows/cells).
   *
   * @returns the initial state.
   */
  createInitialChildren = (): Object => ({})
}

export class NativePlugin extends Plugin {
  constructor(config: any) {
    super(config)
    const {
      createInitialState,
      allowInlineNeighbours = false,
      isInlineable = false,
      createInitialChildren,
      type = 'content'
    } = config

    this.isInlineable = isInlineable
    this.allowInlineNeighbours = allowInlineNeighbours
    this.createInitialState = createInitialState
      ? createInitialState.bind(this)
      : this.createInitialState
    this.createInitialChildren = createInitialChildren
      ? createInitialChildren.bind(this)
      : this.createInitialChildren
    this.type = type
  }

  /**
   * @member can be 'content' or 'layout' depending on the type the native plugin should create
   */
  type: string

  /**
   * Create the plugin's initial children (rows/cells).
   *
   * @returns the initial state.
   */
  createInitialChildren = (): Object => ({})

  /**
   * @member if isInlineable is true, the plugin is allowed to be placed with floating to left or right.
   */
  isInlineable: boolean

  /**
   * @member if true allows that isInlineable elements may be placed "in" this plugin.
   */
  allowInlineNeighbours: boolean

  /**
   * Create the plugin's initial state.
   *
   * @returns the initial state.
   */
  createInitialState = (): Object => ({})
}
