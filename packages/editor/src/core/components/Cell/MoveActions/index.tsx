import React from 'react';
import type { CSSProperties } from 'react';
import {
  MoveDown,
  MoveLeft,
  MoveRight,
  MoveUp,
} from '../../../../ui/moveButtons';

const baseStyle: CSSProperties = {
  position: 'absolute',
  margin: 0,
};
const MARGIN = 10;
const MoveActions: React.FC<{ nodeId: string }> = ({ nodeId }) => {
  return (
    <div
      className="react-page-cell-move-actions"
      style={{
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        zIndex: 100,
        pointerEvents: 'none',
        ...baseStyle,
      }}
    >
      <MoveUp
        nodeId={nodeId}
        style={{
          ...baseStyle,
          top: MARGIN,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      />

      <MoveLeft
        nodeId={nodeId}
        style={{
          ...baseStyle,
          left: MARGIN,
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      />

      <MoveRight
        nodeId={nodeId}
        style={{
          ...baseStyle,
          right: MARGIN,
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      />

      <MoveDown
        nodeId={nodeId}
        style={{
          ...baseStyle,
          bottom: MARGIN,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      />
    </div>
  );
};

export default MoveActions;
