// @flow
import React, { Component } from 'react'

import { shouldPureComponentUpdate } from '../../../helper/shouldComponentUpdate'
import Droppable from '../Droppable'
import Draggable from '../Draggable'
import Rows from '../Rows'
import Layout from '../Layout'
import Content from '../Content'
import Empty from '../Empty'

import type { ComponentizedCell } from '../../../types/editable'

class Inner extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate
  props: ComponentizedCell

  render() {
    const props = this.props
    const {
      node: {
        rows = [],
        layout: { plugin: { Component: LayoutComponent, name: layoutType } = {}, state: layoutState = {} } = {},
        content: { plugin: { Component: ContentComponent, name: contentType } = {} } = {},
      },
      config: { whitelist = [] }
    } = this.props
    // const className = 'ory-cell-inner'

    if (rows.length && LayoutComponent) {
      return (
        <Droppable {...props} dropTypes={whitelist}>
          <Draggable {...props} dragType={layoutType}>
            <Layout {...props} {...layoutState} />
          </Draggable>
        </Droppable>
      )
    } else if (rows.length) {
      return (
        <Droppable {...props} dropTypes={whitelist}>
          <Rows {...props} />
        </Droppable>
      )
    } else if (ContentComponent) {
      return (
        <Droppable {...props} isLeaf dropTypes={whitelist}>
          <Draggable {...props} isLeaf dragType={contentType}>
            <Content {...props} />
          </Draggable>
        </Droppable>
      )
    }

    return (
      <Empty {...props} />
    )
  }
}

export default Inner
