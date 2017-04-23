// @flow
import React from 'react'
import Avatar from 'material-ui/Avatar'
import draggable from '../Draggable'
import ListItem from 'material-ui/List/ListItem'
import { Plugin } from 'ory-editor-core'
import DragHandle from 'material-ui/svg-icons/editor/drag-handle'
import IconButton from 'material-ui/IconButton';

// import logger from 'ory-editor-core/lib/service/logger'

const Item = ({ plugin, insert }: { plugin: Plugin, insert: any }, k: string) => {
  if (!plugin.IconComponent && !plugin.text) {
    // logger.warn('Plugin text or plugin icon missing', plugin)
    return null
  }

  const Draggable = draggable(plugin.name)

  // not using css modules here because they don't work with svg icons
  return (
    <Draggable key={k} insert={insert}>
      <ListItem
        leftAvatar={<Avatar icon={plugin.IconComponent} />}
        primaryText={plugin.text}
        secondaryText={plugin.description}
        secondaryTextLines={2}
        disabled
        className="ory-toolbar-item"
        rightIcon={(
          <IconButton tooltip="Click and hold to drag" tooltipPosition="bottom-left">
            <DragHandle className="ory-toolbar-item-drag-handle" style={{ cursor: 'move' }} />
          </IconButton>
        )}
      />
    </Draggable>
  )
}

export default Item
