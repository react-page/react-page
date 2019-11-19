import React from 'react';
import { DndProvider } from 'react-dnd-cjs';
import HTML5Backend from 'react-dnd-html5-backend-cjs';

export default props => <DndProvider backend={HTML5Backend} {...props} />;
