import React from 'react';
import { MoveLeft, MoveRight, MoveDown, MoveUp } from '../moveButtons';
const MoveActions: React.FC<{ nodeId: string }> = ({ nodeId }) => {
  return (
    <div>
      <MoveLeft nodeId={nodeId} />
      <MoveUp nodeId={nodeId} />

      <MoveDown nodeId={nodeId} />
      <MoveRight nodeId={nodeId} />
    </div>
  );
};

export default MoveActions;
