import classNames from 'classnames';
import type { FC, PropsWithChildren } from 'react';
import React from 'react';
import { DragPreviewImage, useDrag } from 'react-dnd';

import { dragIcon } from '../../../core/components/Cell/Draggable/useDragHandle';
import { useSetLayoutMode } from '../../../core/components/hooks/displayMode';

import type { CellDrag, InsertNewCell } from '../../../core/types';

const Draggable: FC<
  PropsWithChildren<{
    insert: InsertNewCell;
  }>
> = ({ insert, children }) => {
  const setLayoutMode = useSetLayoutMode();
  const [{ isDragging }, dragRef, preview] = useDrag<
    CellDrag,
    void,
    {
      isDragging: boolean;
    }
  >({
    type: 'cell',
    item: () => {
      setLayoutMode();
      return {
        cell: insert,
      };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const classes = classNames(
    { 'react-page-toolbar-draggable-is-dragged': isDragging },
    'react-page-toolbar-draggable'
  );

  return (
    <div className={classes} ref={dragRef}>
      <DragPreviewImage connect={preview} src={dragIcon} />
      {children}
    </div>
  );
};

export default Draggable;
