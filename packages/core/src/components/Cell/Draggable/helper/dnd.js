// @flow
import type { ComponetizedCell } from '../../../../types/editable'

export const source = {
  beginDrag(props: ComponetizedCell) {
    // Beginn dragging the cell
    props.dragCell(props.id)
    return {
      ...props,
      // we do not want to pass down the react children or we will risk circular dependencies.
      children: null,
      node: {
        ...props.node,
        rows: props.rawNode().rows
      }
    }
  },

  endDrag({ cancelCellDrag, id }: ComponetizedCell, monitor: Object) {
    if (monitor.didDrop()) {
      // If the item drop occurred deeper down the tree, don't do anything
      return
    }

    // If drag ended but drop did not occur, cancel dragging
    cancelCellDrag()
  }
}

export const collect = (connect: Object, monitor: Object) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  connectDragPreview: connect.dragPreview()
})
