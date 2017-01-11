// @flow
/* eslint-disable no-unused-vars */
import { Component } from 'react'
// import { State } from 'slate'

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
   * This handler is called when any key is pressed
   *
   * @param e the keydown event
   * @param data utilities for hotkey logic
   * @param state the current editor state
   * @returns the new editor state if the plugin handles the hotkey
   */
  onKeyDown = (
    e: Event,
    data: { key: string, isMod: bool, isShift: bool },
    state: any
  ): ?any => null

  /**
   * @member the buttons to be added to the hover menu
   */
  hoverButtons: Array<Component<*, *, *>> = []

  /**
   * @member the buttons to be added to the global toolbar
   */
  toolbarButtons: Array<Component<*, *, *>> = []
}
