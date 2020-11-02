import React from 'react';
import { EditableContext } from '../hooks';
import HotKeyDecorator from '../HotKey/Decorator';
import FallbackDropArea from './FallbackDropArea';
import Inner from './Inner';

export type EditableProps = {
  id: string;
};
const Editable: React.FC<EditableProps> = ({ id }) => {
  return (
    <EditableContext.Provider value={id}>
      <HotKeyDecorator>
        <FallbackDropArea>
          <Inner />
        </FallbackDropArea>
      </HotKeyDecorator>
    </EditableContext.Provider>
  );
};

export default React.memo(Editable);
