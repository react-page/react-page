// @flow
import type { Monitor, Connector } from 'types/react-dnd'

export const source = {
  beginDrag(props: {layoutMode(): void}) {
    props.layoutMode()
    return props
  },

  endDrag({ id }: { id: string }, monitor: Monitor) {
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

export const collect = (connect: Connector, monitor: Monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
})
