import classNames from 'classnames';
import React from 'react';
import {
  useCell,
  useFocusCell,
  useIsLayoutMode,
  useIsResizeMode,
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
  const isResizeMode = useIsResizeMode();
  const options = useOptions();
  if (isResizeMode) {
    return <>{children}</>;
  }
  if (!isLayoutMode && !options.allowMoveInEditMode) {
    return (
      <div
        className="react-page-cell-draggable-container"
        style={{
          height: '100%',
        }}
      >
        {/* these divs are here to prevent page jumping, they are a placeholder for draggable / draggable-overlay */}
        <div className="react-page-cell-draggable-overlay-placeholder" />
        {children}
      </div>
    );
  }

  if (options.allowMoveInEditMode && !isLayoutMode) {
    return (
      <>
        {previewElement}
        <div
          style={{
            height: '100%',
            position: 'relative',
          }}
          className={classNames({
            'react-page-cell-draggable-in-edit': options.allowMoveInEditMode,
            'react-page-cell-draggable':
              isLayoutMode && !options.allowMoveInEditMode,
            'react-page-cell-draggable-is-dragging': isDragging,
          })}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div ref={dragRef}>
            {options.editModeResizeHandle ?? (
              <DefaultSmallHandle onClick={focus} />
            )}
          </div>

          {children}
        </div>
      </>
    );
  }

  return (
    <>
      {previewElement}
      <div
        style={{
          height: '100%',
        }}
        ref={dragRef}
        className={classNames({
          'react-page-cell-draggable': isLayoutMode,
          'react-page-cell-draggable-is-dragging': isDragging,
        })}
      >
        <div
          className={classNames({
            'react-page-cell-draggable-overlay': isLayoutMode,
            [`react-page-cell-draggable-inline-${cell.inline}`]: cell.inline,
            'react-page-cell-draggable-leaf': isLeaf,
          })}
        ></div>
        {children}
      </div>
    </>
  );
};

export default Draggable;
