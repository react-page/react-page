import React from 'react';
import FallbackDropArea from './FallbackDropArea';
import Inner from './Inner';

const Editable: React.FC = () => {
  return (
    <FallbackDropArea>
      <Inner />
    </FallbackDropArea>
  );
};

export default React.memo(Editable);
