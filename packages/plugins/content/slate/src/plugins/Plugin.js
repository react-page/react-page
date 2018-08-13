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
/* eslint-disable no-unused-vars */
import React, { Component } from 'react'

/**
 * @class this is the base class for slate plugins
 */
export default class Plugin {
  /**
   * @member a unique identifier of the plugin
   */
  name: string

  /**
   * @member the schema that is automatically collected from all plugins
   */
  schema: {
    nodes?: { [key: string]: Component<*, *, *> },
    marks?: { [key: string]: Component<*, *, *> }
  }

  /**
   * @member the slate plugins added to the editor
   */
  plugins: Array<*> = []

  /**
   * @member serialize a plugin's state to html
   */
  serialize: (
    object: { object: string, type: string, data: any },
    children: any[]
  ) => any

  /**
   * @member serialize a plugin's state from html
   */
  deserialize: (el: Element, next: Function) => any

  /**
   * This handler is called when any key is pressed
   *
   * @param e the keydown event
   * @param data utilities for hotkey logic
   * @param state the current editor state
   * @returns the new editor state if the plugin handles the hotkey
   */
  onKeyDown = (
    e: Event,
    data: { key: string, isMod: boolean, isShift: boolean },
    state: any
  ): ?any => null

  /**
   * @member the buttons to be added to the hover menu
   */
  hoverButtons: Component<*, *, *>[] = []

  /**
   * @member the buttons to be added to the global toolbar
   */
  toolbarButtons: Component<*, *, *>[] = []

  /**
   * @member the function that renders marks
   */
  renderMark: Function

  /**
   * @member the function that renders nodes
   */
  renderNode: Function
}
