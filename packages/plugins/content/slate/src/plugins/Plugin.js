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
  * @member the nodes to be added to the schema
  */
  nodes: { [key: string]: Component<*, *, *> } = {}

  /**
   * @member the marks to be added to the schema
   */
  marks: { [key: string]: Component<*, *, *> } = {}

  /**
   * @member the slate plugins added to the editor
   */
  plugins: Array<*> = []

  /**
   * @member serialize a plugin's state to html
   */
  serialize: (
    object: { kind: string, type: string, data: any },
    children: any[]
  ) => any

  /**
   * @member serialize a plugin's state from html
   */
  deserialize: () => any

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
}
