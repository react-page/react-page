// @flow
import React from 'react'
import Avatar from 'material-ui/Avatar'
import draggable from '../Draggable'
import ListItem from 'material-ui/List/ListItem'
import { Plugin } from 'src/editor/service/plugin/classes'
import DragHandle from 'material-ui/svg-icons/editor/drag-handle'
import './index.css'
// import logger from 'src/editor/service/logger'

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
        disabled
        rightIcon={<DragHandle className="ory-toolbar-item-drag-handle" style={{ cursor: 'move' }} />}
      />
    </Draggable>
  )
}

export default Item
