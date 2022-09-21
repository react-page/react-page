import classNames from 'classnames';
import type { FC, PropsWithChildren } from 'react';
import React from 'react';
import { useCell, useFocusCell, useIsLayoutMode, useOption } from '../../hooks';
import { useDragHandle } from './useDragHandle';

const DefaultSmallHandle = ({ onClick }: { onClick: () => void }) => (
  <div className="react-page-cell-draggable-overlay-handle" onClick={onClick}>
    <div className="react-page-cell-draggable-overlay-handle-icon" />
  </div>
);

type Props = {
  isLeaf?: boolean;
  nodeId: string;
};
const Draggable: FC<PropsWithChildren<Props>> = ({
  isLeaf,
  children,
  nodeId,
}) => {
  const cell = useCell(nodeId);

  const [isDragging, dragRef, previewElement] = useDragHandle(nodeId);

  const focus = useFocusCell(nodeId);
  const isLayoutMode = useIsLayoutMode();
  const allowMoveInEditMode = useOption('allowMoveInEditMode');
  const components = useOption('components');

  const ResizeHandle = components?.EditModeResizeHandle ?? DefaultSmallHandle;

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
            !isLayoutMode && allowMoveInEditMode,
          'react-page-cell-draggable': isLayoutMode,
          'react-page-cell-draggable-is-dragging': isDragging,
        })}
        // This caused issues with clicks being stopped in BottomToolbar
        // onMouseDown={(e) => e.stopPropagation()}
      >
        {isLayoutMode ? (
          <div
            onClick={(e) => {
              const mode = e.metaKey || e.ctrlKey ? 'add' : 'replace';
              focus(false, mode);
            }}
            className={classNames({
              'react-page-cell-draggable-overlay': isLayoutMode,
              [`react-page-cell-draggable-inline-${cell?.inline}`]:
                cell?.inline,
              'react-page-cell-draggable-leaf': isLeaf,
            })}
          ></div>
        ) : allowMoveInEditMode ? (
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
