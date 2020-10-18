import React from 'react';
import { useDrop } from 'react-dnd';
import { CellDrag } from '../../types/editable';

import { useInsertNew } from '../hooks';

const FallbackDropArea: React.FC = ({ children }) => {
  const insertNew = useInsertNew();

  const [, dropRef] = useDrop<CellDrag, void, void>({
    accept: 'cell',
    drop: (item, monitor) => {
      // fallback drop
      if (!monitor.didDrop()) {
        insertNew(item.cell);
      }
    },
  });

  return <div ref={dropRef}>{children}</div>;
};

export default FallbackDropArea;
