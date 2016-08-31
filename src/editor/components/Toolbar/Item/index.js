// @flow
import React from 'react'
import Avatar from 'material-ui/Avatar'
import draggable from '../Draggable'
import ListItem from 'material-ui/List/ListItem'

const Item = ({ icon, text, name, insert, ...props }: Object, k: string) => {
  if (!icon && !text) {
    return null
  }

  const Draggable = draggable(name)
  return (
    <Draggable key={k} insert={insert} {...props}>
      <ListItem
        leftAvatar={<Avatar icon={icon} />}
        primaryText={text}
      />
    </Draggable>
  )
}

export default Item
