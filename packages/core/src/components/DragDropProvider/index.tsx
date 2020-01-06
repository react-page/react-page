import React from 'react';
import { DndProvider } from 'react-dnd-cjs';
import HTML5Backend from 'react-dnd-html5-backend-cjs';

export default ({ dndBackend = HTML5Backend, ...props }) => (
  <DndProvider backend={dndBackend} {...props} />
);
