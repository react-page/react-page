import classNames from 'classnames';
import React from 'react';
import {
  useFocusCell,
  useIsLayoutMode,
  useOptions,
  usePluginOfCell,
  useUiTranslator,
} from '../../hooks';
import { useDragHandle } from '../Draggable/useDragHandle';
const Handle: React.FC<{ nodeId: string }> = ({ nodeId }) => {
  const options = useOptions();
  const isLayoutMode = useIsLayoutMode();
  const dragEnabled = options.allowMoveInEditMode || isLayoutMode;

  const [isDragging, dragRef, previewElement] = useDragHandle(
    nodeId,
    dragEnabled
  );
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
        className={classNames('react-page-cell-handle', {
          'react-page-cell-handle-drag-enabled': dragEnabled,
          'react-page-cell-handle-is-dragging': isDragging,
        })}
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
