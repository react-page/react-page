import { DragSourceConnector, DragSourceMonitor } from 'react-dnd';
import { ComponetizedCell } from '../../../../types/editable';

export const source = {
  beginDrag(props: ComponetizedCell) {
    // Begin dragging the cell
    props.dragCell(props.id);
    return {
      ...props,
      // we do not want to pass down the react children or we will risk circular dependencies.
      children: null,
      node: {
        ...props.node,
        rows: props.rawNode().rows,
      },
    };
  },

  endDrag(
    { cancelCellDrag, id }: ComponetizedCell,
    monitor: DragSourceMonitor
  ) {
    if (monitor.didDrop()) {
      // If the item drop occurred deeper down the tree, don't do anything
      return;
    }

    // If drag ended but drop did not occur, cancel dragging
    cancelCellDrag();
  },
};

export const collect = (
  connect: DragSourceConnector,
  monitor: DragSourceMonitor
) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  connectDragPreview: connect.dragPreview(),
});
