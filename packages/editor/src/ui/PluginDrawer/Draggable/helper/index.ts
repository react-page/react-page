export const source = {
  beginDrag({
    insert,
    ...props
  }: {
    insert: Record<string, unknown>;
    layoutMode(): void;
  }) {
    props.layoutMode();
    return {
      cell: insert,
      type: 'cell',
    };
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const collect = (connect: any, monitor: any) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  connectDragPreview: connect.dragPreview(),
});
