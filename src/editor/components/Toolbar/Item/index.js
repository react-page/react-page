// @flow
import React from 'react'
import Avatar from 'material-ui/Avatar'
import draggable from '../Draggable'
import ListItem from 'material-ui/List/ListItem'
import { Plugin } from 'src/editor/service/plugin/classes'

const Item = ({ plugin, insert }: { plugin: Plugin, insert: any }, k: string) => {
  if (!plugin.icon && !plugin.text) {
    console.warn('Plugin text or plugin icon missing', plugin)
    return null
  }

  const Draggable = draggable(plugin.name)
  return (
    <Draggable key={k} insert={insert}>
      <ListItem
        leftAvatar={<Avatar icon={plugin.icon} />}
        primaryText={plugin.text}
        style={{ cursor: 'move' }}
      />
    </Draggable>
  )
}

export default Item
