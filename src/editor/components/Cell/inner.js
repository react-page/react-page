// @flow
import React, { Component } from 'react'
import { shouldPureComponentUpdate } from 'src/editor/helper/shouldComponentUpdate'
import Droppable from './Droppable'
import Draggable from './Draggable'
import Rows from './Rows'
import Layout from './Layout'
import Content from './Content'
import Empty from './Empty'
import classNames from 'classnames'
import serverContext from 'src/editor/components/ServerContext/connect'

import type { ComponentizedCell } from 'types/editable'

class Inner extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate
  props: ComponentizedCell

  render() {
    const props = this.props
    const {
      isServerContext,
      node: {
        rows = [],
        layout: { plugin: { Component: LayoutComponent, name: layoutType } = {}, state: layoutState = {} } = {},
        content: { plugin: { Component: ContentComponent, name: contentType } = {} } = {},
      },
      config: { whitelist = [] }
    } = this.props
    const cn = classNames('editable-cell', {
      leaf: rows.length === 0
    })

    if (rows.length && LayoutComponent) {
      if (isServerContext) {
        return (
          <div className={cn}>
            <Layout {...props} {...layoutState} />
          </div>
        )
      }

      return (
        <Droppable {...props} styles={null} dropTypes={whitelist} className={cn}>
          <Draggable {...props} styles={null} dragType={layoutType}>
            <Layout {...props} {...layoutState} />
          </Draggable>
        </Droppable>
      )
    } else if (rows.length) {
      if (isServerContext) {
        return (
          <div className={cn}>
            <Rows {...props} />
          </div>
        )
      }

      return (
        <Droppable {...props} styles={null} dropTypes={whitelist} className={cn}>
          <Rows {...props} />
        </Droppable>
      )
    } else if (ContentComponent) {
      if (isServerContext) {
        return (
          <div className={cn}>
            <Content {...props} />
          </div>
        )
      }

      return (
        <Droppable {...props} isLeaf styles={null} dropTypes={whitelist} className={cn}>
          <Draggable {...props} isLeaf styles={null} dragType={contentType}>
            <Content {...props} />
          </Draggable>
        </Droppable>
      )
    }

    return (
      <div className={cn}>
        <Empty {...props} />
      </div>
    )
  }
}

export default serverContext()(Inner)
