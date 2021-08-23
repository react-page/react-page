import React from 'react';
import { DndProvider as DndProviderOrg } from 'react-dnd';
import { useOption } from '../components/hooks';
const DndProvider = ({ children }) => {
  const dndBackend = useOption('dndBackend');
  return <DndProviderOrg backend={dndBackend}>{children}</DndProviderOrg>;
};

export default DndProvider;
