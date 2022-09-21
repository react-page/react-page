import React from 'react';
import type { BaseSyntheticEvent, FC, PropsWithChildren } from 'react';
import { useCallback } from 'react';
import { useDrop } from 'react-dnd';
import type { CellDrag } from '../../types/node';

import {
  useCellIsAllowedHere,
  useInsertNew,
  useSetDisplayReferenceNodeId,
} from '../hooks';

const FallbackDropArea: FC<PropsWithChildren> = ({ children }) => {
  const insertNew = useInsertNew();

  const isAllowed = useCellIsAllowedHere();
  const [, dropRef] = useDrop<CellDrag, void, void>({
    accept: 'cell',
    canDrop: (item) => isAllowed(item),
    drop: (item, monitor) => {
      // fallback drop
      if (!monitor.didDrop() && item.cell) {
        insertNew(item.cell);
      }
    },
  });

  const setReference = useSetDisplayReferenceNodeId();
  const clearReference = useCallback(
    (e: BaseSyntheticEvent) => {
      // if click was on the root, clear reference
      if (e.target.classList?.contains('react-page-editable'))
        setReference(null);
    },
    [setReference]
  );

  return (
    <div ref={dropRef} onClick={clearReference}>
      {children}
    </div>
  );
};

export default FallbackDropArea;
