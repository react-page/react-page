
import React, { PropTypes, Component } from 'react'
import { shouldPureComponentUpdate } from 'src/editor/helper/shouldComponentUpdate'
import DragDroppable from './DragDroppable'
import Rows from './Rows'
import Layout from './Layout'
import Content from './Content'
import Empty from './Empty'
import type { ComponentizedCell } from 'types/editable'

class Inner extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate

  render() {
    const props: ComponentizedCell = this.props
    const {
      isLayoutMode,
      isInsertMode,
      node: {
        rows = [],
        layout: { plugin: { Component: LayoutComponent, name: layoutType, state: layoutState = {} } },
        content: { plugin: { Component: ContentComponent, name: contentType } },
      },
      config: { whitelist = [] }
    } = this.props

    if (rows.length && LayoutComponent) {
      return isLayoutMode || isInsertMode ? (
        <DragDroppable {...{ ...props, styles: null }} dragType={layoutType} dropTypes={whitelist}>
          <div className="editable-cell">
            <Layout {...props} {...layoutState} />
          </div>
        </DragDroppable>
      ) : (
        <div className="editable-cell">
          <Layout {...props} {...layoutState} />
        </div>
      )
    } else if (rows.length) {
      return <Rows {...props} />
    } else if (ContentComponent) {
      return isLayoutMode || isInsertMode ? (
        <DragDroppable {...{ ...props, styles: null }}
          dragType={contentType}
          dropTypes={whitelist}
          allowDrop
        >
          <div className="editable-cell">
            <Content {...props} />
          </div>
        </DragDroppable>
      ) : (
        <div className="editable-cell">
          <Content {...props} />
        </div>
      )
    }

    return (
      <div className="editable-cell">
        <Empty {...props} />
      </div>
    )
  }
}

Inner.propTypes = {
  editable: PropTypes.string.isRequired,
  size: PropTypes.number,
  config: PropTypes.object.isRequired,

  isInsertMode: PropTypes.bool.isRequired,
  isLayoutMode: PropTypes.bool.isRequired,

  node: PropTypes.shape({
    rows: PropTypes.array,

    layout: PropTypes.shape({
      plugin: PropTypes.shape({
        Component: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
        name: PropTypes.string,
        version: PropTypes.string
      }),
      state: PropTypes.object
    }),

    content: PropTypes.shape({
      plugin: PropTypes.shape({
        Component: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
        name: PropTypes.string,
        version: PropTypes.string
      }),
      state: PropTypes.object
    }),
  }),
}

export default Inner
