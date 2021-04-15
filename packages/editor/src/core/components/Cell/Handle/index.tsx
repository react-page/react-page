import React from 'react';
import { useFocusCell, usePluginOfCell, useUiTranslator } from '../../hooks';
import { useDragHandle } from '../Draggable/useDragHandle';
const Handle: React.FC<{ nodeId: string }> = ({ nodeId }) => {
  const [isDragging, dragRef, previewElement] = useDragHandle(nodeId);
  const focus = useFocusCell(nodeId);
  const plugin = usePluginOfCell(nodeId);
  const { t } = useUiTranslator();
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
        {t(plugin?.title || plugin?.text)}
      </div>
    </>
  );
};

export default React.memo(Handle);
