import React from 'react';
import { useDrop } from 'react-dnd';
import { CellDrag } from '../../types/editable';

import { useInsertCellAtTheEnd } from '../hooks';

const FallbackDropArea: React.FC = ({ children }) => {
  const insertAtTheEnd = useInsertCellAtTheEnd();

  const [, dropRef] = useDrop({
    accept: 'cell',
    drop: (item, monitor) => {
      // fallback drop
      if (!monitor.didDrop()) {
        insertAtTheEnd((item as CellDrag).cell);
      }
    },
  });

  return <div ref={dropRef}>{children}</div>;
};

export default FallbackDropArea;
