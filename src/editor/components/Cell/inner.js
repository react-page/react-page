import React, { PropTypes, Component } from 'react'
import { shouldPureComponentUpdate } from 'src/editor/helper/shouldComponentUpdate'
import DragDroppable from './DragDroppable'
import Rows from './Rows'
import Layout from './Layout'
import Content from './Content'
import Empty from './Empty'

class Inner extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate

  render() {
    const props = this.props
    const {
      isLayoutMode,
      isInsertMode,
      node: {
        rows = [],
        layout: { Component: LayoutComponent, name: layoutName, props: layoutProps = {} } = {},
        plugin: { Component: PluginComponent, name: pluginName, } = {},
      },
      config: { whitelist = [] }
    } = this.props

    if (rows.length && LayoutComponent) {
      return isLayoutMode || isInsertMode ? (
        <DragDroppable {...{ ...props, ...props.node }} dragType={layoutName} dropTypes={whitelist}>
          <Layout {...props} {...layoutProps} />
        </DragDroppable>
      ) : (
        <Layout {...props} {...layoutProps} />
      )
    } else if (rows.length) {
      return <Rows {...props} />
    } else if (PluginComponent) {
      return isLayoutMode || isInsertMode ? (
        <DragDroppable {...{ ...props, ...props.node }} dragType={pluginName} dropTypes={whitelist} allowDrop>
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
