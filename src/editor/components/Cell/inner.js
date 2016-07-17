import React, { PropTypes, Component } from 'react'
import { shouldPureComponentUpdate } from 'src/editor/helper/shouldComponentUpdate'
import dragDroppable from './DragDroppable'
import Rows from './Rows'
import Layout from './Layout'
import Content from './Content'
import Empty from './Empty'

class Inner extends Component {
  constructor(props) {
    super(props)
    const {
      node: {
        layout: { Component: LayoutComponent, name: layoutName } = {},
        plugin: { Component: PluginComponent, name: pluginName } = {},
      },
      config: { whitelist = [] }
    } = props

    if (LayoutComponent) {
      this.DragDroppable = dragDroppable(layoutName, whitelist)
    } else if (PluginComponent) {
      this.DragDroppable = dragDroppable(pluginName, whitelist)
    }
  }

  shouldComponentUpdate = shouldPureComponentUpdate

  render() {
    const props = this.props
    const {
      isLayoutMode,
      isInsertMode,
      node: {
        rows = [],
        layout: { Component: LayoutComponent, props: layoutProps = {} } = {},
        plugin: { Component: PluginComponent, } = {},
      }
    } = this.props
    const DragDroppable = this.DragDroppable

    if (rows.length && LayoutComponent) {
      return isLayoutMode || isInsertMode ? (
        <DragDroppable {...{ ...props, ...props.node }}>
          <Layout {...props} {...layoutProps} />
        </DragDroppable>
      ) : (
        <Layout {...props} {...layoutProps} />
      )
    } else if (rows.length) {
      return <Rows {...props} />
    } else if (PluginComponent) {
      return isLayoutMode || isInsertMode ? (
        <DragDroppable allowDrop {...{ ...props, ...props.node }}>
          <Content {...props} />
        </DragDroppable>
      ) : (
        <Content {...props} />
      )
    }

    return <Empty {...props} />
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
    props: PropTypes.object,

    layout: PropTypes.shape({
      Component: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
      name: PropTypes.string,
      version: PropTypes.string,
      props: PropTypes.object
    }),

    plugin: PropTypes.shape({
      Component: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
      name: PropTypes.string,
      version: PropTypes.string
    })
  }),
}

export default Inner
