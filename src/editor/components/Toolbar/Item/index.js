import React, { PropTypes } from 'react'
import Avatar from 'material-ui/Avatar'
import draggable from '../Draggable'
import ListItem from 'material-ui/List/ListItem'

const Item = ({ icon, text, name, insert, ...props }, k) => {
  if (!icon && !text) {
    return null
  }

  const Draggable = draggable(name)
  return (
    <Draggable key={k} {...insert} {...props}>
      <ListItem
        leftAvatar={<Avatar icon={icon} />}
        primaryText={text}
      />
    </Draggable>
  )
}

Item.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  insert: PropTypes.object.isRequired
}

export default Item
