// @flow
import React, { Component } from 'react'

import { shouldPureComponentUpdate } from '../../../helper/shouldComponentUpdate'
import Droppable from '../Droppable'
import Draggable from '../Draggable'
import Rows from '../Rows'
import Layout from '../Layout'
import Content from '../Content'
import Empty from '../Empty'

import type { ComponetizedCell } from '../../../types/editable'

class Inner extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate
  props: ComponetizedCell

  render() {
    const {
      node: {
        rows = [],
        layout: {
          plugin: {
            Component: LayoutComponent,
            name: layoutType,
            text: layoutTitle
          } = {}
        } = {},
        content: {
          plugin: {
            Component: ContentComponent,
            name: contentType,
            text: contentTitle
          } = {}
        } = {}
      },
      config: { whitelist = [] }
    } = this.props
    // const className = 'ory-cell-inner'

    if (rows.length && LayoutComponent) {
      return (
        <Droppable {...this.props} dropTypes={whitelist}>
          <Draggable
            {...this.props}
            dragType={layoutType}
            name={layoutTitle || layoutType}
          >
            <Layout {...this.props} />
          </Draggable>
        </Droppable>
      )
    } else if (rows.length) {
      return (
        <Droppable {...this.props} dropTypes={whitelist}>
          <Rows {...this.props} />
        </Droppable>
      )
    } else if (ContentComponent) {
      return (
        <Droppable {...this.props} isLeaf dropTypes={whitelist}>
          <Draggable
            {...this.props}
            isLeaf
            dragType={contentType}
            name={contentTitle || contentType}
          >
            <Content {...this.props} />
          </Draggable>
        </Droppable>
      )
    }

    return <Empty {...this.props} />
  }
}

export default Inner
