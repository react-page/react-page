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
import React, { Component } from 'react'
import { Provider } from 'react-redux'

import dragDropContext from '../DragDropContext'
import HotKeyDecorator from '../HotKey/Decorator'
import { editable } from '../../selector/editable'
import PluginService from '../../service/plugin'
import Inner from './Inner'

import type { Store } from '../../types/redux'
import { shouldPureComponentUpdate } from '../../helper/shouldComponentUpdate'

type PropTypes = {
  id: string,
  editor: {
    plugins: PluginService,
    store: Store,
    defaultPlugin: any,
    dragDropContext: any
  },
  onChange?: Function
}

class Editable extends Component {
  constructor(props: PropTypes) {
    super(props)
    this.DragDropContext = dragDropContext(props.editor.dragDropContext)
  }

  componentDidMount() {
    if (!this.props.id) {
      throw new Error('The state must have an unique id')
    }

    this.unsubscribe = this.props.editor.store.subscribe(this.onChange)
    this.previousState = null
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  shouldComponentUpdate = shouldPureComponentUpdate

  unsubscribe: Function
  previousState: any = {}
  DragDropContext: any
  props: PropTypes

  onChange = () => {
    const { onChange } = this.props
    if (typeof onChange !== 'function') {
      return
    }

    const state: any = editable(this.props.editor.store.getState(), {
      id: this.props.id
    })
    if (state === this.previousState || !state) {
      return
    }

    const serialized = this.props.editor.plugins.serialize(state)
    onChange(serialized)
  }

  render() {
    const {
      id,
      editor: { store, defaultPlugin }
    } = this.props
    const DragDropContext = this.DragDropContext

    return (
      <Provider store={store}>
        <DragDropContext>
          <HotKeyDecorator id={id}>
            <Inner id={id} defaultPlugin={defaultPlugin} />
          </HotKeyDecorator>
        </DragDropContext>
      </Provider>
    )
  }
}

export default Editable
