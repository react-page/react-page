import React from 'react';
import { useDrop } from 'react-dnd';
import { CellDrag } from '../../types';
import {
  useInsertNew,
  useIsLayoutMode,
  useIsPreviewMode,
  useSetDisplayReferenceNodeId,
  useSetInsertMode,
} from '../hooks';

const InsertNew: React.FC<{ parentCellId?: string }> = ({ parentCellId }) => {
  const setInsertMode = useSetInsertMode();

  const insertNew = useInsertNew();

  const isPreviewMode = useIsPreviewMode();
  const isLayoutMode = useIsLayoutMode();

  const setReferenceNodeId = useSetDisplayReferenceNodeId();

  const [{ isOver }, dropRef] = useDrop<CellDrag, void, { isOver: boolean }>({
    accept: 'cell',

    collect: (monitor) => ({ isOver: monitor.isOver() }),
    drop: (item, monitor) => {
      // fallback drop
      if (!monitor.didDrop()) {
        insertNew(item.cell, parentCellId);
      }
    },
  });

  if (isPreviewMode) return null;
  return (
    <div
      ref={dropRef}
      className={'react-page-cell-insert-new' + (isOver ? ' hover' : '')}
      style={{
        pointerEvents: 'all',
        zIndex: isLayoutMode ? 10 : 1,
        overflow: 'hidden',
        width: '50%', // just so that it leaves some room to click on the parent element
        minWidth: 120,
        margin: 'auto',
      }}
      onClick={(e) => {
        e.stopPropagation();
        setReferenceNodeId(parentCellId);
        setInsertMode();
      }}
    />
  );
};

export default React.memo(InsertNew);
