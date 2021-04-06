import classNames from 'classnames';
import React from 'react';
import { useCellDrop } from '../../Cell/Droppable';
import { useIsInsertMode, useIsLayoutMode } from '../../hooks';

const Droppable: React.FC<{ nodeId: string; className: string }> = ({
  children,
  nodeId,
  className,
}) => {
  const isLayoutMode = useIsLayoutMode();
  const isInsertMode = useIsInsertMode();

  const [ref, isAllowed] = useCellDrop(nodeId);
  if (!(isLayoutMode || isInsertMode)) {
    return (
      <div
        className={classNames('react-page-row-droppable-container', className)}
      >
        {children}
      </div>
    );
  }
  return (
    <div
      ref={ref}
      className={classNames('react-page-row-droppable', className)}
    >
      {children}
    </div>
  );
};

export default Droppable;
