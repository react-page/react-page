// @flow
import React, { Component } from 'react'
import Avatar from 'material-ui/Avatar'
import draggable from '../Draggable'
import ListItem from 'material-ui/List/ListItem'
import { Plugin } from 'ory-editor-core'
import DragHandle from 'material-ui/svg-icons/editor/drag-handle'
import Tooltip from 'rc-tooltip'

class Item extends Component {
  state = { tooltipVisible: false }
  props: { plugin: Plugin, insert: any }

  onMouseEnter = () => {
    this.setState({ tooltipVisible: true })
  }

  onMouseLeave = () => {
    this.setState({ tooltipVisible: false })
  }

  render() {
    const { plugin, insert } = this.props
    if (!plugin.IconComponent && !plugin.text) {
      // logger.warn('Plugin text or plugin icon missing', plugin)
      return null
    }

    const Draggable = draggable(plugin.name)

    // not using css modules here because they don't work with svg icons
    return (
      <ListItem
        leftAvatar={<Avatar icon={plugin.IconComponent} />}
        primaryText={plugin.text}
        secondaryText={plugin.description}
        secondaryTextLines={2}
        disabled
        className="ory-toolbar-item"
        rightIcon={
          <span
            className="ory-toolbar-item-drag-handle-button"
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
            onMouseDown={this.onMouseLeave}
          >
            <Draggable insert={insert}>
              <Tooltip
                visible={this.state.tooltipVisible}
                placement="bottomLeft"
                overlay={<span>Drag me!</span>}
              >
                <DragHandle className="ory-toolbar-item-drag-handle" />
              </Tooltip>
            </Draggable>
          </span>
        }
      />
    )
  }
}

export default Item
