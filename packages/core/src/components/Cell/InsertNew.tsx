import React from 'react';
import { useDrop } from 'react-dnd';
import { CellDrag } from '../../types/editable';

import {
  useIsEditMode,
  useIsInsertMode,
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
      className="ory-cell-insert-new"
      onClick={() => {
        setReferenceNodeId(parentCellId);
        setInsertMode();
      }}
    />
  );
};

export default React.memo(InsertNew);
