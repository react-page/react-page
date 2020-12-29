import IconUndo from '@material-ui/icons/Undo';
import IconRedo from '@material-ui/icons/Redo';
import React from 'react';
import {
  useIsInsertMode,
  useRedo,
  useSetInsertMode,
  useCanUndo,
  useCanRedo,
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
  return (
    <div
      style={{
        height: 80,
        float: 'right',
        display: 'flex',
        direction: 'ltr',
        transform: 'scale(1.2)',
      }}
    >
      <div
        style={{
          width: 36,
          overflow: 'hidden',
          marginRight: 2,
        }}
      >
        <Button
          active
          disabled={!canUndo}
          style={{
            transform: 'translateX(35px)',
          }}
          icon={<IconUndo style={{ transform: 'translateX(-12px)' }} />}
          description={labelUndo}
          onClick={undo}
          activeColor="primary"
        />
      </div>
      <div
        style={{
          width: 36,
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
          icon={<IconRedo style={{ transform: 'translateX(12px)' }} />}
          description={labelRedo}
          onClick={redo}
          activeColor="primary"
        />
      </div>
    </div>
  );
};

export default React.memo(UndoRedo);
