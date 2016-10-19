// @flow
import React, { Component } from 'react'
import { shouldPureComponentUpdate } from 'src/editor/helper/shouldComponentUpdate'
import DragDroppable from './DragDroppable'
import Rows from './Rows'
import Layout from './Layout'
import Content from './Content'
import Empty from './Empty'
import type { ComponentizedCell } from 'types/editable'
import classNames from 'classnames'

class Inner extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate
  props: ComponentizedCell

  render() {
    const props = this.props
    const {
      isLayoutMode,
      isInsertMode,
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
      return isLayoutMode || isInsertMode ? (
        <DragDroppable {...props} styles={null} dragType={layoutType} dropTypes={whitelist}>
          <div className={cn}>
            <Layout {...props} {...layoutState} />
          </div>
        </DragDroppable>
      ) : (
        <div className={cn}>
          <Layout {...props} {...layoutState} />
        </div>
      )
    } else if (rows.length) {
      return <Rows {...props} />
    } else if (ContentComponent) {
      return isLayoutMode || isInsertMode ? (
        <DragDroppable {...props}
          styles={null}
          dragType={contentType}
          dropTypes={whitelist}
          allowDrop
        >
          <div className={cn}>
            <Content {...props} />
          </div>
        </DragDroppable>
      ) : (
        <div className={cn}>
          <Content {...props} />
        </div>
      )
    }

    return (
      <div className={cn}>
        <Empty {...props} />
      </div>
    )
  }
}

export default Inner
