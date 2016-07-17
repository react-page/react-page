export const source = {
  beginDrag(props) {
    return props
  },

  endDrag({ id }, monitor) {
    if (monitor.didDrop()) {
      // If the item drop occurred deeper down the tree, don't do anything
      return
    }
  }
}

export const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
})
