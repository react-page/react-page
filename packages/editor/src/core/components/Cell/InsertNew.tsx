import React from 'react';
import { useDrop } from 'react-dnd';
import type { CellDrag } from '../../types';
import {
  useCellIsAllowedHere,
  useInsertNew,
  useIsLayoutMode,
  useIsPreviewMode,
  useSetDisplayReferenceNodeId,
  useSetInsertMode,
} from '../hooks';

export interface InsertNewProps {
  parentCellId?: string;
  childrenIds?: string[];
}

const InsertNew: React.FC<InsertNewProps> = ({ parentCellId }) => {
  const setInsertMode = useSetInsertMode();

  const insertNew = useInsertNew(parentCellId);

  const isPreviewMode = useIsPreviewMode();
  const isLayoutMode = useIsLayoutMode();

  const setReferenceNodeId = useSetDisplayReferenceNodeId();
  const checkIfAllowed = useCellIsAllowedHere(parentCellId);

  const [{ isOver, isAllowed }, dropRef] = useDrop<
    CellDrag,
    void,
    { isOver: boolean; isAllowed: boolean }
  >({
    accept: 'cell',
    canDrop: (item) => {
      return checkIfAllowed(item);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isAllowed: checkIfAllowed(monitor.getItem()),
    }),
    drop: (item, monitor) => {
      // fallback drop
      if (!monitor.didDrop() && item.cell) {
        insertNew(item.cell);
      }
    },
  });

  if (isPreviewMode) return null;
  return (
    <div
      ref={dropRef}
      className={
        'react-page-cell-insert-new' + (isOver && isAllowed ? ' hover' : '')
      }
      style={{
        pointerEvents: 'all',
        zIndex: isLayoutMode ? 10 : 1,
        overflow: 'hidden',
        width: '50%', // just so that it leaves some room to click on the parent element
        minWidth: 120,
        margin: 'auto',
        cursor: isOver && !isAllowed ? 'not-allowed' : 'pointer',
      }}
      onClick={(e) => {
        e.stopPropagation();
        setReferenceNodeId(parentCellId);
        setInsertMode();
      }}
    >
      <div className="react-page-cell-insert-new-icon">
        <svg
          focusable="false"
          aria-hidden="true"
          viewBox="0 0 24 24"
          data-testid="AddIcon"
        >
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
        </svg>
      </div>
    </div>
  );
};

export default React.memo(InsertNew);
