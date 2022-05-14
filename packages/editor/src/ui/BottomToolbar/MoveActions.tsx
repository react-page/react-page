import React from 'react';
import { MoveLeft, MoveRight, MoveDown, MoveUp } from '../moveButtons';
const MoveActions: React.FC<{ nodeId: string }> = ({ nodeId }) => {
  return (
    <div style={{ transform: 'scale(0.8)' }}>
      <MoveLeft nodeId={nodeId} />
      <MoveUp nodeId={nodeId} />

      <MoveDown nodeId={nodeId} />
      <MoveRight nodeId={nodeId} />
    </div>
  );
};

export default MoveActions;
