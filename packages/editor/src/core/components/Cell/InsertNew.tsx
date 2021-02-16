import React from 'react';
import {
  useIsPreviewMode,
  useSetDisplayReferenceNodeId,
  useSetInsertMode,
} from '../hooks';

const InsertNew: React.FC<{ parentCellId?: string }> = ({ parentCellId }) => {
  const setInsertMode = useSetInsertMode();

  const isPreviewMode = useIsPreviewMode();

  const setReferenceNodeId = useSetDisplayReferenceNodeId();

  if (isPreviewMode) return null;
  return (
    <div
      className="react-page-cell-insert-new"
      style={{
        pointerEvents: 'all',
        zIndex: 1,
        overflow: 'hidden',
        width: '33%', // just so that it leaves some room to click on the parent element
        minWidth: 120,
        margin: 'auto',
      }}
      onClick={(e) => {
        setReferenceNodeId(parentCellId);
        setInsertMode();
      }}
    />
  );
};

export default React.memo(InsertNew);
