import classNames from 'classnames';
import React from 'react';
import {
  useCell,
  useFocusCell,
  useIsLayoutMode,
  useOptions,
} from '../../hooks';
import { useDragHandle } from './useDragHandle';

const DefaultSmallHandle = ({ onClick }) => (
  <div className="react-page-cell-draggable-overlay-handle" onClick={onClick}>
    <div className="react-page-cell-draggable-overlay-handle-icon" />
  </div>
);

type Props = {
  isLeaf?: boolean;
  nodeId: string;
};
const Draggable: React.FC<Props> = ({ isLeaf, children, nodeId }) => {
  const cell = useCell(nodeId);

  const [isDragging, dragRef, previewElement] = useDragHandle(nodeId);

  const focus = useFocusCell(nodeId);
  const isLayoutMode = useIsLayoutMode();
  const options = useOptions();

  const ResizeHandle =
    options.components?.EditModeResizeHandle ?? DefaultSmallHandle;

  return (
    <>
      {previewElement}
      <div
        ref={isLayoutMode ? dragRef : undefined}
        style={{
          height: '100%',
        }}
        className={classNames({
          'react-page-cell-draggable-in-edit':
            !isLayoutMode && options.allowMoveInEditMode,
          'react-page-cell-draggable': isLayoutMode,
          'react-page-cell-draggable-is-dragging': isDragging,
        })}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {isLayoutMode ? (
          <div
            className={classNames({
              'react-page-cell-draggable-overlay': isLayoutMode,
              [`react-page-cell-draggable-inline-${cell.inline}`]: cell.inline,
              'react-page-cell-draggable-leaf': isLeaf,
            })}
          ></div>
        ) : options.allowMoveInEditMode ? (
          <div ref={dragRef}>
            <ResizeHandle onClick={focus} />
          </div>
        ) : null}

        {children}
      </div>
    </>
  );
};

export default Draggable;
