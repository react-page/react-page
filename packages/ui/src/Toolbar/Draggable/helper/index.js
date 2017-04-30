// @flow
import type { Monitor, Connector } from 'ory-editor-core/lib/types/react-dnd'

export const source = {
  beginDrag({ insert, ...props }: { layoutMode(): void, insert: Object }) {
    props.layoutMode()
    return {
      node: insert,
      rawNode: () => insert,
      ...props
    }
  },

  endDrag({ id }: { id: string }, monitor: Monitor) {
    const item = monitor.getItem()
    if (monitor.didDrop()) {
      setTimeout(() => {
        item.insertMode()
      }, 10)
      // If the item drop occurred deeper down the tree, don't do anything
      return
    }

    item.clearHover()
    setTimeout(() => {
      item.insertMode()
    }, 100)
  }
}

export const collect = (connect: Connector, monitor: Monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  connectDragPreview: connect.dragPreview()
})
