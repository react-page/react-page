import React from 'react';
import { useDrop } from 'react-dnd';

import { useEditor, useInsertCellAtTheEnd } from '../hooks';

const FallbackDropArea: React.FC = ({ children }) => {
  const insertAtTheEnd = useInsertCellAtTheEnd();
  const editor = useEditor();
  const [, dropRef] = useDrop({
    accept: editor.plugins.getRegisteredNames(),
    drop: (item, monitor) => {
      // fallback drop
      if (!monitor.didDrop()) {
        insertAtTheEnd((item as any).node);
      }
    },
  });

  return <div ref={dropRef}>{children}</div>;
};

export default FallbackDropArea;
