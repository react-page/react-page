export const source = {
  beginDrag(props) {
    props.layoutMode()
    return props
  },

  endDrag({ id }, monitor) {
    const item = monitor.getItem()
    if (monitor.didDrop()) {
      item.editMode()
      // If the item drop occurred deeper down the tree, don't do anything
      return
    }
    item.clearHover()
    item.insertMode()
  }
}

export const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
})
