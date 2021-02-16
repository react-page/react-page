import React from 'react';
import { useFocusCell, usePluginOfCell } from '../../hooks';
import { useDragHandle } from '../Draggable/useDragHandle';
const Handle: React.FC<{ nodeId: string }> = ({ nodeId }) => {
  const [isDragging, dragRef, previewElement] = useDragHandle(nodeId);
  const focus = useFocusCell(nodeId);
  const plugin = usePluginOfCell(nodeId);
  if (!plugin) {
    return null;
  }
  return (
    <>
      {previewElement}
      <div
        className="react-page-cell-handle"
        ref={dragRef}
        onClick={() => {
          focus(false);
        }}
      >
        {plugin?.title || plugin?.text}
      </div>
    </>
  );
};

export default React.memo(Handle);
