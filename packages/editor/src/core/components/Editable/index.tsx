import React from 'react';
import HotKeyDecorator from '../HotKey/Decorator';
import FallbackDropArea from './FallbackDropArea';
import Inner from './Inner';

const Editable: React.FC = () => {
  return (
    <HotKeyDecorator>
      <FallbackDropArea>
        <Inner />
      </FallbackDropArea>
    </HotKeyDecorator>
  );
};

export default React.memo(Editable);
