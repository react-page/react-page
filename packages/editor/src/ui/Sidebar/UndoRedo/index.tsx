import IconRedo from '@mui/icons-material/Redo';
import IconUndo from '@mui/icons-material/Undo';
import React from 'react';
import {
  useCanRedo,
  useCanUndo,
  useIsSmallScreen,
  useRedo,
  useUndo,
} from '../../../core/components/hooks';
import Button from '../Button/index';

type Props = {
  labelUndo: string;
  labelRedo: string;
};
const UndoRedo: React.FC<Props> = ({ labelUndo, labelRedo }) => {
  const undo = useUndo();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();
  const redo = useRedo();
  const isSmall = useIsSmallScreen();
  return (
    <div
      style={{
        height: isSmall ? 56 : 80,
        float: 'right',
        display: 'flex',
        direction: 'ltr',
        transform: 'scale(1.2)',
      }}
    >
      <div
        style={{
          width: isSmall ? 29 : 36,
          overflow: 'hidden',
          marginRight: isSmall ? 1 : 2,
        }}
      >
        <Button
          active
          disabled={!canUndo}
          style={{
            transform: `translateX(${isSmall ? 27 : 35}px)`,
          }}
          icon={
            <IconUndo
              style={{ transform: `translateX(-${isSmall ? 6 : 12}px)` }}
            />
          }
          description={labelUndo}
          onClick={undo}
          activeColor="primary"
        />
      </div>
      <div
        style={{
          width: isSmall ? 28 : 36,
          overflow: 'hidden',
          marginLeft: 1,
        }}
      >
        <Button
          style={{
            position: 'relative',
            transform: 'translateX(1px)',
          }}
          active
          disabled={!canRedo}
          icon={
            <IconRedo
              style={{ transform: `translateX(${isSmall ? 6 : 12}px)` }}
            />
          }
          description={labelRedo}
          onClick={redo}
          activeColor="primary"
        />
      </div>
    </div>
  );
};

export default React.memo(UndoRedo);
